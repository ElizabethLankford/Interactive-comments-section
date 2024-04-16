import { usePost } from "../contexts/PostContext";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { createComment } from "../services/comments";
import { useAsyncFN } from "../hooks/useAsync";
export function Post() {
  const { post, rootComments, createLocalComment } = usePost();
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFN(createComment);

  function onCommentCreate(message) {
    return createCommentFn({ postId: post.id, message }).then(
      createLocalComment
    );
  }
  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3>Comments</h3>
      <section>
        <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />
        {/* {post.comments.map((comment) => {
          return <p key={comment.id}>{comment.message}</p>;
        })} */}
        {rootComments != null && rootComments.length > 0 && (
          <div>
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  );
}
