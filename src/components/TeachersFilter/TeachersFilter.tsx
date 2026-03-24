import type { Dispatch, SetStateAction } from "react";
import CustomDropdown from "../CustomDropdown";
import style from "./TeachersFilter.module.css";

type FiltersState = {
  language: string;
  level: string;
  price: string;
};

type Props = {
  filters: FiltersState;
  setFilters: Dispatch<SetStateAction<FiltersState>>;
};

export default function Filters({filters, setFilters}: Props) {

  const levelOptions = [
    { value: "A1 Beginner", label: "A1 Beginner" },
    { value: "A2 Elementary", label: "A2 Elementary" },
    { value: "B1 Intermediate", label: "B1 Intermediate" },
    { value: "B2 Upper-Intermediate", label: "B2 Upper-Intermeate" },
  ];

  const languageOptions = [
    { value: "French", label: "French" },
    { value: "English", label: "English" },
    { value: "German", label: "German" },
    { value: "Ukrainian", label: "Ukrainian" },
    { value: "Polish", label: "Polish" },
  ];

  const priceOptions = [
    { value: "10 $", label: "10 $" },
    { value: "20 $", label: "20 $" },
    { value: "30 $", label: "30 $" },
    { value: "40 $", label: "40 $" },
  ];
  return (
    <>
      <div className={style.wrapper}>
        <CustomDropdown
          label="Languages"
          options={languageOptions}
          value={filters.language}
          onChange={(value: string) => 
            setFilters((prev) => ({...prev, language: value}))
          }
        />

        <CustomDropdown
          label="Level of knowledge"
          options={levelOptions}
          value={filters.level}
          onChange={(value: string) => 
            setFilters((prev) => ({...prev, level: value}))
          }
          className={style.selectLevel}
        />

        <CustomDropdown
          label="Price"
          options={priceOptions}
          value={filters.price}
          onChange={(value: string) => 
            setFilters((prev) => ({...prev, price: value}))
          }
          className={style.selectPrice}
        />
      </div>
    </>
  );
}
