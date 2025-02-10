'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "../../services/api";
import Cookies from "js-cookie";

interface Professional {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  available: boolean;
}

const TableProfessionals = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessionals = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("Token não encontrado. Você precisa estar logado.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/professionals", {
          headers: { "Authorization": `Bearer ${token}` },
        });
        setProfessionals(response.data);
      } catch (err) {
        setError("Erro ao carregar os profissionais.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  const handleDelete = async (id: string) => {
    const token = Cookies.get("token");
    if (!token) {
      setError("Token não encontrado. Você precisa estar logado.");
      return;
    }

    try {
      await api.delete(`/professional/${id}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      setProfessionals((prev) => prev.filter((professional) => professional.id !== id));
    } catch (err) {
      setError("Erro ao excluir o profissional.");
    }
  };

  if (loading) return <div className="text-center p-4">Carregando profissionais...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Lista de Profissionais</h4>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center"><p className="font-medium">Nome</p></div>
        <div className="col-span-2 hidden items-center sm:flex"><p className="font-medium">Especialidade</p></div>
        <div className="col-span-1 flex items-center justify-center"><p className="font-medium">Disponibilidade</p></div>
        <div className="col-span-1 flex items-center justify-center"><p className="font-medium">Ações</p></div>
      </div>
      {professionals.map((professional) => (
        <div key={professional.id} className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Image src={professional.avatar} width={60} height={60} alt={professional.name} className="rounded-full" />
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">{professional.name}</p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">{professional.specialty}</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">{professional.available ? "Disponível" : "Indisponível"}</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <button onClick={() => handleDelete(professional.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableProfessionals;
