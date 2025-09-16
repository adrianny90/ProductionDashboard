import { useFormik } from "formik";
import type { FormikHelpers } from "formik";
import { loginSchema } from "../schemas/form";
import { signIn } from "../hooks/auth";
import { useState } from "react";

interface Values {
  email: string;
  password: string;
}
const Login = () => {
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
      // console.log(values);
      // console.log(actions);
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });
      await signIn(values);
      actions.resetForm();
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-w-2xl  justify-center">
      <div className="min-h-fit min-w-64 bg-gray-100">
        <div className="  mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Type in your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mt-2 text-blue-500"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-blue-300 transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
