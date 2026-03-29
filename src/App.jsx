import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Branch from "./pages/Branch";
import Semester from "./pages/Semester";
import Subject from "./pages/Subject";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import StudyGuideBot from "./pages/StudyGuideBot";

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="bg-background font-[Inter] text-on-surface min-h-screen antialiased">
      {!isAuthPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/branch/:branchName" element={<Branch />} />
          <Route
            path="/branch/:branchName/semester/:semId"
            element={<Semester />}
          />
          <Route
            path="/branch/:branchName/semester/:semId/subject/:subjectName"
            element={<Subject />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/study-guide" element={<StudyGuideBot />} />
        </Routes>
      </AnimatePresence>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
