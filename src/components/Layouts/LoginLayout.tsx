import React from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  );
}
