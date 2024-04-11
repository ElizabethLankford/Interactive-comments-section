import { Routes, Route } from "react-router-dom";
import Comments from "./components/Comments";
import Footer from "./components/Footer";
import { PostList } from "./components/PostList";
import "./App.css";

function App() {
  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={null} />
      </Routes>

      <Comments />
      <Footer />
    </div>
  );
}

export default App;
