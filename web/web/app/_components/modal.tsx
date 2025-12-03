import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Fecha ao clicar no fundo */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-full max-w-md z-10">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
