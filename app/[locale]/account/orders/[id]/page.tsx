import { Suspense } from 'react'
import OrderDetailClient from './order-detail-client'

export default function OrderDetailPage() {
  return (
    <Suspense fallback={<main className="p-12 text-muted-foreground">Loading quote…</main>}>
      <OrderDetailClient />
    </Suspense>
  )
}
