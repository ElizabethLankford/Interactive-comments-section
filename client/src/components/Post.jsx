import { usePost } from "../contexts/PostContext";
import { CommentList } from "./CommentList";
export function Post() {
  const { post, rootComments } = usePost();

  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3>Comments</h3>
      <section>
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
