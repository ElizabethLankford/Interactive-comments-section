import { Routes, Route } from "react-router-dom";
import Comments from "./components/Comments";
import Footer from "./components/Footer";
import { Post } from "./components/Post";
import { PostList } from "./components/PostList";
import { PostProvider } from "./contexts/PostContext";
import "./App.css";

function App() {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route
          path="/posts/:id"
          element={
            <PostProvider>
              <Post />
            </PostProvider>
          }
        />
      </Routes>

      <Comments />
      <Footer />
    </div>
  );
}

export default App;
