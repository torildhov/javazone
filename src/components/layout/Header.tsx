//Navigation and auth status display

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type NavLinkProps = {
    to: string;
    children: React.ReactNode;
};

const NavLink = ({ to, children }: NavLinkProps) => (
    <Link to={to}>
        {children}
    </Link>
);

export const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate('/login');
    };
  
    return (
      <header>
        <nav>
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
  };