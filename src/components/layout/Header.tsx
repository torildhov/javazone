import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/JavaZoneLogo.png";
import { useState } from "react";
import "./Header.css";

// Type-definisjon for NavLink-komponentens props
type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
};

// Gjenbrukbar NavLink-komponent for konsistent navigasjonsstyling
const NavLink = ({ to, children, onClick }: NavLinkProps) => (
  <Link to={to} onClick={onClick}>
    {children}
  </Link>
);

//Type-definisjon for menyens tilstand
type MenuState = {
  isOpen: boolean;
};

// Hoved-Header-komponent for nettstedets navigasjon
export const Header = () => {
  //Tilstandshåndtering for hamburger-menyen
  const [menuState, setMenuState] = useState<MenuState>({ isOpen: false });
  // Hent autentiseringsstatus og utloggingsfunksjon fra auth context
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Håndter utlogging og omdiriger til innloggingssiden
  const handleLogout = () => {
    logout();
    setMenuState({ isOpen: false });
    navigate("/login");
  };

  //Veksle menyens åpen/lukket tilstand
  const toggleMenu = () => {
    setMenuState((prev) => ({ isOpen: !prev.isOpen }));
  };

  // Lukk menyen når en navigasjonslenke klikkes
  const handleNavClick = () => {
    setMenuState({ isOpen: false });
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="JavaZone logo" />
        </Link>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={menuState.isOpen ? "nav-open" : ""}>
        <NavLink to="/" onClick={handleNavClick}>
          Home
        </NavLink>
        <NavLink to="/speakers" onClick={handleNavClick}>
          Speakers
        </NavLink>
        <NavLink to="/talks" onClick={handleNavClick}>
          Talks
        </NavLink>
        <NavLink to="/rooms" onClick={handleNavClick}>
          Rooms
        </NavLink>

        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login" onClick={handleNavClick}>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};
