import { useFormik } from "formik";
import type { FormikHelpers } from "formik";
import { loginSchema } from "../schemas/form";
import { signIn } from "../hooks/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
interface Values {
  email: string;
  password: string;
}

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values: Values, actions: FormikHelpers<Values>) => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });
      const res = await signIn(values);
      setUser({
        firstName: res.userName,
        user_exists: res.user_exists,
        role: res.userRole,
      });
      actions.resetForm();
      navigate("/");
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-black bg-[radial-gradient(circle_at_top,#cc25e9_0%,#000_15%,#000_100%)] font-sans flex flex-column items-center justify-center p-4 sm:p-6 md:p-8">
        <svg width="114" height="181" viewBox="0 0 114 181" fill="none">
          <path
            d="M107.294 13.4074C110.997 13.4074 114 10.4061 114 6.7037C114 3.00135 110.997 0 107.294 0C103.59 0 100.588 3.00135 100.588 6.7037C100.588 10.4061 103.59 13.4074 107.294 13.4074Z"
            fill="#9807C8"
          ></path>
          <path
            d="M40.2352 46.926C43.9387 46.926 46.9411 43.9246 46.9411 40.2223C46.9411 36.5199 43.9387 33.5186 40.2352 33.5186C36.5316 33.5186 33.5293 36.5199 33.5293 40.2223C33.5293 43.9246 36.5316 46.926 40.2352 46.926Z"
            fill="#9807C8"
          ></path>
          <path
            d="M73.7645 46.926C77.468 46.926 80.4704 43.9246 80.4704 40.2223C80.4704 36.5199 77.468 33.5186 73.7645 33.5186C70.0609 33.5186 67.0586 36.5199 67.0586 40.2223C67.0586 43.9246 70.0609 46.926 73.7645 46.926Z"
            fill="#9807C8"
          ></path>
          <path
            d="M40.2352 80.4445C43.9387 80.4445 46.9411 77.4432 46.9411 73.7408C46.9411 70.0385 43.9387 67.0371 40.2352 67.0371C36.5316 67.0371 33.5293 70.0385 33.5293 73.7408C33.5293 77.4432 36.5316 80.4445 40.2352 80.4445Z"
            fill="#9807C8"
          ></path>
          <path
            d="M73.7645 80.4445C77.468 80.4445 80.4704 77.4432 80.4704 73.7408C80.4704 70.0385 77.468 67.0371 73.7645 67.0371C70.0609 67.0371 67.0586 70.0385 67.0586 73.7408C67.0586 77.4432 70.0609 80.4445 73.7645 80.4445Z"
            fill="#9807C8"
          ></path>
          <path
            d="M107.294 80.4445C110.997 80.4445 114 77.4432 114 73.7408C114 70.0385 110.997 67.0371 107.294 67.0371C103.59 67.0371 100.588 70.0385 100.588 73.7408C100.588 77.4432 103.59 80.4445 107.294 80.4445Z"
            fill="#9807C8"
          ></path>
          <path
            d="M40.2352 113.963C43.9387 113.963 46.9411 110.962 46.9411 107.259C46.9411 103.557 43.9387 100.556 40.2352 100.556C36.5316 100.556 33.5293 103.557 33.5293 107.259C33.5293 110.962 36.5316 113.963 40.2352 113.963Z"
            fill="#9807C8"
          ></path>
          <path
            d="M40.2352 181C43.9387 181 46.9411 177.999 46.9411 174.296C46.9411 170.594 43.9387 167.593 40.2352 167.593C36.5316 167.593 33.5293 170.594 33.5293 174.296C33.5293 177.999 36.5316 181 40.2352 181Z"
            fill="#9807C8"
          ></path>
          <path
            d="M107.294 113.963C110.997 113.963 114 110.962 114 107.259C114 103.557 110.997 100.556 107.294 100.556C103.59 100.556 100.588 103.557 100.588 107.259C100.588 110.962 103.59 113.963 107.294 113.963Z"
            fill="#9807C8"
          ></path>
          <path
            d="M6.70588 13.4074C10.4094 13.4074 13.4118 10.4061 13.4118 6.7037C13.4118 3.00135 10.4094 0 6.70588 0C3.00233 0 0 3.00135 0 6.7037C0 10.4061 3.00233 13.4074 6.70588 13.4074Z"
            fill="#9807C8"
          ></path>
          <path
            d="M40.2352 13.4074C43.9387 13.4074 46.9411 10.4061 46.9411 6.7037C46.9411 3.00135 43.9387 0 40.2352 0C36.5316 0 33.5293 3.00135 33.5293 6.7037C33.5293 10.4061 36.5316 13.4074 40.2352 13.4074Z"
            fill="#9807C8"
          ></path>
          <path
            d="M73.7645 13.4074C77.468 13.4074 80.4704 10.4061 80.4704 6.7037C80.4704 3.00135 77.468 0 73.7645 0C70.0609 0 67.0586 3.00135 67.0586 6.7037C67.0586 10.4061 70.0609 13.4074 73.7645 13.4074Z"
            fill="#9807C8"
          ></path>
        </svg>
        <div className="w-full max-w-md shadow rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Sign In
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Type in your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full p-3 border border-gray-300 text-white rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type in your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full p-3 border border-gray-300 text-white rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 text-sm hover:text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-blue-300 transition-colors duration-200"
            >
              {isSubmitting ? "Submitting..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-purple-600 hover:text-blue-600 font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
        <svg
          width="368"
          height="385"
          viewBox="0 0 368 385"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5" filter="url(#filter0_f_25_1772)">
            <circle cx="175.5" cy="192.5" r="107.5" fill="#9807C8"></circle>
          </g>
          <defs>
            <filter
              id="filter0_f_25_1772"
              x="-17"
              y="0"
              width="385"
              height="385"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              ></feBlend>
              <feGaussianBlur
                stdDeviation="42.5"
                result="effect1_foregroundBlur_25_1772"
              ></feGaussianBlur>
            </filter>
          </defs>
        </svg>
      </div>{" "}
    </>
  );
};

export default Login;
