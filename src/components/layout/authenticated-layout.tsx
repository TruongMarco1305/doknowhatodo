import { GET_USER } from "@/graphql/queries/user";
import { logout, setUser } from "@/stores/auth.slice";
import type { User } from "@/types/user";
import { useQuery } from "@apollo/client/react";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { Notification } from "@douyinfe/semi-ui-19";
import type { ReactNode } from "react";
import GlobalLoading from "../global-loading";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery<{ getMe: User }>(GET_USER);
  dispatch(setUser(data?.getMe || null));

  if (loading) {
    return <GlobalLoading />;
  }

  if (error) {
    Notification.error({
      title: "Authentication",
      content: "Please login to continue",
      duration: 5000,
      theme: "light",
    });
    dispatch(logout());
    navigate({ to: "/auth/login", search: { next: location.href } });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {children}
    </div>
  );
}
