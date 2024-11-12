//import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/layout/Header";
import { LoginPage } from "./pages/auth/LoginPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  return <>
  <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            {/* Protected routes will go here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>;
}

export default App;
