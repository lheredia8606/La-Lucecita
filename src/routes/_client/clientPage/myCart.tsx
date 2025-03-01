import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_client/clientPage/myCart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_client/clientPage/myCart"!</div>
}
