import { useState, useEffect, useContext } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Tablero from '../components/Tablero.jsx';
import { getDificultad } from '../api/dificultad.js';
import { AuthContext } from '../Context/AuthContext.jsx';
import { addBarco } from '../api/barco.js'
import { addPartida } from '../api/partida.js'


const Home = () => {
    const { user } = useContext(AuthContext);
    const [barcos, setBarcos] = useState([]);
    const [dificultad, setDificultad] = useState([])
    const [filasTablero, setFilasTablero] = useState([])
    const [columnasTablero, setColumnasTablero] = useState([])
    const [tamañoTablero, setTamañoTablero] = useState()
    const [nivel, setNivel] = useState()


    const obtenerDificultades = async () => {
        const response = await getDificultad();
        setDificultad(response.data.data)
    }

    const crearPartida = async () => {
        const modelo = { dificultadId: nivel }
        const response = await addPartida(modelo)
        console.log(response.data.data)
        const idPartida = response.data.data; // id de la partida
        //barcos grandes
        for (let i = 0; i < 1; i++) {
            crearBarcos(4, idPartida)
        }
        //barcos medianoGrande
        for (let i = 0; i < 2; i++) {
            crearBarcos(3, idPartida)
        }
        //barcos mediano
        for (let i = 0; i < 3; i++) {
            crearBarcos(2, idPartida)
        }
        //barcos pequeño
        for (let i = 0; i < 4; i++) {
            crearBarcos(1, idPartida)
        }
        crearTablero(tamañoTablero);
    }



    //Funcion para crear barcos
    const crearBarcos = async (tamanio, partida_id) => {
        let barco = {
            tamanio: tamanio,
            partida_id: partida_id
        }
        const response = await addBarco(barco)
        let idBarco = response.data.data //este es el id del barco
        barco = {
            id: idBarco,
            tamanio,
            partida_id
        }
        setBarcos([...barcos, barco])
    }

    // funcion para crear tablero
    const crearTablero = (nivel) => {
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
        setNivel(e.target.value)
        if (nivel == 1) {
            setTamañoTablero(6)
        } else if (nivel == 2) {
            setTamañoTablero(8)
        } else {
            setTamañoTablero(10)
        }
    }


    useEffect(() => {
        obtenerDificultades()
    }, []);


    return (
        <main className='flex flex-col justify-between items-center h-svh bg-secondary'>
            <Header />

            <h4>Bienvenido {user.apodo} {user.email}</h4>




            <div className='flex gap-2 justify-center'>

                {
                    (filasTablero.length < 1 || columnasTablero.length < 1) ?
                        <div className='flex flex-col gap-2  items-center'>

                            <span>Seleccione un nivel</span>
                            <select className='w-[200px]' name="dificultad" id="" onChange={handleChange}>
                                <option value="">Dificultad</option>
                                {
                                    dificultad.map((d, i) => (
                                        <option key={i} value={d.id_dificultad}>{d.tipo}</option>
                                    ))
                                }
                            </select>

                            <button onClick={()=>crearPartida()}>Crear Tablero</button>
                        </div>

                        :
                        <Tablero barcos={barcos} filasTablero={filasTablero} columnasTablero={columnasTablero} />

                }
            </div>




            <Footer />
        </main>
    )
}

export default Home