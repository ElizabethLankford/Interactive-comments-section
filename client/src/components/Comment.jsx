/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePost } from "../contexts/PostContext";
import { CommentList } from "./CommentList";
import IconBtn from "./IconBtn";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import { CommentForm } from "./CommentForm";
import { useAsyncFN } from "../hooks/useAsync";
import {
  createComment,
  updateComment,
  deleteComment,
  toggleCommentLike,
} from "../services/comments";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Comment({
  id,
  message,
  user,
  createdAt,
  likeCount,
  likedByMe,
}) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    post,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    toggleLocalCommentLike,
  } = usePost();
  const createCommentFn = useAsyncFN(createComment);
  const updateCommentFn = useAsyncFN(updateComment);
  const deleteCommentFn = useAsyncFN(deleteComment);
  const toggleCommentLikeFn = useAsyncFN(toggleCommentLike);
  const childComments = getReplies(id);

  function onCommentReply(message) {
    return createCommentFn
      .execute({ postId: post.id, message, parentId: id })
      .then((comment) => {
        setIsReplying(false);
        createLocalComment(comment);
      });
  }
  function onCommentUpdate(message) {
    return updateCommentFn
      .execute({ postId: post.id, message, id })
      .then((comment) => {
        setIsEditing(false);
        updateLocalComment(id, comment.message);
      });
  }
  function onCommentDelete() {
    return deleteCommentFn
      .execute({ postId: post.id, id })
      .then((comment) => deleteLocalComment(comment.id));
  }
  function onToggleCommentLike() {
    return toggleCommentLikeFn
      .execute({ id, postId: post.id })
      .then(({ addLike }) => toggleLocalCommentLike(id, addLike));
  }

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            initialValue={message}
            onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
          />
        ) : (
          <div className="message">{message}</div>
        )}

        <div className="footer">
          <IconBtn
            onClick={onToggleCommentLike}
            disable={toggleCommentLikeFn.loading.toString()}
            Icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? "unlike" : "Like"}
          >
            {likeCount}
          </IconBtn>
          <IconBtn
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />

          <IconBtn
            onClick={() => setIsEditing((prev) => !prev)}
            isActive={isEditing}
            Icon={FaEdit}
            aria-label={isEditing ? "Cancel Edit" : "Edit"}
          />
          <IconBtn
            disable={deleteCommentFn.loading.toString()}
            onClick={onCommentDelete}
            Icon={FaTrash}
            aria-label="Delete"
            color="danger"
          />
        </div>
        {deleteCommentFn.error && (
          <div className="error-msg mt-1">{deleteCommentFn.error}</div>
        )}
        {isReplying && (
          <div>
            <CommentForm
              autoFocus
              onSubmit={onCommentReply}
              loading={createCommentFn.loading}
              error={createCommentFn.error}
            />
          </div>
        )}
        {childComments?.length > 0 && (
          <>
            <div
              className={`nested-comments-stack ${
                areChildrenHidden ? "hide" : ""
              }`}
            >
              <button
                className="collapse-line"
                aria-label="Hide Replies"
                onClick={() => setAreChildrenHidden(true)}
              />
              <div className="nested-comment">
                <CommentList comments={childComments} />
              </div>
            </div>
            <button
              className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
              onClick={() => setAreChildrenHidden(false)}
            >
              Show Replies
            </button>
          </>
        )}
      </div>
    </>
  );
}
