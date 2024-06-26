// eslint-disable-next-line react/prop-types
export default function IconBtn({ Icon, isActive, color, children, ...props }) {
  return (
    <button
      className={`btn icon-btn ${isActive ? "active" : ""} ${color || ""}`}
      {...props}
    >
      <span className={`${children != null ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
