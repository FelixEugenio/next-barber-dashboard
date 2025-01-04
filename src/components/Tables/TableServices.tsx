'use client'; // Marca este componente como Client Component
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "../../services/api"; // Ajuste o caminho para a configuração da sua API
import Cookies from "js-cookie"; // Para acessar o token do cliente

// Definição do tipo para os dados de serviços
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  created_at: string;
  update_at: string;
}

const TableServices = () => {
  // Estado para armazenar os serviços e o carregamento
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // UseEffect para fazer a requisição assim que o componente for montado
  useEffect(() => {
    const fetchServices = async () => {
      // Obter o token do cookie
      const token = Cookies.get("token");

      if (!token) {
        setError("Token não encontrado. Você precisa estar logado.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/services", {
          headers: {
            "Authorization": `Bearer ${token}`, // Passando o token no cabeçalho
          },
        });
        setServices(response.data); // Supondo que a resposta seja um array de serviços
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar os serviços.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4">
        <p>Carregando serviços...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Lista de Serviços
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Nome do Serviço</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Descrição</p>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <p className="font-medium">Preço</p>
        </div>
      </div>

      {services.map((service) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={service.id}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={service.img}
                  width={60}
                  height={60}
                  alt={service.name}
                  className="rounded-md"
                />
              </div>
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {service.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {service.description}
            </p>
          </div>
          <div className="col-span-1 flex items-center justify-center px-6"> {/* Aqui aumentamos o padding */}
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              ${service.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableServices;
