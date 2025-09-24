import css from "./Button.module.css";

function Button({ children, type = "button", onClick, className, ...props }) {
  const buttonClass = className || css.button;

  return (
    <button type={type} className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
