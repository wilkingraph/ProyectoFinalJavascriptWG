import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Estilos globales
const Container = styled.div`
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background-color: #f4f7fc;
  min-height: 100vh;
  background-image: url('http://localhost:1337/uploads/royce_fonseca_Zch_aimk7_JE_unsplash_94a09ef850.jpg');
  background-size: cover;
  background-position: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 40px;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background-color: #0066cc;
  color: white;
  padding: 12px;
  text-align: left;
  font-size: 1.1rem;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background-color: #004c99;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
  
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  font-size: 1rem;
  color: #333;
  background-color: ${({ $isFull }) => ($isFull ? '#f8d7da' : '#fff')};
  transition: background-color 0.3s ease;
`;

const FullMessage = styled.span`
  color: #e74c3c;
  font-weight: bold;
`;

const AvailableMessage = styled.span`
  color: #28a745;
  font-weight: bold;
`;

const NoReservacion = styled.span`
  color: #e0e0e0;
  font-style: italic;
`;

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 20px 0;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #005bb5;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

function VerReservaciones() {
  const [restaurantes, setRestaurantes] = useState([]); 
  const [reservaciones, setReservaciones] = useState([]); 

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/restaurantes")
      .then((response) => {
        setRestaurantes(response.data.data); 
        cargarReservaciones(); 
      })
      .catch((error) => {
        console.error("Error cargando los restaurantes", error);
      });
  }, []);

  const cargarReservaciones = () => {
    axios
      .get("http://localhost:1337/api/reservacions?populate[0]=restaurante")
      .then((response) => {
        setReservaciones(response.data.data); 
      })
      .catch((error) => {
        console.error("Error al cargar las reservaciones", error);
      });
  };

  const limiteReservacionesPorHora = {
    "Ember": {
      "Hora: 18-20": 3,
      "Hora: 20-22": 3,
    },
    "Zao": {
      "Hora: 18-20": 4,
      "Hora: 20-22": 4,
    },
    "Grappa": {
      "Hora: 18-20": 2,
      "Hora: 20-22": 2,
    },
    "Larimar": {
      "Hora: 18-20": 3,
      "Hora: 20-22": 3,
    }
  };

  const estaLleno = (restauranteNombre, horario) => {
    const reservacionesPorHorario = reservaciones.filter(
      (reservacion) =>
        reservacion.restaurante.nombre === restauranteNombre &&
        reservacion.horario === horario
    );
    const limite = limiteReservacionesPorHora[restauranteNombre][horario];
    return reservacionesPorHorario.length >= limite;
  };

  const calcularCuposDisponibles = (restauranteNombre, horario) => {
    const reservacionesPorHorario = reservaciones.filter(
      (reservacion) =>
        reservacion.restaurante.nombre === restauranteNombre &&
        reservacion.horario === horario
    );
    const limite = limiteReservacionesPorHora[restauranteNombre][horario];
    return limite - reservacionesPorHorario.length;
  };

  const agrupadasPorRestauranteYHora = () => {
    const agrupadas = {};

    reservaciones.forEach((reservacion) => {
      const restaurante = reservacion.restaurante ? reservacion.restaurante.nombre : "";
      const hora = reservacion.horario;

      if (!agrupadas[restaurante]) {
        agrupadas[restaurante] = {};
      }

      if (!agrupadas[restaurante][hora]) {
        agrupadas[restaurante][hora] = [];
      }

      agrupadas[restaurante][hora].push(reservacion);
    });

    return agrupadas;
  };

  const agrupadas = agrupadasPorRestauranteYHora();

  return (
    <Container>
      <Title>Ver Reservaciones</Title>

      {restaurantes.length > 0 ? (
        restaurantes.map((restaurante) => (
          <Card key={restaurante.id}>
            <h2>
              {restaurante.nombre}
              {estaLleno(restaurante.nombre, "Hora: 18-20") &&
              estaLleno(restaurante.nombre, "Hora: 20-22")
                ? " - Lleno en ambas horas"
                : ""}
            </h2>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Hora</TableHeader>
                  <TableHeader>Reservaciones</TableHeader>
                  <TableHeader>Estado</TableHeader>
                </tr>
              </thead>
              <tbody>
                {["Hora: 18-20", "Hora: 20-22"].map((hora) => (
                  <TableRow key={hora}>
                    <TableCell>{hora}</TableCell>
                    <TableCell>
                      {agrupadas[restaurante.nombre] &&
                      agrupadas[restaurante.nombre][hora] &&
                      agrupadas[restaurante.nombre][hora].length > 0 ? (
                        agrupadas[restaurante.nombre][hora].map((reservacion) => (
                          <div key={reservacion.id}>
                            {reservacion.nombre_cliente} - {reservacion.cantidad_personas} personas
                          </div>
                        ))
                      ) : (
                        <NoReservacion>No hay reservaciones para esta hora.</NoReservacion>
                      )}
                    </TableCell>
                    <TableCell>
                      {estaLleno(restaurante.nombre, hora) ? (
                        <FullMessage>¡Lleno!</FullMessage>
                      ) : (
                        <AvailableMessage>
                          Disponible ({calcularCuposDisponibles(restaurante.nombre, hora)} cupos)
                        </AvailableMessage>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </Card>
        ))
      ) : (
        <p>No hay restaurantes disponibles.</p>
      )}
      <Button onClick={cargarReservaciones}>Recargar Reservaciones</Button>
    </Container>
  );
}

export default VerReservaciones;
