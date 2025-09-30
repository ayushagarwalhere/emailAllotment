const baseStyle = "px-4 py-1 cursor-pointer";

const variantStyle = {
  primary:
    "bg-neutral-900 hover:bg-neutral-900/90 text-neutral-100 px-4 py-1 rounded-md",
  secondary:
    "bg-neutral-100 text-black px-4 py-0.5 rounded-md border border-neutral-300",
  teriary: "outline-1 text-black px-2 py-0.5 rounded-md border",
};

function Button(props) {
  return (
    <button className={`${variantStyle[props.variant]} ${baseStyle}`}>
      {props.children}
    </button>
  );
}
export default Button;
