import { useState, useRef, useEffect } from "react";
import style from "./CustomDropdown.module.css";

type OptionType = {
    value: string;
    label: string;
};

type CustomDropdownProps = {
    label?:string;
    options: OptionType[];
    value: string;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
    className?: string;
};

export default function CustomDropdown ({
    label,
    options,
    value,
    onChange,
    className,
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const customdropdownRef = useRef<HTMLDivElement | null>(null);
   
    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                customdropdownRef.current && !customdropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
      <div className={style.container}>
        <div className={`${style.wrapper} ${className || ""}`} ref={customdropdownRef}>
            {label && <p className={style.label}>{label}</p>}
            <div className={style.select}
            onClick={() => setIsOpen((prev) => !prev)}>
                {options.find(option => option.value === value)?.label || options[0]?.label}
            <span className={style.arrow}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5L10 12.5L15 7.5" stroke="#121417" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            </div>
            

            {isOpen && (
                <div className={style.customDropDown}>
                    {options.map((option) => (
                        <div key={option.value}
                        className={`${style.option} ${option.value === value ? style.active : ""}`}
                        onClick={() => handleSelect(option.value)}
                        >
                        {option.label}
                </div>
                ))}
            </div>
            )}
        </div>
    </div>
    );
}
