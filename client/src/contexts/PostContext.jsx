import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../services/posts";

const Context = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export function usePost() {
  return useContext(Context);
}
// eslint-disable-next-line react/prop-types
export function PostProvider({ children }) {
  const { id } = useParams();
  const { loading, error, value: post } = useAsync(() => getPost(id), [id]);

  const [comments, setComments] = useState([]);

  const commentsByParentId = useMemo(() => {
    if (comments == null) return [];
    const group = {};
    comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  useEffect(() => {
    if (post?.comments == null) return;
    return setComments(post.comments);
  }, [post?.comments]);

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  function createLocalComment(comment) {
    setComments((prevComments) => {
      return [comment, ...prevComments];
    });
  }
  function updateLocalComment(id, message) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, message };
        } else {
          return comment;
        }
      });
    });
  }

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <Context.Provider
      value={{
        post: { id, ...post },
        getReplies,
        rootComments: commentsByParentId[null],
        createLocalComment,
        updateLocalComment,
      }}
    >
      {children}
    </Context.Provider>
  );
}
