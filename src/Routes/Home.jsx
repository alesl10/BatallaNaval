import { useState, useEffect, useContext } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Tablero from '../components/Tablero.jsx';
import { getDificultad } from '../api/dificultad.js';
import { AuthContext } from '../Context/AuthContext.jsx';


const Home = () => {
    const { user } = useContext(AuthContext);
    const [barcos, setBarcos] = useState([]);
    const [dificultad, setDificultad] = useState([])
    const [filasTablero, setFilasTablero] = useState([])
    const [columnasTablero, setColumnasTablero] = useState([])



    // let fila = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // let columna = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];


    const obtenerDificultades = async () => {
        const response = await getDificultad();
        setDificultad(response.data.data)
    }

    const crearTablero = (nivel)=>{
        let fila = []
        let columna = []
        for (let i = 1; i <= nivel; i++) {
            fila[i] = i;
            columna[i] = String.fromCharCode(97 + i - 1);
        }
        setFilasTablero(fila);
        setColumnasTablero(columna);
    }

    const handleChange = (e) => {
        const nivel = e.target.value
        if (nivel == 1) {
            crearTablero(6)
        }else if(nivel == 2){
            crearTablero(8)
        }else{
            crearTablero(10)
        }
    }


    useEffect(() => {
        const nuevosBarcos = [];
        const ubicacionesOcupadas = new Set();
        obtenerDificultades()
        // console.log(user)
        // while (nuevosBarcos.length < 10) {
        //     let filaRandom = fila[Math.floor(Math.random() * 6)];
        //     let columnaRandom = columna[Math.floor(Math.random() * 6)];
        //     let ubicacion = `${filaRandom}-${columnaRandom}`;

        //     if (!ubicacionesOcupadas.has(ubicacion)) {
        //         nuevosBarcos.push({
        //             fila: filaRandom,
        //             columna: columnaRandom,
        //             hundido: false,
        //         });
        //         ubicacionesOcupadas.add(ubicacion);
        //     }
        // }

        // setBarcos(nuevosBarcos);
    }, []);

    if (!user) {
        return <div>Loading... </div>
    }

    return (
        <main className='flex flex-col justify-between items-center h-svh bg-secondary'>
            <Header />

            <h4>Bienvenido {user.apodo} {user.email}</h4>


            <select className='w-[200px]' name="dificultad" id="" onChange={handleChange}>
                {
                    dificultad.map((d, i) => (
                        <option key={i} value={d.id_dificultad}>{d.tipo}</option>
                    ))
                }
            </select>

            <div className='flex gap-2 justify-center'>
                <Tablero barcos={barcos} filasTablero={filasTablero} columnasTablero={columnasTablero} />
            </div>



            <Footer />
        </main>
    )
}

export default Home