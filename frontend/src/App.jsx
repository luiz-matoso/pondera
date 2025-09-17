import "./App.css";
import Login from "./pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import { Bounce, ToastContainer } from "react-toastify";
import Layout from "./components/Layout/Layout";
import HomeQuestions from "./components/HomeQuestions/HomeQuestions";
import QuestionDetail from "./components/QuestionDetail/QuestionDetail";
import Profile from "./components/Profile/Profile";
import About from "./pages/About/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeQuestions />} />
            <Route path="question/:id" element={<QuestionDetail />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
