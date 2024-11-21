import { useState } from "react";
import Swal from 'sweetalert2'


function Tablero({ barcos, filasTablero, columnasTablero }) {
    const [acertados, setAcertados] = useState([]);
    const [jugadas, setJugadas] = useState(0);
    

    const disparo = (fil, col) => {
        setJugadas(jugadas + 1)
        let rsp = barcos.find(b => b.columna === col && b.fila === fil);
        if (rsp) {
            rsp.hundido = true;
            setAcertados(prev => [...prev, { fila: fil, columna: col }]);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "HUNDIDOO !",
                showConfirmButton: false,
                timer: 700
            });
            const barcoCasillero = document.getElementById(`${fil}-${col}`)
            barcoCasillero.classList.remove('hidden')
            barcoCasillero.classList.add('bg-red-500')
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "AGUA",
                showConfirmButton: false,
                timer: 700
            });

            const casillero = document.getElementById(`${fil}${col}`)
            casillero.classList.remove('bg-primary')
            casillero.classList.add('bg-blue-300')
        }

        let finish = barcos.every(b => b.hundido === true);
        if (finish) {
            Swal.fire({
                title: `El juego termino en ${jugadas} jugadas !`,
                text:'Desea volver a jugar?' ,
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, volver a jugar !"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
    };


    const isDisparoAcertado = (fil, col) => {
        return acertados.some(d => d.fila === fil && d.columna === col);
    };


    return (
        <div className='flex gap-2 justify-center flex-col'>
            <div className='flex flex-col gap-2'>
                {
                    filasTablero.map((fil, i) => (
                        <div key={i} className='flex gap-2 justify-center'>
                            {
                                columnasTablero.map((col, j) => (
                                    <div
                                        id={`${fil}${col}`}
                                        key={j}
                                        className={`w-[50px] h-[50px] flex items-center justify-center bg-primary `}
                                        onClick={() => disparo(fil, col)}
                                    >
                                        <img src="bote.png" alt="img barco" className=' hidden' id={`${fil}-${col}`} />
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div className="text-center text-2xl font-semibold text-primary">

                <span>Jugadas Realizadas : {jugadas}</span>
            </div>
        </div>
    )
}

export default Tablero;