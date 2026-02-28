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
  Dropdown,
  SideSheet,
  MarkdownRender,
} from "@douyinfe/semi-ui-19";
import type { ReactNode } from "react";
import GlobalLoading from "../global-loading";
import Logo from "../icon/logo";
import { IconHelpCircle, IconUser, IconQuit } from "@douyinfe/semi-icons";
import AuthService from "@/service/auth.service";
import { useAppSelector } from "@/hooks/use-app-selector";
import { closeUserGuide, openUserGuide } from "@/stores/user.slice";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isUserGuideOpen = useAppSelector((state) => state.user.isOpenUserGuide);
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
      duration: 5,
      theme: "light",
    });
    dispatch(logout());
    navigate({ to: "/auth/login", search: { next: location.href } });
    return null;
  }

  return (
    <Layout className="h-screen flex flex-col overflow-hidden">
      <Header>
        <div>
          <Nav
            mode="horizontal"
            header={
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate({ to: "/tasks" });
                }}
              >
                <Logo />
                <span className="text-lg font-bold text-white">
                  Doknowhatodo
                </span>
              </div>
            }
            footer={
              <>
                <Button
                  theme="borderless"
                  icon={<IconHelpCircle size="large" />}
                  className="mr-3"
                  style={{ color: "var(--semi-color-text-2)" }}
                  onClick={() => dispatch(openUserGuide())}
                />
                <Dropdown
                  trigger="click"
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item icon={<IconUser />}>Profile</Dropdown.Item>
                      <Dropdown.Item
                        type="danger"
                        icon={<IconQuit />}
                        onClick={async () => {
                          await AuthService.logout();
                          dispatch(logout());
                          navigate({
                            to: "/auth/login",
                            search: { next: location.href },
                          });
                        }}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <div className="cursor-pointer">
                    {data?.getMe.imageUrl ? (
                      <Avatar
                        alt="User Avatar"
                        src={data.getMe.imageUrl}
                        className="mr-5"
                      />
                    ) : (
                      <Avatar alt="User Avatar" className="mr-5">
                        {data?.getMe.name.split(" ")[0]}
                      </Avatar>
                    )}
                  </div>
                </Dropdown>
              </>
            }
          />
        </div>
      </Header>
      <Layout className="flex-1 overflow-hidden">{children}</Layout>
      <SideSheet
        title="Welcome to Doknowhatodo!"
        visible={isUserGuideOpen}
        onCancel={() => dispatch(closeUserGuide())}
      >
        <MarkdownRender
          raw={
            "This is a task management application designed to help you organize and track your daily tasks effectively.\n\n## Features\n\n- **Create Tasks**: Add new tasks with descriptions and due dates\n- **Organize**: Categorize and prioritize your tasks\n- **Archive**: Keep completed tasks in an archive for reference\n- **User Profile**: Manage your account settings\n\n## Getting Started\n\n1. Use the navigation menu to access different sections\n2. Click the '+' button to create a new task\n3. Archive completed tasks from the Archived Tasks menu\n4. Click the profile icon to manage your account\n\nHappy organizing!"
          }
        />
      </SideSheet>
    </Layout>
  );
}
