import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import { decode as jwt_decode } from "jwt-decode";
import { api } from "@/services/api"; // Sua API
import { getCookieClient, removeCookieClient } from "@/lib/cookie.client"; // Funções para pegar e remover o token

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  phoneNumber: string;
}

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para obter o userId do token
  const getUserIdFromToken = (token: string) => {
    try {
      const decodedToken: any = jwt_decode(token); // Decodifica o token
      return decodedToken?.sub || null;  // Ajuste para o campo correto, como 'sub'
    } catch (error) {
      console.error("Erro ao decodificar o token", error);
      return null;
    }
  };

  const fetchUserData = useCallback(async () => {
    const token = getCookieClient();  // Obtém o token
    if (!token) {
      setLoading(false);
      return;
    }

    const userId = getUserIdFromToken(token);  // Obtém o userId do token
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserProfile(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prevState) => !prevState);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  // Função para realizar o logout
  const handleLogout = () => {
    removeCookieClient(); // Remove o token do cookie
    window.location.href = "/login"; // Redireciona o usuário para a página de login
  };

  return (
    <ClickOutside onClick={closeDropdown} className="relative">
      <Link onClick={toggleDropdown} className="flex items-center gap-4" href="#">
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={userProfile?.avatar || "/images/user/user-03.png"}
            style={{ width: "auto", height: "auto" }}
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">{loading ? "Carregando..." : userProfile?.name}</span>
          <svg
            className={`fill-current duration-200 ease-in ${dropdownOpen && "rotate-180"}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
            />
          </svg>
        </span>
      </Link>

      {dropdownOpen && (
        <div className="absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark">
          <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
            <span className="relative block h-12 w-12 rounded-full">
              <Image
                width={112}
                height={112}
                src={userProfile?.avatar || "/images/user/user-03.png"}
                style={{ width: "auto", height: "auto" }}
                alt="User"
                className="overflow-hidden rounded-full"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green dark:border-gray-dark"></span>
            </span>

            <span className="block">
              <span className="block font-medium text-dark dark:text-white">
                {loading ? "Carregando..." : userProfile?.name}
              </span>
              <span className="block font-medium text-dark-5 dark:text-dark-6">
                {loading ? "Carregando..." : userProfile?.email}
              </span>
            </span>
          </div>

          <ul className="flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3">
            <li>
              <Link
                href="/profile"
                onClick={closeDropdown}
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99998 0.9375C7.03246 0.9375 5.43748 2.53249 5.43748 4.5C5.43748 6.46751 7.03246 8.0625 8.99998 8.0625C10.9675 8.0625 12.5625 6.46751 12.5625 4.5C12.5625 2.53249 10.9675 0.9375 8.99998 0.9375ZM6.56248 4.5C6.56248 3.15381 7.65378 2.0625 8.99998 2.0625C10.3462 2.0625 11.4375 3.15381 11.4375 4.5C11.4375 5.84619 10.3462 6.9375 8.99998 6"
                  />
                </svg>
                Meu perfil
              </Link>
            </li>

            {/* Botão de logout */}
            <li>
              <button
                onClick={handleLogout} // Ação de logout
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 16V12H16V8H8V4L4 8L8 12H4V16H8Z"
                  />
                </svg>
                Sair
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
