import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_client/clientPage/myOrders')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_client/clientPage/myOrders"!</div>
}
