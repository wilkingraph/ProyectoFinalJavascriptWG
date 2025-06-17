import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Reservar from './components/Reservar';
import VerReservaciones from './components/VerReservaciones';
import ImprimirReservacion from './components/ImprimirReservacion';

// NavBar Estilo 
const NavBar = styled.nav`
  background-color: #0066cc;
  padding: 20px;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0 20px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '80px' }}>
          Senator - Sistema de Reservaciones - By Wilkins
        </h1>

        {/* Navbar */}
        <NavBar>
          <NavList>
            <NavItem>
              <NavLink href="/">Realizar Reservación</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/ver">Ver Reservaciones</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/imprimir">Imprimir Reservación</NavLink>
            </NavItem>
          </NavList>
        </NavBar>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Reservar />} />
          <Route path="/ver" element={<VerReservaciones />} />
          <Route path="/imprimir" element={<ImprimirReservacion />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
