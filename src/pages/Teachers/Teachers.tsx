import { useState } from "react";
import TeachersFilter from "../../components/TeachersFilter/TeachersFilter";
import TeachersList from "../../components/TeachersList";
import Modal from "../../components/Modal/Modal";
import TeacherModal from "../../components/TeacherModal/TeacherModal";
import type { Teacher } from "../../types/teacher";
import style from "./Teachers.module.css";
import Header from "../../components/Header/Header";

type FiltersState = {
  language: string;
  level: string;
  price: string;
};

export default function Teachers() {
  const [filters, setFilters] = useState<FiltersState>({
    language: "",
    level: "",
    price: "",
  });

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const closeModal = () => setSelectedTeacher(null);

  return (
    <>
      <div className={style.teacherWrapper}>
        <div className={style.container}>
          <Header />
          <TeachersFilter filters={filters} setFilters={setFilters} />
          <TeachersList filters={filters} onContact={setSelectedTeacher} />
        </div>
      </div>

      {selectedTeacher && (
        <Modal onClose={closeModal}>
          <TeacherModal teacher={selectedTeacher} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}