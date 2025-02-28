import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/clientUser/orders/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clientUser/order/"!</div>
}
