import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/clientUser/UserButtonContainer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/clientUser/clientBar"!</div>
}
