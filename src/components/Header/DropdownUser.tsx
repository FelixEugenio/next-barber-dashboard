import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";

const DropdownUser = () => {
 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Função para logout
  

  // Função para alternar o estado de dropdown
  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prevState) => !prevState);
  }, []);

  // Fechar o dropdown quando clicar fora
  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  return (
    <ClickOutside onClick={closeDropdown} className="relative">
      <Link
        onClick={toggleDropdown}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src="/images/user/user-03.png"
            style={{ width: "auto", height: "auto" }}
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">Jhon Smith</span>

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

      {/* Dropdown Options */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark">
          <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
            <span className="relative block h-12 w-12 rounded-full">
              <Image
                width={112}
                height={112}
                src="/images/user/user-03.png"
                style={{ width: "auto", height: "auto" }}
                alt="User"
                className="overflow-hidden rounded-full"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green dark:border-gray-dark"></span>
            </span>

            <span className="block">
              <span className="block font-medium text-dark dark:text-white">
                Jhon Smith
              </span>
              <span className="block font-medium text-dark-5 dark:text-dark-6">
                jonson@nextadmin.com
              </span>
            </span>
          </div>

          <ul className="flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3">
            <li>
              <Link
                href="/profile"
                onClick={closeDropdown} // Fechar dropdown ao clicar
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
                    d="M8.99998 0.9375C7.03246 0.9375 5.43748 2.53249 5.43748 4.5C5.43748 6.46751 7.03246 8.0625 8.99998 8.0625C10.9675 8.0625 12.5625 6.46751 12.5625 4.5C12.5625 2.53249 10.9675 0.9375 8.99998 0.9375ZM6.56248 4.5C6.56248 3.15381 7.65378 2.0625 8.99998 2.0625C10.3462 2.0625 11.4375 3.15381 11.4375 4.5C11.4375 5.84619 10.3462 6.9375 8.99998 6.9375C7.65378 6.9375 6.56248 5.84619 6.56248 4.5Z"
                  />
                </svg>
                View profile
              </Link>
            </li>

            <li>
              <Link
                href="/settings"
                onClick={closeDropdown} // Fechar dropdown ao clicar
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
                    d="M9 6.1875C7.4467 6.1875 6.1875 7.4467 6.1875 9C6.1875 10.5533 7.4467 11.8125 9 11.8125C10.5533 11.8125 11.8125 10.5533 11.8125 9C11.8125 7.4467 10.5533 6.1875 9 6.1875ZM7.3125 9C7.3125 8.06802 8.06802 7.3125 9 7.3125C9.93198 7.3125 10.6875 8.06802 10.6875 9C10.6875 9.93198 9.93198 10.6875 9 10.6875C8.06802 10.6875 7.3125 9.93198 7.3125 9Z"
                  />
                </svg>
                Settings
              </Link>
            </li>

            <li>
              <button
                 // Logout
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
                    d="M7.714 2.28598C7.93912 2.06086 8.36656 2.06086 8.59168 2.28598L13.8567 7.55102C14.0818 7.77614 14.0818 8.20358 13.8567 8.4287C13.6316 8.65382 13.2041 8.65382 12.979 8.4287L9 4.46466V13.0355C9 13.4107 8.6975 13.7269 8.339 13.8635C8.0225 13.9839 7.641 13.8603 7.381 13.5518C7.1209 13.2433 7.1209 12.746 7.381 12.4375L10.327 8.88191L3.3185 8.88191C2.88122 8.88191 2.50002 8.50071 2.50002 8.03546C2.50002 7.5702 2.88122 7.189 3.3185 7.189L10.327 7.189L7.381 3.5518C7.1209 3.2433 7.1209 2.746 7.381 2.4375C7.641 2.12898 8.0225 2.00538 8.339 2.11578C8.6975 2.25239 9 2.56854 9 2.94366V11.4647L12.979 7.4287C13.2041 7.20358 13.6316 7.20358 13.8567 7.4287C14.0818 7.65382 14.0818 8.08126 13.8567 8.30638L8.59168 13.551C8.36656 13.7761 7.93912 13.7761 7.714 13.551L2.28598 8.30638C2.06086 8.08126 2.06086 7.65382 2.28598 7.4287L7.714 2.28598Z"
                  />
                </svg>
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
