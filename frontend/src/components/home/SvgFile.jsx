const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-4 0 34 34"
    {...props}
    className="w-12 h-12 stroke-gray-500"
  >
    <g fill="none" fillRule="evenodd">
      <path
        strokeWidth={2}
        d="M1 1.993c0-.55.45-.993.995-.993h17.01c.55 0 1.34.275 1.776.625l3.44 2.75c.43.345.78 1.065.78 1.622v26.006c0 .55-.447.997-1 .997H2c-.552 0-1-.452-1-.993V1.993z"
      />
      <g fill="#575757">
        <path d="M6 12h14v1H6zM6 15h14v1H6zM6 18h14v1H6zM6 21h6v1H6z" />
      </g>
      <path fill="#474747" d="M18 2h1v6h-1z" />
      <path fill="#474747" d="M18 7h6v1h-6z" />
    </g>
  </svg>
);
export default SvgComponent;
