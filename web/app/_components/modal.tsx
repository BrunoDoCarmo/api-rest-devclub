import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  disableClose?: boolean;
}

const Modal = ({ isOpen, onClose, children, disableClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Bloqueia o scroll do corpo da página ao abrir
      document.body.style.overflow = "hidden";
      
      // Move o foco para o modal assim que ele abre
      // O timeout garante que o elemento já esteja no DOM
      const timer = setTimeout(() => {
        modalRef.current?.focus();
      }, 10);

      return () => {
        document.body.style.overflow = "unset";
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (disableClose) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
      role="dialog" // Avisa ao browser que é um modal
      aria-modal="true"
    >
      <div 
        ref={modalRef}
        tabIndex={-1} // Permite que a div receba foco programático
        className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-full z-10
          sm:w-auto min-w-[320px] max-w-[95vw] max-h-[90vh] flex flex-col overflow-hidden outline-none"
      >
        {!disableClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
            aria-label="Fechar modal"
          >
            ✖
          </button>
        )}

        <div className="overflow-y-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;