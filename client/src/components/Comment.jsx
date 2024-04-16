/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePost } from "../contexts/PostContext";
import { CommentList } from "./CommentList";
import IconBtn from "./IconBtn";
import { FaEdit, FaHeart, FaReply, FaTrash } from "react-icons/fa";
import { CommentForm } from "./CommentForm";
import { useAsyncFN } from "../hooks/useAsync";
import { createComment, updateComment } from "../services/comments";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Comment({ id, message, user, createdAt }) {
  const { post, getReplies, createLocalComment } = usePost();
  const createCommentFn = useAsyncFN(createComment);
  const updateCommentFn = useAsyncFN(updateComment);
  const childComments = getReplies(id);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        console.log(comment);
        //createLocalComment(comment);
      });
  }

  return (
    <>
      <div>
        <div>
          <span>{user.name}</span>
          <span>{dateFormatter.format(Date.parse(createdAt))}</span>
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
          <div>{message}</div>
        )}

        <div>
          <IconBtn Icon={FaHeart} aria-label="Like">
            2
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
          <IconBtn Icon={FaTrash} aria-label="Delete" />
        </div>
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
