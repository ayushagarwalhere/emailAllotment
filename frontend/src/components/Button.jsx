const variantStyle = {
  primary: "bg-black text-white px-5 py-0.5 rounded-md text-center font-semibold ",
  secondary: "bg-white text-black px-4 py-0.5 rounded-md font-semibold",
  teriary: "outline-1 text-black px-2 py-0.5 rounded-md border",
}

function Button(props){
  return <button className={variantStyle[props.variant]}>{props.children}</button>
}
export default Button