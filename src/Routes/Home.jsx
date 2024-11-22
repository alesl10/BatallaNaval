import { useState, useEffect, useContext } from "react";
import Tablero from "../components/Tablero.jsx";
import { getDificultad } from "../api/dificultad.js";
import { AuthContext } from "../Context/AuthContext.jsx";
import { addBarco } from "../api/barco.js";
import { addPartida } from "../api/partida.js";
import Navbar from "../components/NavBar/index.jsx";

const Home = () => {
  const { user, mejorJugador } = useContext(AuthContext);
  const [barcos, setBarcos] = useState([]);
  const [dificultad, setDificultad] = useState([]);
  const [filasTablero, setFilasTablero] = useState([]);
  const [columnasTablero, setColumnasTablero] = useState([]);
  const [nivel, setNivel] = useState();
  const [partidaID, setPartidaID] = useState();

  const obtenerDificultades = async () => {
    const response = await getDificultad();
    setDificultad(response.data.data);
  };

  const reiniciar = () => {
    setFilasTablero([]);
    setColumnasTablero([]);
    setBarcos([]);
  };

  const crearPartida = async () => {
    const modelo = { dificultadId: nivel };
    const response = await addPartida(modelo);
    setPartidaID(response.data.data);
    const idPartida = response.data.data; // id de la partida
    //barcos grandes
    for (let i = 0; i < 1; i++) {
      crearBarcos(4, idPartida);
    }
    //barcos medianoGrande
    for (let i = 0; i < 2; i++) {
      crearBarcos(3, idPartida);
    }
    //barcos mediano
    for (let i = 0; i < 3; i++) {
      crearBarcos(2, idPartida);
    }
    //barcos pequeño
    for (let i = 0; i < 4; i++) {
      crearBarcos(1, idPartida);
    }
    if (nivel == 1) {
      crearTablero(6);
    } else if (nivel == 2) {
      crearTablero(8);
    } else {
      crearTablero(10);
    }
  };

  //Funcion para crear barcos
  const crearBarcos = async (tamanio, partida_id) => {
    let barco = {
      tamanio: tamanio,
      partida_id: partida_id,
    };
    const response = await addBarco(barco);
    let idBarco = response.data.data; //este es el id del barco
    barco = {
      id: idBarco,
      tamanio,
      partida_id,
    };
    setBarcos((prevBarcos) => [...prevBarcos, barco]);
  };

  // funcion para crear tablero
  const crearTablero = (nivel) => {
    let fila = [];
    let columna = [];

    // Crear las filas (de 1 a nivel)
    for (let i = 1; i <= nivel; i++) {
      fila.push(i); // Usamos push para agregar elementos en el índice correcto
    }

    // Crear las columnas (de 'a' a la letra correspondiente)
    for (let i = 0; i < nivel; i++) {
      columna.push(String.fromCharCode(97 + i)); // 'a' es 97 en Unicode
    }

    // Actualizar los estados con los valores generados
    setFilasTablero(fila);
    setColumnasTablero(columna);
  };

  const handleChange = (e) => {
    setNivel(e.target.value);
  };

  useEffect(() => {
    obtenerDificultades();
  }, []);

  return (
    <main className="flex flex-col gap-4 items-center h-svh ">
      {user && mejorJugador ? <Navbar user={user} mejorJugador={mejorJugador} /> : ""}

      <div className="flex gap-2 shadow-2xl  items-center justify-center bg-gray-200 p-10 rounded-lg">
        {filasTablero.length < 1 || columnasTablero.length < 1 ? (
          <div className="flex flex-col gap-2 rounded bg-primary p-5  text-white font-semibold items-center">
            <select
              className="w-[200px] text-black"
              name="dificultad"
              id=""
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Selecciona una dificultad
              </option>
              {dificultad.map((d, i) => (
                <option key={i} value={d.id_dificultad}>
                  {d.tipo}
                </option>
              ))}
            </select>

            <button
              className="px-2 py-1 bg-white rounded-full text-primary hover:bg-green-600 hover:text-gray-200"
              onClick={() => crearPartida()}
            >
              Crear Tablero
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center ">
            <Tablero
              barcos={barcos}
              filasTablero={filasTablero}
              columnasTablero={columnasTablero}
              partidaID={partidaID}
              user={user}
              reiniciar={reiniciar}
            />
            <button
              onClick={() => reiniciar()}
              className="bg-red-600 text-white px-3 py-1 rounded-xl"
            >
              Reiniciar
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
