import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Lógica simples para mostrar as páginas
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
  );

  return (
    <Pagination className="mt-8">
      <PaginationContent className="border border-zinc-800 p-1 rounded-2xl ">
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => { e.preventDefault(); if(currentPage > 1) onPageChange(currentPage - 1) }}
            className={`hover:bg-zinc-900 hover:text-green-500 border-none transition-colors ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
          />
        </PaginationItem>

        {visiblePages.map((page, index) => (
          <PaginationItem key={page}>
            {index > 0 && visiblePages[index - 1] !== page - 1 && (
              <PaginationEllipsis className="text-zinc-600" />
            )}
            <PaginationLink
              href="#"
              onClick={(e) => { e.preventDefault(); onPageChange(page) }}
              isActive={currentPage === page}
              className={`rounded-xl transition-all ${
                currentPage === page 
                ? "bg-green-600 text-white hover:bg-green-700 hover:text-white" 
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white border-none"
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => { e.preventDefault(); if(currentPage < totalPages) onPageChange(currentPage + 1) }}
            className={`hover:bg-zinc-900 hover:text-green-500 border-none transition-colors ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}