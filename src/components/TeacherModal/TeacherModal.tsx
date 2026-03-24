import { useState, useEffect } from "react";
import type { Teacher } from "../../types/teacher";
import style from "./TeacherModal.module.css";

interface Props {
  teacher: Teacher;
  onClose: () => void;
}

type FormState = {
  reason: string;
  name: string;
  email: string;
  phone: string;
};

const STORAGE_KEY = "teacher-form";

const defaultForm: FormState = {
  reason: "",
  name: "",
  email: "",
  phone: "",
};

export default function TeacherModal({ teacher, onClose }: Props) {
  const [form, setForm] = useState<FormState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultForm;
      }
    }

    return defaultForm;
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isInvalid = (value: string) => value.trim() === "";

  const getError = (field: keyof FormState) => {
    if (!submitted) return "";

    switch (field) {
      case "name":
        return isInvalid(form.name) ? "Full name is required" : "";
      case "email":
        return isInvalid(form.email) ? "Email is required" : "";
      case "phone":
        return isInvalid(form.phone) ? "Phone number is required" : "";
      case "reason":
        return isInvalid(form.reason)
          ? "Please select a reason"
          : "";
      default:
        return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const hasError =
      !form.name || !form.email || !form.phone || !form.reason;

    if (hasError) return;

    console.log("Sending:", {
      ...form,
      teacherId: teacher.id,
    });

    localStorage.removeItem(STORAGE_KEY);
    setForm(defaultForm);
    setSubmitted(false);
    onClose();
  };

  return (
    <form className={style.containerTeacherModal} onSubmit={handleSubmit}>
      <div className={style.trialLessonInfo}>
        <h1>Book trial lesson</h1>
        <p>
          Our experienced tutor will assess your current language level,
          discuss your learning goals, and tailor the lesson to your
          specific needs.
        </p>
      </div>

      <div className={style.teacherProfile}>
        <img
          className={style.teacherModalAvatar}
          src={teacher.avatar_url}
          alt={teacher.name}
        />

        <div>
          <h3 className={style.teacherLabel}>Your teacher</h3>
          <h2 className={style.teacherName}>
            {teacher.name} {teacher.surname}
          </h2>
        </div>
      </div>
      
      <div className={style.learningReason}>
        <h2 className={style.lessonReasonQuestion}>
          What is your main reason for learning English?
        </h2>

        {getError("reason") && (
          <span className={style.error}>{getError("reason")}</span>
        )}

        <ul className={style.reasonOption}>
          {[
            { value: "career", label: "Career and business" },
            { value: "kids", label: "Lesson for kids" },
            { value: "abroad", label: "Living abroad" },
            { value: "exams", label: "Exams and coursework" },
            { value: "travel", label: "Culture, travel or hobby" },
          ].map((item) => (
            <li key={item.value}>
              <label className={style.optionButton}>
                <input
                  type="radio"
                  name="reason"
                  value={item.value}
                  checked={form.reason === item.value}
                  onChange={handleChange}
                />
                <span className={style.customRadio}></span>
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.clientForm}>
        <div className={style.field}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={`${style.input} ${
              submitted && isInvalid(form.name) ? style.errorInput : ""
            }`}
          />
          {getError("name") && (
            <span className={style.error}>{getError("name")}</span>
          )}
        </div>

        <div className={style.field}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`${style.input} ${
              submitted && isInvalid(form.email) ? style.errorInput : ""
            }`}
          />
          {getError("email") && (
            <span className={style.error}>{getError("email")}</span>
          )}
        </div>

        <div className={style.field}>
          <input
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className={`${style.input} ${
              submitted && isInvalid(form.phone) ? style.errorInput : ""
            }`}
          />
          {getError("phone") && (
            <span className={style.error}>{getError("phone")}</span>
          )}
        </div>
      </div>

      <button type="submit" className={style.recordingButton}>
        Book
      </button>
    </form>
  );
}