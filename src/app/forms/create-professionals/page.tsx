'use client';
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InputGroup from "@/components/FormElements/InputGroup";
import { api } from "@/services/api";
import Cookies from "js-cookie";

const CreateServiceLayout = () => {
  const [name, setName] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!name || !specialty || !avatar) {
      setError("Por favor, preencha todos os campos.");
     
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("specialty", specialty);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Token não encontrado. Você precisa estar logado.");
        setLoading(false);
        return;
      }

      await api.post("/professional", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Profissional cadastrado com sucesso!");
      setLoading(false);
      setName("");
      setSpecialty("");
      setAvatar(null);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "Erro ao cadastrar o profissional. Tente novamente.");
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profissionais" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Criar Um Profissional
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <InputGroup
                  label="Nome"
                  type="text"
                  placeholder="Nome do Profissional"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  customClasses="mb-4.5 w-full"
                />

                <InputGroup
                  label="Especialidade"
                  type="text"
                  placeholder="Entre com a Especialidade"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  customClasses="mb-4.5 w-full"
                  required
                />

                <div className="mb-6">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Imagem do Profissional
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {!error && success && <p className="text-green-500">{success}</p>}

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                  disabled={loading}
                >
                  {loading ? "Carregando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateServiceLayout;
