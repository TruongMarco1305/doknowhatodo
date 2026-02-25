import { GET_USER } from "@/graphql/queries/user";
import { logout, setUser } from "@/stores/auth.slice";
import type { User } from "@/types/user";
import { useQuery } from "@apollo/client/react";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import {
  Notification,
  Layout,
  Nav,
  Avatar,
  Button,
} from "@douyinfe/semi-ui-19";
import type { ReactNode } from "react";
import GlobalLoading from "../global-loading";
import Logo from "../icon/logo";
import { IconArchive, IconHelpCircle } from "@douyinfe/semi-icons";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header } = Layout;
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
    <Layout className="min-h-screen">
      <Header>
        <div>
          <Nav
            mode="horizontal"
            header={{
              logo: <Logo />,
              text: "DoKnowWhatodo",
            }}
            items={[
              {
                itemKey: "archived",
                text: "Archived Tasks",
                link: "/tasks/archived",
                icon: <IconArchive />,
              },
            ]}
            footer={
              <>
                <Button
                  theme="borderless"
                  icon={<IconHelpCircle size="large" />}
                  className="mr-3"
                  style={{ color: "var(--semi-color-text-2)" }}
                />
                {data?.getMe.imageUrl ? (
                  <Avatar alt="User Avatar" src={data.getMe.imageUrl} />
                ) : (
                  <Avatar alt="User Avatar">
                    {data?.getMe.name.split(" ")[0]}
                  </Avatar>
                )}
              </>
            }
          />
        </div>
      </Header>
      {children}
    </Layout>
  );
}
