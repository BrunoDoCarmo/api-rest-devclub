"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const NotFound = () => {
  const [homePath, setHomePath] = useState("/");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHomePath("/dashboard");
    }
  }, []);
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="mt-4 text-3xl text-gray-600 dark:text-white">
        Página não encontrada.
      </p>

      <Link href={homePath} className="mt-6 rounded-full border border-gray-400 px-6 py-2 text-lg font-semibold transition hover:bg-primary hover:text-white" >
        {homePath === "/dashboard" ? "Voltar para o Dashboard" : "Voltar para a Home"}
      </Link>
    </div>
  );
};

export default NotFound;
