import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InputGroup from "@/components/FormElements/InputGroup";

export const metadata: Metadata = {
  title: "Barber Painel de Controlo",
  description: "This is Next.js Form Layout page for NextAdmin Dashboard Kit",
};

const CreateServiceLayout = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profissionais" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Criar Um Profissional
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="Nome"
                    type="text"
                    placeholder="Nome do Profissional"
                    customClasses="mb-4.5 w-full"  // Adicionando w-full para garantir que o campo ocupe a largura total
                  />
                </div>

                <InputGroup
                  label="Especialidade"
                  type="text"
                  placeholder="Entre com a Especialidade"
                  customClasses="mb-4.5 w-full"  // Aqui também adicionei w-full para uniformidade
                  required
                />

                <div className="mb-6">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Imagem do Profissional
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                  Salvar
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
