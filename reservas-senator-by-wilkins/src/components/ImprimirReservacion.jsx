import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Estilos
const Container = styled.div`
  padding: 50px;
  font-family: 'Arial', sans-serif;
  background-color: #f4f7fc;
  min-height: 100vh;
  background-image: url('http://localhost:1337/uploads/royce_fonseca_Zch_aimk7_JE_unsplash_94a09ef850.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const DropdownContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin-bottom: 40px;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background-color: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #0066cc;
    outline: none;
  }
`;

const ReservacionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px; 
  justify-items: center;
  width: 100%;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); 
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ReservacionCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #005bb5;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 20px;
`;

//Ver Reservaciones Por Restaurantes
const ImprimirReservaciones = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [reservaciones, setReservaciones] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState("");
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  
  useEffect(() => {
    axios
      .get("http://localhost:1337/api/restaurantes")
      .then((response) => {
        setRestaurantes(response.data.data); 
      })
      .catch((error) => {
        console.error("Error cargando los restaurantes", error);
      });
  }, []);

  
  const cargarReservaciones = (restauranteId, hora) => {
    if (!restauranteId) {
      setReservaciones([]);
      return;
    }

    const url = hora
      ? `http://localhost:1337/api/reservacions?populate[0]=restaurante&filters[restaurante][id][$eq]=${restauranteId}&filters[horario][$eq]=${hora}`
      : `http://localhost:1337/api/reservacions?populate[0]=restaurante&filters[restaurante][id][$eq]=${restauranteId}`;

    axios
      .get(url)
      .then((response) => {
        setReservaciones(response.data.data); 
      })
      .catch((error) => {
        console.error("Error al cargar las reservaciones", error);
      });
  };

  const manejarRestauranteCambio = (e) => {
    const restauranteId = e.target.value;
    setRestauranteSeleccionado(restauranteId);
    cargarReservaciones(restauranteId, horaSeleccionada);
  };

  const manejarHoraCambio = (e) => {
    const hora = e.target.value;
    setHoraSeleccionada(hora);
    cargarReservaciones(restauranteSeleccionado, hora);
  };

  
  const eliminarReservacion = (documentId) => {
    axios
      .delete(`http://localhost:1337/api/reservacions/${documentId}`)
      .then(() => {
        alert("Reservación eliminada con éxito.");
        cargarReservaciones(restauranteSeleccionado, horaSeleccionada);
      })
      .catch((error) => {
        console.error("Error al eliminar la reservación", error);
      });
  };

  return (
    <Container>
      <Title>Imprimir Reservaciones por Restaurante</Title>

     
      <DropdownContainer>
        <h3>Seleccionar Restaurante</h3>
        <Select value={restauranteSeleccionado} onChange={manejarRestauranteCambio}>
          <option value="">Seleccione un restaurante</option>
          {restaurantes.map((restaurante) => (
            <option key={restaurante.id} value={restaurante.id}>
              {restaurante.nombre}
            </option>
          ))}
        </Select>
      </DropdownContainer>

      
      <DropdownContainer>
        <h3>Seleccionar Hora</h3>
        <Select value={horaSeleccionada} onChange={manejarHoraCambio}>
          <option value="">Seleccione una hora (opcional)</option>
          <option value="Hora: 18-20">Hora: 18-20</option>
          <option value="Hora: 20-22">Hora: 20-22</option>
        </Select>
      </DropdownContainer>

      
      <div>
        <h2>Reservaciones</h2>
        <ReservacionGrid>
          {reservaciones.length > 0 ? (
            reservaciones.map((reservacion) => (
              <ReservacionCard key={reservacion.documentId}>
                <h3>{reservacion.nombre_cliente} - {reservacion.cantidad_personas} personas</h3>
                <p>Restaurante: {reservacion.restaurante ? reservacion.restaurante.nombre : "Desconocido"}</p>
                <p>Hora: {reservacion.horario}</p>
                <Button onClick={() => eliminarReservacion(reservacion.documentId)}>Cancelar Reservación</Button>
              </ReservacionCard>
            ))
          ) : (
            <p>No hay reservaciones para este restaurante{horaSeleccionada && ` en la hora ${horaSeleccionada}`}. </p>
          )}
        </ReservacionGrid>
      </div>
    </Container>
  );
};

export default ImprimirReservaciones;
