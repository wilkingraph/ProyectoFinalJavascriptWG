import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Reservar from './components/Reservar';
import VerReservaciones from './components/VerReservaciones';
import ImprimirReservacion from './components/ImprimirReservacion';

// Estilo 
const NavBar = styled.nav`
  background-color: #004a99; /* Más profundo y suave azul */
  padding: 20px;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
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
  color: #e6e6e6; /* Gris claro para mejor lectura */
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #ffb400; /* Amarillo cálido que destaca sin chocar */
  }
`;

const footerFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #004a99 0%, #002d59 100%); /* degradado elegante y profundo */
  color: #f0f0f0;
  text-align: center;
  padding: 40px 20px;
  position: relative;
  bottom: 0;
  width: 100%;
  animation: ${footerFadeIn} 1s ease-in-out;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.25);
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const FooterTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #ffb400; /* Amarillo cálido para llamar la atención */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FooterText = styled.p`
  margin: 10px 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #dcdcdc; /* Gris muy claro para texto */
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FooterLink = styled.a`
  color: #ffb400;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #ffa500;
    transform: translateY(-2px);
  }
`;

const FooterIcon = styled.i`
  margin: 0 15px;
  font-size: 1.8rem;
  color: #ffb400;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: #ffa500;
    transform: translateY(-5px);
  }
`;

const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '80px', color: '#004a99', fontFamily: 'Arial, sans-serif' }}>
          Senator - Sistema de Reservaciones - By Wilkins Ferreira
        </h1>

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

        <Routes>
          <Route path="/" element={<Reservar />} />
          <Route path="/ver" element={<VerReservaciones />} />
          <Route path="/imprimir" element={<ImprimirReservacion />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTitle>Senator - Sistema de Reservaciones - Proyecto Final JavaScript by Wilkins.</FooterTitle>
      <FooterText>&copy; 2025 <strong>Wilkins Ferreira</strong>. Todos los derechos reservados.</FooterText>
      <FooterText>Desarrollado por <strong>Wilkins Ferreira</strong></FooterText>
      <FooterText>
        <FooterLink href="mailto:wilkinferreira@gmail.com">wilkinferreira@gmail.com</FooterLink>
      </FooterText>

      <div>
        <FooterLink href="https://facebook.com/wilkin.ferreira.39" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FooterIcon className="fab fa-facebook"></FooterIcon>
        </FooterLink>
        <FooterLink href="https://twitter.com/wilkinferreira" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FooterIcon className="fab fa-twitter"></FooterIcon>
        </FooterLink>
        <FooterLink href="https://linkedin.com//wilkin-graph-a57b31114" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FooterIcon className="fab fa-linkedin"></FooterIcon>
        </FooterLink>
      </div>
    </FooterContainer>
  );
};


export default App;

