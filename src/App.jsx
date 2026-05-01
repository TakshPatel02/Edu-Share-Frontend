import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AppProvider, useAppContext } from "./context/AppContext";
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
import Admin from "./pages/Admin";
import UserDashboard from "./pages/UserDashboard";

function AdminRoute() {
  const { authLoading, isAuthenticated, isAdmin } = useAppContext();

  if (authLoading) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-50">
        <p className="text-slate-600 font-medium">Loading admin access...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Admin />;
}

function DashboardRoute() {
  const { authLoading, isAuthenticated } = useAppContext();

  if (authLoading) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-50">
        <p className="text-slate-600 font-medium">Loading dashboard...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <UserDashboard />;
}

function AppRoutes() {
  const location = useLocation();
  const isShellHidden = ["/login", "/signup", "/admin"].includes(
    location.pathname,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-background font-[Inter] text-on-surface min-h-screen antialiased">
      {!isShellHidden && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardRoute />} />
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
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </AnimatePresence>
      {!isShellHidden && <Footer />}
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
