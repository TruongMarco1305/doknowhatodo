import AuthService from "@/service/auth.service";
import { authenticated } from "@/stores/auth.slice";
import handleAxiosError from "@/utils/handle-axios-error";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Notification } from "@douyinfe/semi-ui-19";

export const Route = createFileRoute("/auth/signup/")({
  beforeLoad: async ({ context }) => {
    if (context.authContext.isAuthenticated) {
      throw redirect({ to: "/tasks" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        await AuthService.signUp(value.email, value.password);
        dispatch(authenticated());
        Notification.success({
          title: "Authentication",
          content: "You have successfully signed up!",
          duration: 5,
          theme: "light",
        });
        navigate({ to: "/tasks" });
      } catch (error) {
        handleAxiosError(error, (message: string) => {
          Notification.error({
            title: "Authentication",
            content: message,
            duration: 5,
            theme: "light",
          });
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      {/* Form */}
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        Create new account
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Email Field */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Email address is required";
              return undefined;
            },
          }}
          children={(field) => (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder=""
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full disabled:bg-gray-600 px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  field.state.meta.errors.length > 0
                    ? "border-red-500"
                    : "border-gray-600"
                }`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-400">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        />

        {/* Username Field */}
        <form.Field
          name="username"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Username is required";
              return undefined;
            },
          }}
          children={(field) => (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder=""
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full disabled:bg-gray-600 px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  field.state.meta.errors.length > 0
                    ? "border-red-500"
                    : "border-gray-600"
                }`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-400">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        />

        {/* Name Field */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Name is required";
              return undefined;
            },
          }}
          children={(field) => (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                id="username"
                type="text"
                placeholder=""
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full disabled:bg-gray-600 px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  field.state.meta.errors.length > 0
                    ? "border-red-500"
                    : "border-gray-600"
                }`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-400">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        />

        {/* Password Field */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              if (!value) return "Password is required";
              return undefined;
            },
          }}
          children={(field) => (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                {/* <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                      Forgot password?
                    </a> */}
              </div>
              <input
                id="password"
                type="password"
                placeholder=""
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full disabled:bg-gray-600 px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  field.state.meta.errors.length > 0
                    ? "border-red-500"
                    : "border-gray-600"
                }`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="mt-1 text-sm text-red-400">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full disabled:bg-green-800 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mt-6"
        >
          {"Sign up"}
        </button>
      </form>
    </>
  );
}
