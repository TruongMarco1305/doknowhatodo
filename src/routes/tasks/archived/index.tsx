import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tasks/archived/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tasks/archived/"!</div>
}
