import "@fontsource/josefin-sans";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/layout/Header";
import { useEffect } from "react";
import { createInitialRooms } from "./utils/roomUtils";
import { createInitialSpeakers } from "./utils/speakerUtils";
import { DataProvider } from "./context/DataContext";
import { AppRoutes } from "./routes/Routes";
import NeatBackground from './components/AnimatedBackground';
import { CustomCursor } from "./components/CustomCursor";

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
            <CustomCursor />
            <NeatBackground />
            <Header />
            <AppRoutes />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
