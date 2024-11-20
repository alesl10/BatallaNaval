import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Tablero from '../components/Tablero.jsx';
import { getDificultad } from '../api/dificultad.js';


const Home = () => {
    const [barcos, setBarcos] = useState([]);
    const [dificultad, setDificultad] = useState([])

    let fila = [1, 2, 3, 4, 5, 6];
    let columna = ["a", "b", "c", "d", "e", "f"];


    const obtenerDificultades = async () => {
        const response = await getDificultad();
        setDificultad(response.data.data)
    }



    useEffect(() => {
        const nuevosBarcos = [];
        const ubicacionesOcupadas = new Set();
        obtenerDificultades()

        while (nuevosBarcos.length < 10) {
            let filaRandom = fila[Math.floor(Math.random() * 6)];
            let columnaRandom = columna[Math.floor(Math.random() * 6)];
            let ubicacion = `${filaRandom}-${columnaRandom}`;

            if (!ubicacionesOcupadas.has(ubicacion)) {
                nuevosBarcos.push({
                    fila: filaRandom,
                    columna: columnaRandom,
                    hundido: false,
                });
                ubicacionesOcupadas.add(ubicacion);
            }
        }

        setBarcos(nuevosBarcos);
    }, []);



    return (
        <main className='flex flex-col justify-between items-center h-svh bg-secondary'>
            <Header />

            <select className='w-[200px]' name="dificultad" id="">
                {
                    dificultad.map((d, i) => (
                        <option key={i} value={d.id_dificultad}>{d.tipo}</option>
                    ))
                }
            </select>

            <div className='flex gap-2 justify-center'>
                <Tablero barcos={barcos} fila={fila} columna={columna} />
            </div>



            <Footer />
        </main>
    )
}

export default Home