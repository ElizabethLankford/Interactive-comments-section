import Comments from "./components/Comments";
import Footer from "./components/Footer";
import { PostList } from "./components/PostList";
import "./App.css";

function App() {
  return (
    <div className="body">
      <PostList />
      <Comments />
      <Footer />
    </div>
  );
}

export default App;
