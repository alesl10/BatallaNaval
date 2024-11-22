
const Navbar = ({ user = {}, mejorJugador }) => {

  return (
    <div className="flex justify-between container w-full items-center">
      
      <h4 className="text-2xl text-white font-semibold">
        Bienvenido {user.apodo}
      </h4>
      {mejorJugador ? (
        <div className="flex flex-col items-end">

        <span className="text-white font-semibold text-2xl"> Mejor Jugador del Mes: 
         {mejorJugador[0].apodo} 
        </span>
        <span className="text-white font-semibold text-2xl">  Tiempo Record:  
           {mejorJugador[0].tiempo_duracion}
        </span>
        
        
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
