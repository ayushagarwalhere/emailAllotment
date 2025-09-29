// src/components/RadialGradient.jsx
function RadialGradient() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none absolute left-1/2 -translate-x-1/2 top-[-145vh]             
        h-[225vh] w-[225vh]          
        rounded-full  
        blur              
        opacity-100         
        bg-[radial-gradient(ellipse_at_center,_rgba(260,211,252,0.8)_0%,_rgba(80,200,252,0.4)_50%,_rgba(125,211,252,0.4)_100%)]
      "
    />
  );
}
export default RadialGradient   