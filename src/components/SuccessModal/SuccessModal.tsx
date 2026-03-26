import style from "./SuccessModal.module.css";

export default function SuccessModal() {
  return (
    <>
     <div className={style.successModalWrapper}>
        <h1>Trial lesson successfully booked!</h1>
     </div>
    </>
  );
}