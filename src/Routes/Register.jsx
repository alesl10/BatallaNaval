import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getDispotisivos } from "../api/Dispositivo.js";
import { addUsuario } from "../api/Auth.js";

const Register = () => {
  const [dispositivos, setDispositivos] = useState([]);

  const navigate = useNavigate();

  const obtenerDispositivos = async () => {
    const rsp = await getDispotisivos();
    // console.log(rsp.data.data)
    setDispositivos(rsp.data.data);
  };

  const registrarUsuario = async (usuario) => {
    const response = await addUsuario(usuario);
    console.log(response)
    navigate("/");
  };

  useEffect(() => {
    obtenerDispositivos();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => registrarUsuario(values));

  return (
    <div className="m-auto">
      <form
        className="flex flex-col justify-center items-center gap-4 bg-gray-300 p-3 border-2 shadow-2xl border-primary rounded-lg"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl text-primary font-bold items-center flex justify-center">
          Ingresa tus datos
        </h2>
        <div className="flex flex-col w-full items-center ">
          <input
            placeholder="Nombre"
            type="text"
            {...register("nombre", { required: true })}
            className="w-[500px]  px-4 py-2 mb-2 bg-blue-100 text-primary rounded-md"
          />
          <input
            placeholder="Apellido"
            type="text"
            {...register("apellido", { required: true })}
            className="w-[500px]  px-4 py-2 mb-2 bg-blue-100 text-primary rounded-md"
          />
          <input
            placeholder="Apodo"
            type="text"
            {...register("apodo", { required: true })}
            className="w-[500px] px-4 py-2 mb-2 bg-blue-100 text-primary rounded-md"
          />
          <input
            placeholder="email"
            type="text"
            {...register("email", { required: true })}
            className="w-[500px]  px-4 py-2 mb-2 bg-blue-100 text-primary rounded-md"
          />
          <select
            className="w-[500px]  px-4 py-2 mb-2 bg-blue-100 text-primary rounded-md"
            {...register("dispositivo_id", { required: true })}
          >
            <option value="" disabled selected>
              Selecciona un dispositivo
            </option>
            {dispositivos.map((d, i) => (
              <option key={i} value={d.id_dispositivo}>
                {d.tipo}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className=" px-4  font-semibold bg-blue-500 text-yellow-300 rounded-md"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
