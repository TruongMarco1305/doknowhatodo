import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import AuthService from "@/service/auth.service";
import handleAxiosError from "@/utils/handle-axios-error";
import { useDispatch } from "react-redux";
import { authenticated } from "@/stores/auth.slice";
import { Notification } from "@douyinfe/semi-ui-19";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        await AuthService.login(value.email, value.password);
        dispatch(authenticated());
        Notification.success({
          title: "Authentication",
          content: "You have successfully logged in!",
          duration: 5000,
          theme: "light",
        });
        navigate({ to: "/tasks" });
      } catch (error) {
        handleAxiosError(error, (message: string) => {
          Notification.error({
            title: "Authentication",
            content: message,
            duration: 5000,
            theme: "light",
          });
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Form */}
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Sign in to your account
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
                if (!value) return "Username or email address is required";
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
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full disabled:bg-gray-800 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-600"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
          {/* 
            <button
              type="button"
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 13.5c0-.33.05-.66.05-1s-.02-.67-.05-1c.33 0 .66.05 1 .05 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .34.05.67.15 1-.5.33-1.05.56-1.6.73.13-.43.2-.9.2-1.38 0-2.49-2.01-4.5-4.5-4.5S6.05 3.51 6.05 6s2.01 4.5 4.5 4.5c.47 0 .93-.07 1.37-.2-.17.55-.4 1.08-.72 1.55-1.1.21-2.23.2-3.32-.03-2.77-.58-5.03-2.84-5.61-5.61C.41 3.77 1.67 1.23 3.82.64c2.15-.59 4.49.16 5.67 1.95.44.66.78 1.38 1.01 2.12.23-.74.58-1.46 1.01-2.12 1.18-1.79 3.52-2.54 5.67-1.95 2.15.59 3.41 3.13 2.8 5.44z"/>
              </svg>
              Continue with Apple
            </button> */}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Want to create an account?{" "}
            <Link
              to="/auth/signup"
              className="text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
