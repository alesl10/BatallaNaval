import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
//Routes
import Login from "./Routes/Login.jsx";
import Home from "./Routes/Home.jsx";
import Register from "./Routes/Register.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="relative flex flex-col justify-between h-svh"> 
        <div className="absolute w-full h-full bg-primary/10 -z-10"></div>
          <img
            src="fondobatalla.webp"
            alt=""
            className="absolute w-full h-full -z-20"
          />
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route
                path="*"
                element={
                  <div className="w-full h-full text-4xl bg-white text-center flex justify-center items-center">
                    <img src="404_page-not-found-1024x576.webp" alt="" />
                  </div>
                }
              />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
