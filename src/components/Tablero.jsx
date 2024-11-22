import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { addCoordenadas } from "../api/coordenadas.js";
import { addJugadas } from "../api/jugadas.js";
import { updatePartida } from "../api/partida.js";

function Tablero({
  partidaID,
  user,
  barcos,
  filasTablero,
  columnasTablero,
  reiniciar,
}) {
  const [acertados, setAcertados] = useState([]);
  const [jugadas, setJugadas] = useState(0);
  const [coordenadas, setCoordenadas] = useState([]);

  useEffect(() => {
    if (barcos.length == 10) {
      setCoordenadas([]);
      barcos.forEach((barco) => {
        generarCoordenada(barco);
      });
    }
  }, [barcos]);

  const generarCoordenada = (barco) => {
    let nuevasCoordenadas = [];
    // Genero coordenada
    const generarCoordenadaAleatoria = () => {
      let filaRandom =
        filasTablero[Math.floor(Math.random() * filasTablero.length)];
      let columnaRandom =
        columnasTablero[Math.floor(Math.random() * columnasTablero.length)];

      return { fila: filaRandom, columna: columnaRandom };
    };

    // cheqeo si esta ocupada
    const estaOcupada = (coordenada) => {
      return coordenadas.some(
        (coord) =>
          coord.fila === coordenada.fila && coord.columna === coordenada.columna
      );
    };

    // Verifico
    let coordenada = generarCoordenadaAleatoria();

    // si esta ocupada genero otra
    while (estaOcupada(coordenada)) {
      console.log("Coordenada ocupada, generando una nueva...");
      coordenada = generarCoordenadaAleatoria(); // Generar una nueva coordenada
    }

    //Agrego a la base de datos y
    let coordBase = {
      fila: coordenada.fila,
      columna: coordenada.columna,
      barco_id: barco.id,
    };
    addCoordenadas(coordBase);
    nuevasCoordenadas.push(coordBase);

    // Si el barco tiene más de un tamaño, generamos las demás coordenadas
    // if (barco.tamanio > 1) {
    //   for (let i = 1; i < barco.tamanio; i++) {
    //     let nuevaCoordenada = {
    //       fila: coordenada.fila + i,
    //       columna: coordenada.columna,
    //       barco_id: barco.id,
    //     };

    //     while (estaOcupada(nuevaCoordenada)) {
    //       console.log("Coordenada ocupada, generando una nueva...");
    //       nuevaCoordenada = {
    //         fila: coordenada.fila - i,
    //         columna: coordenada.columna,
    //         barco_id: barco.id,
    //       };
    //     }
    //     addCoordenadas(nuevaCoordenada);
    //     nuevasCoordenadas.push(nuevaCoordenada);
    //   }
    // }

    if (nuevasCoordenadas.every((coord) => coord.fila && coord.columna)) {
      // las agrego al estado coordenadas
      setCoordenadas((prevCoordenadas) => [
        ...prevCoordenadas,
        ...nuevasCoordenadas,
      ]);
    } else {
      console.log("Error: coordenada generada incorrecta", nuevasCoordenadas);
    }
  };

  const disparo = (fil, col) => {
    const jugada = {
      fila: fil,
      columna: col,
      jugador_id: user.id_jugador,
      partida_id: partidaID,
    };
    addJugadas(jugada);
    setJugadas(jugadas + 1);
    let rsp = coordenadas.find((b) => b.columna == col && b.fila == fil);
    if (rsp) {
      rsp.hundido = true;
      setAcertados((prev) => [...prev, { fila: fil, columna: col }]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "HUNDIDO!",
        showConfirmButton: false,
        timer: 700,
      });
      const barcoCasillero = document.getElementById(`${fil}-${col}`);
      barcoCasillero.classList.remove("hidden");
      barcoCasillero.classList.add("bg-red-500", "disabled");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "AGUA",
        showConfirmButton: false,
        timer: 700,
      });

      const casillero = document.getElementById(`${fil}${col}`);
      casillero.classList.remove("bg-primary");
      casillero.classList.add("bg-blue-300", "disabled");
    }

    let finish = coordenadas.every((b) => b.hundido === true);
    if (finish) {
      updatePartida(partidaID);
      Swal.fire({
        title: `El juego termino en ${jugadas} jugadas !`,
        text: "Desea volver a jugar?",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, volver a jugar !",
      }).then((result) => {
        if (result.isConfirmed) {
          reiniciar();
        }
      });
    }
  };

  return (
    <div className="flex gap-2 justify-center flex-col">
      <div className="flex flex-col gap-2">
        {filasTablero.map((fil, i) => (
          <div key={i} className="flex gap-2 justify-center">
            {columnasTablero.map((col, j) => (
              <div
                id={`${fil}${col}`}
                key={j}
                className={`w-[50px] h-[50px] flex items-center justify-center bg-primary `}
                onClick={(e) => {
                  if (!e.target.classList.contains("disabled")) {
                    disparo(fil, col);
                  }
                }}
              >
                <img
                  src="bote.png"
                  alt="img barco"
                  className=" hidden"
                  id={`${fil}-${col}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="text-center text-2xl font-semibold text-primary">
        <span>Jugadas Realizadas : {jugadas}</span>
      </div>
    </div>
  );
}

export default Tablero;
