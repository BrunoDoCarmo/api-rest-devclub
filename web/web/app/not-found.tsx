const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="mt-4 text-3xl text-gray-600 dark:text-white">
        Página não encontrada.
      </p>

      <a
        href="/"
        className="mt-6 rounded-full border border-gray-400 px-6 py-2 text-lg font-semibold transition hover:bg-gray-100 hover:bg-primary hover:text-white"
      >
        Voltar para a Home
      </a>
    </div>
  );
};

export default NotFound;
