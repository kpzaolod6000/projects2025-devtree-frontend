import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";
import type { IRegisterForm } from "../interfaces";

function RegisterView() {
  const initialValues: IRegisterForm = {
    name: "",
    email: "",
    handle: "",
    password: "",
    passwordConfirmation: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleRegister = async (data: IRegisterForm) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const password = watch("password");

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Crear Cuenta</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", {
              required: "The name is required",
            })}
          />
          {errors.name && <ErrorMessage> {errors.name.message} </ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "The email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "The email is not valid",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage> {errors.email.message} </ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Your handle (Your username): @yourhandle"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", {
              required: "The handle is required",
            })}
          />
          {errors.handle && (
            <ErrorMessage> {errors.handle.message} </ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Your password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "The password is required",
              minLength: {
                value: 8,
                message: "The password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage> {errors.password.message} </ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat your password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("passwordConfirmation", {
              required: "The password confirmation is required",
              validate: (value) =>
                value === password || "The passwords do not match",
            })}
          />
          {errors.passwordConfirmation && (
            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>

      <nav className="mt-10">
        <Link className="text-center text-white text-lg block" to="/auth/login">
          ¿Ya tienes cuenta? Inicia sesión aquí
        </Link>
      </nav>
    </>
  );
}

export default RegisterView;
