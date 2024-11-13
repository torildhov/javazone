import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/layout/Header";
import { LoginPage } from "./pages/auth/LoginPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import RoomOverviewPage from "./pages/RoomOverviewPage";
import SpeakerOverviewPage from "./pages/SpeakerOverviewPage";
import { useEffect } from "react";
import { createInitialRooms } from "./utils/roomUtils";
import { createInitialSpeakers } from "./utils/speakerUtils";
import TalksOverviewPage from "./pages/TalksOverviewPage";
import { DataProvider } from "./context/DataContext";
function App() {
  useEffect(() => {
    createInitialRooms();
    createInitialSpeakers();
  }, []);
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/speakers" element={<SpeakerOverviewPage />} />
              <Route path="/talks" element={<TalksOverviewPage />} />
              <Route path="/rooms" element={<RoomOverviewPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                {/* Protected routes will go here */}
              </Route>
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
