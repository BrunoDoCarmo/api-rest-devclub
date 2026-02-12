import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  disableClose?: boolean;
}

const Modal = ({ isOpen, onClose, children, disableClose }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (disableClose) return; // Se o fechamento estiver desabilitado, não faça nada
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}>
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-full z-10
        sm:w-auto min-w-[320px] max-w-[95vw] max-h-[90vh] flex flex-col overflow-hidden">
       {/* Botão de Fechar - Escondido se disableClose for true */}
        {!disableClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-600 transition"
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


