import { createContext, useContext, useMemo } from "react";
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

  const commentsByParentId = useMemo(() => {
    if (post?.comments == null) return [];
    const group = {};
    post.comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [post?.comments]);

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <Context.Provider
      value={{
        post: { id, ...post },
        getReplies,
        rootComments: commentsByParentId[null],
      }}
    >
      {children}
    </Context.Provider>
  );
  //const { id } = useParams();
  //const { loading, error, value: post } = useAsync(() => getPost(id), [id]);
  // const commentsByParentId = useMemo(() => {
  //   if (post?.comments == null) return [];
  //   const group = {};
  //   post.comments.forEach((comment) => {
  //     group[comment.parentId] ||= [];
  //     group[comment.parentId].push(comment);
  //   });
  //   return group;
  // }, [post?.comments]);
  // console.log(commentsByParentId);
  // return (
  //   <Context.Provider
  //     value={{
  //       post: { id, ...post },
  //     }}
  //   >
  //     {loading ? (
  //       <h1>loading...</h1>
  //     ) : error ? (
  //       <h1>{error}</h1>
  //     ) : (
  //       console.log(children)
  //     )}
  //   </Context.Provider>
  // );
}
