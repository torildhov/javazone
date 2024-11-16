import "@fontsource/josefin-sans";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { useEffect } from "react";
import { createInitialSpeakers } from "./utils/speakerUtils";
import { DataProvider } from "./context/DataContext";
import { AppRoutes } from "./routes/Routes";
import NeatBackground from "./components/AnimatedBackground";
import { CustomCursor } from "./components/CustomCursor";

function App() {
  useEffect(() => {
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
            <Footer />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
