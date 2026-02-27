import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (!context.authContext.isAuthenticated) {
      throw redirect({ to: "/auth/login" });
    } else {
      throw redirect({ to: "/tasks" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
