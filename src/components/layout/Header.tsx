//Navigation and auth status display

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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

// Hoved-Header-komponent for nettstedets navigasjon
export const Header = () => {
    // Hent autentiseringsstatus og utloggingsfunksjon fra auth context
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // Håndter utlogging og omdiriger til innloggingssiden
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header>
            <nav>
                {/* Hoved-navigasjonslenker */}
                <NavLink to="/">Home</NavLink>
                <NavLink to="/speakers">Speakers</NavLink>
                <NavLink to="/talks">Talks</NavLink>
                <NavLink to="/rooms">Rooms</NavLink>

                {/* Betinget rendering basert på autentiseringsstatus */}
                {isAuthenticated ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
            </nav>
        </header>
    );
};
