import { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import './App.css';
import Footer from './components/Footer.jsx';
import Tablero from './components/Tablero.jsx';

function App() {
  const [barcos, setBarcos] = useState([]);

  let fila = [1, 2, 3, 4, 5, 6];
  let columna = ["a", "b", "c", "d", "e", "f"];

  useEffect(() => {
    const nuevosBarcos = [];
    for (let i = 0; i < 10; i++) {
      let barco = {
        fila: fila[Math.floor(Math.random() * 6)],
        columna: columna[Math.floor(Math.random() * 6)],
        hundido: false,
      };
      nuevosBarcos.push(barco);
    }
    setBarcos(nuevosBarcos);
  }, []);


  
  return (
    <main className='flex flex-col justify-between items-center h-svh bg-secondary'>
      <Header />

      <div className='flex gap-2 justify-center'>
        <Tablero barcos={barcos} fila={fila} columna={columna}/>
      </div>

      

      <Footer />
    </main>
  );
}

export default App;
