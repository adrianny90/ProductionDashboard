import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  firstName: yup.string().required("Required").min(2),
  lastName: yup.string().required("Required").min(2),
  password: yup.string().required("Required min 3 char").min(3),
  confirmPassword: yup.string().required("Required min 3 char").min(3),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().required("Wrong password").min(3),
});
