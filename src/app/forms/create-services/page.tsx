'use client';
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InputGroup from "@/components/FormElements/InputGroup";
import { api } from "@/services/api";
import Cookies from "js-cookie";

const CreateServiceLayout = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || isNaN(price) || price <= 0 || !description || !image) {
      console.log("Por favor, preencha todos os campos corretamente.",price);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("description", description);
    if (image) {
      formData.append("file", image);
    }

    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Token não encontrado. Você precisa estar logado.");
        setLoading(false);
        return;
      }

      await api.post("/services", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Serviço cadastrado com sucesso!");
      setLoading(false);
      setName("");
      setPrice(0);
      setDescription("");
      setImage(null);
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "Erro ao cadastrar o serviço. Tente novamente.");
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Serviços" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Criar Um Serviço
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <InputGroup
                  label="Nome"
                  type="text"
                  placeholder="Nome do Serviço"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  customClasses="mb-4.5 w-full"
                />
                <InputGroup
                  label="Preço"
                  type="number"
                  placeholder="Entre com o preço do Serviço"
                  value={price.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = parseFloat(e.target.value);
                    setPrice(isNaN(value) ? 0 : value);
                  }}
                  customClasses="mb-4.5 w-full"
                  required
                />
                <div className="mb-6">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Imagem do Serviço
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Descrição
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Descrição do Serviço"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  ></textarea>
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
