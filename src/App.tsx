import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/layout/Header";
import { LoginPage } from "./pages/auth/LoginPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import RoomOverviewPage from "./pages/roomOverviewPage";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/rooms" element={<RoomOverviewPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              {/* Protected routes will go here */}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
