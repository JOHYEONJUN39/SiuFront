import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import WritePage from "./pages/WritePage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./Layout";
import DetailPage from "./pages/DetailPage";
import NotPage from "./pages/404Page";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state: any) => state.user);

  return (
    <div className="App">
      <Routes>
        {user.id ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/write" element={<WritePage />} />
              <Route path="/Profile" element={<ProfilePage />} />
              <Route path="*" element={<NotPage />} />
            </Route>
            <Route path="/posts/:postId" element={<DetailPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotPage />} />
            </Route>
            <Route path="/posts/:postId" element={<DetailPage />} />
            <Route path="/write" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
