// Defina o que o componente espera receber
interface EsqueceuModalProps {
  onClose: () => void;
}

// Use a interface na declaração do componente
const EsqueceuModal = ({ onClose }: EsqueceuModalProps) => {
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl">
      <h2 className="text-xl font-bold text-black">Recuperar Senha</h2>
      <p className="text-sm text-zinc-600 mb-2">
        Digite seu e-mail para enviarmos as instruções.
      </p>
      
      <input 
        type="email" 
        placeholder="Seu e-mail" 
        className="w-full border border-green-500 p-3 rounded-xl outline-none focus:border-green-600 transition" 
      />
      <div className="flex gap-3 mt-2">
        <button 
          onClick={onClose} 
          className="w-full py-3 bg-red-600 hover:bg-red-700 transition rounded-2xl font-bold text-white mt-4"
        >
          Cancelar
        </button>
        <button className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold text-white mt-4">
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default EsqueceuModal;