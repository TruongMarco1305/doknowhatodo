import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: async ({ context }) => {
    if (context.authContext.isAuthenticated) {
      throw redirect({ to: "/tasks" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <img src="/vite.svg" alt="Logo" className="mx-auto mb-6 w-40 h-40" />
        <Outlet />
      </div>
    </div>
  );
}
