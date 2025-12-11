import NotFound from "../not-found";
import UserPage from "../register/user/page";

interface Props {
  params: {
    slug: string;
  };
}

export default async function RegisterSlugRouter({ params }: Props) {
  const { slug } = await params;

  console.log("SLUG RECEBIDO:", slug); // Debug

  // slug vem como: "register=client"
  const decoded = decodeURIComponent(slug);
  const [prefix, section] = decoded.split("=");

  if (prefix !== "register") {
    return (
      <NotFound />
    );
  }
  switch (section) {
    case "user":
      return <UserPage />;

    default:
      return (
        <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="text-9xl font-bold text-gray-800 dark:text-white">
            Página não encontrada
          </h1>
          <p className="mt-4 text-3xl text-gray-600 dark:text-white">
            A seção {section} não existe.
          </p>
        </div>
      );
  }
}