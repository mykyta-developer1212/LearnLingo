import style from "./RegisterModal.module.css";
import { register as registerUser } from "../../firebase/auth";
import { FirebaseError } from "firebase/app";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 chars").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
  onClose: () => void;
};

export default function RegisterModal({ onClose }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.email, data.password);
      onClose();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className={style.registerWrapper}>
      <div className={style.registerInfo}>
        <h1>Registration</h1>
        <p>
          Thank you for your interest in our platform! In order to register,
          we need some information. Please provide us with the following information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={style.registerForm}>
        <div className={style.field}>
          <input
            placeholder="Name"
            className={`${style.registerInput} ${
              errors.name ? style.errorInput : ""
            }`}
            {...register("name")}
          />
          {errors.name && (
            <span className={style.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={style.field}>
          <input
            placeholder="Email"
            className={`${style.registerInput} ${
              errors.email ? style.errorInput : ""
            }`}
            {...register("email")}
          />
          {errors.email && (
            <span className={style.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={style.field}>
          <div className={style.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`${style.registerInput} ${
                errors.password ? style.errorInput : ""
              }`}
              {...register("password")}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              className={style.iconRegister}
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              <g
                stroke="#121417"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                clipPath="url(#a)"
              >
                <path d="M14.95 14.95A8.4 8.4 0 0 1 10 16.667C4.167 16.667.833 10 .833 10A15.4 15.4 0 0 1 5.05 5.05m3.2-1.517a7.6 7.6 0 0 1 1.75-.2c5.833 0 9.167 6.667 9.167 6.667a15.4 15.4 0 0 1-1.8 2.658m-5.6-.891a2.501 2.501 0 0 1-4.329-1.749 2.5 2.5 0 0 1 .795-1.785M.833.833l18.334 18.334" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h20v20H0z" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {errors.password && (
            <span className={style.error}>{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className={style.registerBtn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}