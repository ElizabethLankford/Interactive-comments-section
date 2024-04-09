import { comments } from "../../data.json";
import Plus from "../assets/images/icon-plus.svg?react";
import Minus from "../assets/images/icon-minus.svg?react";
function Comments() {
  console.log(comments);
  const commentsEl = comments.map((comment) => {
    return (
      <div className="comment-container" key={comment.id}>
        <div className="comment">
          <div className="score">
            <Plus />
            {comment.score}
            <Minus />
          </div>
          <div className="comment-inner">
            <div className="user">
              <div className="user-inner">
                <img
                  height={50}
                  src={`../assets/images/avatars/image-amyrobson.png`}
                  alt="profile image"
                />
                <h5>{comment.user.username}</h5>
                <p>{comment.createdAt}</p>
              </div>

              <div className="to-reply">
                <button>reply</button>
              </div>
            </div>
            {comment.content}
          </div>
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
