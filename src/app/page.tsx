'use client'; // Marque o componente como Client Component
import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/services/api";
import { useRouter } from 'next/navigation'; // useRouter para navegação do lado do cliente
import Cookies from "js-cookie"; // Importa js-cookie para gerenciar cookies do lado do cliente
import { ToastContainer, toast } from 'react-toastify'; // Importando toast e ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Estilos do Toastify

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const router = useRouter(); // Para navegação do cliente

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget); // Cria FormData a partir do evento
    const email = formData.get("email");
    const password = formData.get("password");

    // Verifique se email e senha não são null ou vazios
    if (typeof email !== 'string' || email.trim() === "") {
      console.error("Email inválido ou não fornecido.");
      return;
    }

    if (typeof password !== 'string' || password.trim() === "") {
      console.error("Senha inválida ou não fornecida.");
      return;
    }

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      // Verifique o formato da resposta e do token
      console.log('Response:', response.data);

      // Verifique se o token existe e é uma string
      if (response.data.token) {
        // Exibe o toast de sucesso
        toast.success("Login realizado com sucesso!");

        router.push("/Home"); // Navegação do lado do cliente

        const expireTime = 60 * 60 * 24 * 30 * 1000; // Tempo de expiração em segundos (1 hora)
        Cookies.set("token", response.data.token, {
          path: "/",
          expires: expireTime,
          secure: process.env.NODE_ENV === "production",
        });
      } else {
        toast.error("Erro ao autenticar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao realizar login. Tente novamente!");
    }
  }

  const handleGoogleLogin = () => {
    console.log("Login com Google");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-1">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-dark-2">
        {/* Campo de Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2.5 block font-medium text-dark dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

        {/* Campo de Senha */}
        <div className="mb-5">
          <label htmlFor="password" className="mb-2.5 block font-medium text-dark dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              autoComplete="password"
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

        {/* Checkbox "Lembrar-me" */}
        <div className="mb-6 flex items-center justify-between gap-2 py-2">
          <label htmlFor="remember" className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              checked={data.remember}
              onChange={handleInputChange}
              className="peer sr-only"
            />
            <span className={`mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5 ${data.remember ? "bg-primary" : ""}`}>
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.70692 0.292787C9.89439 0.480314 9.99971 0.734622 9.99971 0.999786C9.99971 1.26495 9.89439 1.51926 9.70692 1.70679L4.70692 6.70679C4.51939 6.89426 4.26508 6.99957 3.99992 6.99957C3.73475 6.99957 3.48045 6.89426 3.29292 6.70679L0.292919 3.70679C0.110761 3.51818 0.00996641 3.26558 0.0122448 3.00339C0.0145233 2.74119 0.119692 2.49038 0.3051 2.30497C0.490508 2.11956 0.741321 2.01439 1.00352 2.01211C1.26571 2.00983 1.51832 2.11063 1.70692 2.29279L3.99992 4.58579L8.29292 0.292787C8.48045 0.105316 8.73475 0 8.99992 0C9.26508 0 9.51939 0.105316 9.70692 0.292787Z" fill="currentColor"/>
              </svg>
            </span>
            Remember me
          </label>

          <Link href="/auth/forgot-password" className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
            Forgot Password?
          </Link>
        </div>

        {/* Botão de Login com Google */}
        <div className="mb-4.5">
          <button type="button" onClick={handleGoogleLogin} className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 p-4 text-gray-700 hover:bg-gray-200 transition duration-300 dark:text-white dark:border-dark-3 dark:hover:bg-dark-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" className="fill-current text-blue-500">
              <path d="M23.49 12.3c0-.72-.06-1.39-.17-2.04H12v3.97h6.12c-.26 1.3-1.02 2.4-2.15 3.05v2.53h3.48c2.04-1.87 3.22-4.65 3.22-8.01z"/>
              <path d="M12 7.25c1.12 0 2.08.38 2.83 1.01L17.3 5.72C16.03 4.67 14.24 4 12 4C8.29 4 5.18 6.29 4.24 9.1h3.56C8.5 7.83 10.19 7.25 12 7.25z"/>
              <path d="M4.24 9.1C3.9 10.05 3.8 11.14 4.21 12.2l3.8-2.9C8.5 7.83 10.19 7.25 12 7.25z"/>
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Botão de Login */}
        <div className="mb-4.5">
          <button type="submit" className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">
            Sign In
          </button>
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
