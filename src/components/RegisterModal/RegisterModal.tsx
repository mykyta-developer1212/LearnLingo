import style from "./RegisterModal.module.css";
import { register as registerUser } from "../../firebase/auth";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 chars").required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;
const STORAGE_KEY = "register-form";

type Props = {
  onClose: () => void;
};

export default function RegisterModal({ onClose }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.name) setValue("name", data.name);
      if (data.email) setValue("email", data.email);
      if (data.password) setValue("password", data.password);
    }
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.email, data.password);
      localStorage.removeItem(STORAGE_KEY);
      onClose();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) alert(error.message);
      else alert("Something went wrong");
    }
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, [field]: value }));
  };

  return (
    <div className={style.registerWrapper}>
      <div className={style.registerInfo}>
        <h1>Registration</h1>
        <p>Thank you for your interest in our platform! Please provide the following information</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={style.registerForm}>
        <div className={style.field}>
          <input
            placeholder="Name"
            {...register("name")}
            onChange={handleChange("name")}
            className={`${style.registerInput} ${errors.name ? style.errorInput : ""}`}
          />
          {errors.name && <span className={style.error}>{errors.name.message}</span>}
        </div>

        <div className={style.field}>
          <input
            placeholder="Email"
            {...register("email")}
            onChange={handleChange("email")}
            className={`${style.registerInput} ${errors.email ? style.errorInput : ""}`}
          />
          {errors.email && <span className={style.error}>{errors.email.message}</span>}
        </div>

        <div className={style.field}>
          <div className={style.inputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              onChange={handleChange("password")}
              className={`${style.registerInput} ${errors.password ? style.errorInput : ""}`}
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
              <g stroke="#121417" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M14.95 14.95A8.4 8.4 0 0 1 10 16.667C4.167 16.667.833 10 .833 10A15.4 15.4 0 0 1 5.05 5.05m3.2-1.517a7.6 7.6 0 0 1 1.75-.2c5.833 0 9.167 6.667 9.167 6.667a15.4 15.4 0 0 1-1.8 2.658m-5.6-.891a2.501 2.501 0 0 1-4.329-1.749 2.5 2.5 0 0 1 .795-1.785M.833.833l18.334 18.334" />
              </g>
            </svg>
          </div>
          {errors.password && <span className={style.error}>{errors.password.message}</span>}
        </div>

        <button type="submit" className={style.registerBtn}>Sign Up</button>
      </form>
    </div>
  );
}