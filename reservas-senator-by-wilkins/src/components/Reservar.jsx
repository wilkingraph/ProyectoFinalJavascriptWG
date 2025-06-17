import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Estilos
const Container = styled.div`
  padding: 50px;
  font-family: 'Arial', sans-serif;
  background-image: url('http://localhost:1337/uploads/royce_fonseca_Zch_aimk7_JE_unsplash_94a09ef850.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 10px;
  display: block;
  color: #333;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0066cc;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-bottom: 20px;
  text-align: center;
`;

const CrearReservacion = () => {
  const [nombreCliente, setNombreCliente] = useState("");
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [horario, setHorario] = useState("Hora: 18-20");
  const [restauranteId, setRestauranteId] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  
  const limiteReservacionesPorHora = {
    "9": { "Hora: 18-20": 3, "Hora: 20-22": 3 }, 
    "12": { "Hora: 18-20": 4, "Hora: 20-22": 4 }, 
    "10": { "Hora: 18-20": 2, "Hora: 20-22": 2 }, 
    "11": { "Hora: 18-20": 3, "Hora: 20-22": 3 }, 
  };

  const nombreRestaurante = {
    "9": "Ember",
    "12": "Zao",
    "10": "Grappa",
    "11": "Larimar",
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreCliente || !restauranteId || cantidadPersonas <= 0 || !horario) {
      setMensajeError("Por favor complete todos los campos.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:1337/api/reservacions?populate[0]=restaurante&filters[restaurante][id][$eq]=${restauranteId}&filters[horario][$eq]=${horario}`
      );

      const reservaciones = response.data.data;
      const cantidadReservacionesPorHora = reservaciones.length;
      const limite = limiteReservacionesPorHora[restauranteId][horario];

      if (cantidadReservacionesPorHora >= limite) {
        setMensajeError(
          `El límite de ${limite} reservaciones por hora para ${nombreRestaurante[restauranteId]} en la hora ${horario} ya ha sido alcanzado.`
        );
        return;
      } else {
        const newReservacion = {
          nombre_cliente: nombreCliente,
          cantidad_personas: cantidadPersonas,
          horario: horario,
          restaurante: restauranteId,
        };

        const crearResponse = await axios.post("http://localhost:1337/api/reservacions", {
          data: newReservacion,
        });

        if (crearResponse.status === 201) {
          alert("Reservación creada con éxito.");
          setNombreCliente("");
          setCantidadPersonas(1);
          setRestauranteId("");
          setHorario("Hora: 18-20");
          setMensajeError(""); 
        }
      }
    } catch (error) {
      console.error("Error al verificar o crear la reservación", error);
      setMensajeError("Hubo un problema al realizar la reservación. Intenta de nuevo.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Crear Reservación</Title>
        {mensajeError && <ErrorMessage>{mensajeError}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Label>Nombre del cliente:</Label>
          <Input
            type="text"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
            required
          />

          <Label>Cantidad de personas:</Label>
          <Input
            type="number"
            value={cantidadPersonas}
            onChange={(e) => setCantidadPersonas(Number(e.target.value))}
            required
            min="1"
          />

          <Label>Seleccione el horario:</Label>
          <Select
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
          >
            <option value="Hora: 18-20">Hora: 18-20</option>
            <option value="Hora: 20-22">Hora: 20-22</option>
          </Select>

          <Label>Seleccione el restaurante:</Label>
          <Select
            value={restauranteId}
            onChange={(e) => setRestauranteId(e.target.value)}
            required
          >
            <option value="">Seleccionar restaurante</option>
            <option value="9">Ember</option>
            <option value="12">Zao</option>
            <option value="10">Grappa</option>
            <option value="11">Larimar</option>
          </Select>

          <Button type="submit">Crear Reservación</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default CrearReservacion;
