export default function Comment({ id, message, user, createdAt }) {
  return <div key={id}>{message}</div>;
}
