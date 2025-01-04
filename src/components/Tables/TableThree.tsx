import { useEffect, useState } from "react";
import { api } from "@/services/api";  // Seu serviço de API
import { getCookieClient } from "@/lib/cookie.client"; // Função para pegar o token

interface Appointment {
  id: string;
  userId: string;
  professionalId: string;
  scheduleAt: string;
  status: string;
  user: { name: string };
  service: { name: string; price: number };
  professional: { name: string };
}

const TableThree = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = getCookieClient();
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
          },
        });
        setAppointments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao carregar os dados", error);
      }
    };

    fetchAppointments();
  }, []);  // Re-executa apenas uma vez na montagem do componente

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">ID</th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white">Cliente</th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">Professional</th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">Serviço</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Preço</th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">Status</th>
              <th className="min-w-[180px] px-4 py-4 font-medium text-dark dark:text-white">Data e Hora</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => {
              // Formatar a data de 'scheduleAt' para exibir apenas a data e hora
              const formattedDate = new Date(appointment.scheduleAt).toLocaleString('pt-BR', {
                weekday: 'short', // Exibe o dia da semana abreviado
                year: 'numeric',
                month: 'short', // Mês abreviado
                day: 'numeric',
                hour: '2-digit', // Hora com 2 dígitos
                minute: '2-digit', // Minuto com 2 dígitos
              });

              return (
                <tr key={appointment.id}>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === appointments.length - 1 ? "border-b-0" : "border-b"}`}>
                    <h5 className="text-dark dark:text-white">{appointment.id}</h5>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === appointments.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">{appointment.user.name}</p>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === appointments.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">{appointment.professional.name}</p>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === appointments.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">{appointment.service.name}</p>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === appointments.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">${appointment.service.price}</p>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === appointments.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className={`inline-flex rounded-full px-3.5 py-1 text-body-sm font-medium ${appointment.status === "PENDING" ? "bg-[#FFA70B]/[0.08] text-[#FFA70B]" : appointment.status === "CANCELED" ? "bg-[#D34053]/[0.08] text-[#D34053]" : "bg-[#219653]/[0.08] text-[#219653]"}`}>
                      {appointment.status}
                    </p>
                  </td>
                  <td className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === appointments.length - 1 ? "border-b-0" : "border-b"}`}>
                    <p className="text-dark dark:text-white">{formattedDate}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
