'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "../../services/api";
import Cookies from "js-cookie";

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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("Token não encontrado. Você precisa estar logado.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/services", {
          headers: { "Authorization": `Bearer ${token}` },
        });
        setServices(response.data);
      } catch (err) {
        setError("Erro ao carregar os serviços.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Token não encontrado. Você precisa estar logado.");
      return;
    }

    try {
      await api.delete(`/service/${id}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (err) {
      setError("Erro ao excluir o serviço.");
    }
  };

  if (loading) return <div className="text-center p-4">Carregando serviços...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Lista de Serviços</h4>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center"><p className="font-medium">Nome</p></div>
        <div className="col-span-2 hidden items-center sm:flex"><p className="font-medium">Descrição</p></div>
        <div className="col-span-1 flex items-center justify-center"><p className="font-medium">Preço</p></div>
        <div className="col-span-1 flex items-center justify-center"><p className="font-medium">Ações</p></div>
      </div>
      {services.map((service) => (
        <div key={service.id} className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Image src={service.img} width={60} height={60} alt={service.name} className="rounded-md" />
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">{service.name}</p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">{service.description}</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">€{service.price}</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <button onClick={() => handleDelete(service.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              Exclui
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableServices;
