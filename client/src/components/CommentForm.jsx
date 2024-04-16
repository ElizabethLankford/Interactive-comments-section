/* eslint-disable react/prop-types */
import { useState } from "react";

export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(message).then(() => setMessage(""));
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button disabled={loading}>{loading ? "Loading" : "Post"}</button>
      </div>
      <div>{error}</div>
    </form>
  );
}
