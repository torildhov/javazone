import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/JavaZoneLogo.png';
import { useState } from 'react';
import './Header.css';

// Type-definisjon for NavLink-komponentens props
type NavLinkProps = {
    to: string;
    children: React.ReactNode;
};

// Gjenbrukbar NavLink-komponent for konsistent navigasjonsstyling
const NavLink = ({ to, children }: NavLinkProps) => (
    <Link to={to}>
        {children}
    </Link>
);

//Type-definisjon for menyens tilstand
type MenuState = {
    isOpen: boolean;
}

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
        navigate('/login');
    };

    //Veksle menyens åpen/lukket tilstand
    const toggleMenu = () => {
        setMenuState(prev => ({ isOpen: !prev.isOpen }));
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="JavaZone logo" />
            </div>
            
            <button className="hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
    
            <nav className={menuState.isOpen ? 'nav-open' : ''}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/speakers">Speakers</NavLink>
                <NavLink to="/talks">Talks</NavLink>
                <NavLink to="/rooms">Rooms</NavLink>
    
                {isAuthenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
            </nav>
        </header>
    );
    }