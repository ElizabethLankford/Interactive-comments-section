import { comments } from "../../data.json";

function Comments() {
  console.log(comments);
  const commentsEl = comments.map((comment) => {
    return (
      <div className="comment-container" key={comment.id}>
        <div className="comment">
          <div className="user">
            <h5>{comment.user.username}</h5>
            <p>{comment.createdAt}</p>
            <p>score: {comment.score}</p>
          </div>
          {comment.content}
        </div>
        <div className="replies">
          {comment.replies.length
            ? comment.replies.map((item) => {
                return (
                  <p className="reply" key={item.id}>
                    {item.content}
                  </p>
                );
              })
            : ""}
        </div>
      </div>
    );
  });
  return (
    <>
      <p>Comments</p>
      {commentsEl}
    </>
  );
}

export default Comments;
