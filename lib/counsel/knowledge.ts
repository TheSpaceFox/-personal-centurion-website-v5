import fs from "fs";
import path from "path";

export type CounselArticle = {
  title: string;
  slug: string;
  updated: string;
  tags: string[];
  priority: number;
  body: string;
  file: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "counsel");

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw.trim() };

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return { meta, body: match[2].trim() };
}

function parseTags(value?: string): string[] {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim().replace(/^["']|["']$/g, "").toLowerCase())
    .filter(Boolean);
}

let cache: { mtime: number; articles: CounselArticle[] } | null = null;

export function loadCounselArticles(): CounselArticle[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const entries = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md");

  let newest = 0;
  for (const file of entries) {
    const stat = fs.statSync(path.join(CONTENT_DIR, file));
    newest = Math.max(newest, stat.mtimeMs);
  }

  if (cache && cache.mtime === newest) return cache.articles;

  const articles: CounselArticle[] = entries.map((file) => {
    const full = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { meta, body } = parseFrontmatter(raw);
    const slug = meta.slug || file.replace(/\.md$/, "");
    return {
      title: meta.title || slug,
      slug,
      updated: meta.updated || "1970-01-01",
      tags: parseTags(meta.tags),
      priority: Number(meta.priority || 0) || 0,
      body,
      file,
    };
  });

  cache = { mtime: newest, articles };
  return articles;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9£]+/)
    .filter((t) => t.length > 2);
}

export function scoreArticle(
  article: CounselArticle,
  query: string
): number {
  const q = tokenize(query);
  if (q.length === 0) return article.priority;

  const hay = tokenize(
    `${article.title} ${article.tags.join(" ")} ${article.body}`
  );
  const set = new Set(hay);
  let score = article.priority * 10;

  for (const token of q) {
    if (article.tags.includes(token)) score += 8;
    if (set.has(token)) score += 2;
  }

  // Prefer newer articles slightly when scores are close
  const ageBoost = Number(article.updated.replace(/-/g, "").slice(0, 8)) / 1e10;
  score += ageBoost;

  return score;
}

export function retrieveCounselArticles(
  query: string,
  limit = 3
): {
  catalog: string;
  selected: CounselArticle[];
  contextBlock: string;
} {
  const articles = loadCounselArticles();
  const ranked = [...articles]
    .map((a) => ({ a, score: scoreArticle(a, query) }))
    .sort((x, y) => y.score - x.score);

  const selected = ranked.slice(0, limit).map((r) => r.a);

  const catalog = articles
    .map(
      (a) =>
        `- ${a.title} (slug: ${a.slug}; tags: ${a.tags.join(", ") || "none"}; updated: ${a.updated})`
    )
    .join("\n");

  const contextBlock =
    selected.length === 0
      ? "No reference articles matched."
      : selected
          .map(
            (a) =>
              `### ${a.title}\n(slug: ${a.slug} | updated: ${a.updated} | tags: ${a.tags.join(", ")})\n\n${a.body}`
          )
          .join("\n\n---\n\n");

  return { catalog, selected, contextBlock };
}
