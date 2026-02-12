import Modal from "@/app/_components/modal";
import { useRef, useState, UIEvent } from "react";

interface TermoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const TermoModal = ({ isOpen, onClose, onAccept }: TermoModalProps) => {
    const [hasReadToBottom, setHasReadToBottom] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        if (hasReadToBottom) return;

        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;

        const isBottom = scrollHeight - scrollTop <= clientHeight + 10;

        if(isBottom) {
            setHasReadToBottom(true);
        } 
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 w-full mx-auto">
                <header className="mb-4 border-b pb-4">
                    <h2 className="text-xl font-bold text-zinc-900 leading-tight">
                        TERMO DE USO, RESPONSABILIDADE, ASSINATURA E PROTEÇÃO DE DADOS (LGPD)
                    </h2>
                </header>
                <div className="bg-zinc-50 border border-zinc-400 rounded-xl p-1">
                    <div ref={scrollRef} onScroll={handleScroll} className="p-5 pb-0 h-[450px] overflow-y-auto text-sm text-zinc-700 mb-1 space-y-5 text-justify">
                        <p>
                            Ao criar uma conta e utilizar o sistema da empresa <strong>INOVASOFT</strong>, o usuário declara que leu, compreendeu e concorda integralmente com os termos e condições descritos neste documento.
                        </p>
                        <section className="border-t pt-4">
                            <h3 className="font-bold text-zinc-900 uppercase">1. DO OBJETO</h3>
                            <p className="mt-2 leading-relaxed">O presente Termo regula o acesso e uso do sistema da empresa INOVASOFT, caracterizado como uma plataforma SaaS (Software como Serviço) voltada à gestão fiscal, emissão, armazenamento e processamento de dados empresariais e/ou dados pessoais, incluindo, mas não se limitando a documentos fiscais e informações operacionais.</p>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">2. DO CADASTRO E RESPONSABILIDADE DO USUÁRIO</h3>
                            <div className="pl-4 space-y-2 mt-1">
                                <p className="mt-2 leading-relaxed"><strong>2.1.</strong> O usuário declara que todas as informações fornecidas no cadastro são verdadeiras, completas e atualizadas.</p>
                                <p className="mt-2 leading-relaxed"><strong>2.2.</strong> O usuário é exclusivamente responsável pelas informações fiscais, contábeis e cadastrais inseridas no sistema.</p>
                                <p className="mt-2 leading-relaxed"><strong>2.3.</strong> O acesso à conta é pessoal e intransferível, sendo o usuário responsável pela guarda e sigilo de suas credenciais.</p>
                                <p className="mt-2 leading-relaxed"><strong>2.4.</strong> A plataforma não se responsabiliza por erros decorrentes de dados incorretos, incompletos ou inseridos de forma indevida pelo usuário.</p>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">3. DO USO DO SISTEMA FISCAL / ERP</h3>
                            <div className="pl-4 space-y-2 mt-1">
                                <p className="mt-2 leading-relaxed"><strong>3.1.</strong> O sistema atua como ferramenta de apoio à gestão, não substituindo a atuação de contador, consultor fiscal ou obrigação legal do usuário.</p>
                                <p className="mt-2 leading-relaxed"><strong>3.2.</strong> Cabe exclusivamente ao usuário:</p>
                                <ul className="pl-6 space-y-1 list-none">
                                    <li><strong>3.2.1.</strong> Validar dados fiscais antes de transmissões;</li>
                                    <li><strong>3.2.2.</strong> Conferir regras tributárias aplicáveis;</li>
                                    <li><strong>3.2.3.</strong> Garantir conformidade com a legislação vigente.</li>
                                    <li><strong>3.2.4.</strong> A plataforma não se responsabiliza por penalidades, autuações ou prejuízos decorrentes de uso incorreto do sistema.</li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">4. DOS PLANOS E ASSINATURAS</h3>
                            <div className="pl-4 space-y-1 mt-1">
                                <p className="mt-2 leading-relaxed"><strong>4.1.</strong> O acesso às funcionalidades ocorre mediante contratação de plano de assinatura, conforme valores e recursos descritos no momento da contratação.</p>
                                <p className="mt-2 leading-relaxed"><strong>4.2.</strong> As cobranças são recorrentes, conforme periodicidade escolhida (mensal, trimestral, semestral ou anual).</p>
                                <p className="mt-2 leading-relaxed"><strong>4.3.</strong> A plataforma poderá atualizar planos, preços ou funcionalidades, mediante aviso prévio ao responsável pela contratação do sistema.</p>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">5. DOS PAGAMENTOS</h3>
                            <div className="pl-4 space-y-1 mt-1">
                                <p className="mt-2 leading-relaxed"><strong>5.1.</strong> Os pagamentos são processados por intermediadores de pagamento parceiros.</p>
                                <p className="mt-2 leading-relaxed"><strong>5.2.</strong> A ativação ou manutenção do acesso está condicionada à confirmação do pagamento.</p>
                                <p className="mt-2 leading-relaxed"><strong>5.3.</strong> Em caso de inadimplência, o acesso ao sistema poderá ser suspenso ou bloqueado automaticamente.</p>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">6. DA POLÍTICA DE CANCELAMENTO E REEMBOLSO</h3>
                            <div className="pl-4 space-y-1 mt-1">
                                <p className="mt-2 leading-relaxed"><strong>6.1.</strong> O usuário pode cancelar sua assinatura a qualquer momento.</p>
                                <p className="mt-2 leading-relaxed"><strong>6.2.</strong> Os valores pagos não são reembolsáveis, salvo nos casos previstos em lei ou quando expressamente informado em condição promocional.</p>
                                <p className="mt-2 leading-relaxed"><strong>6.3.</strong> Após o cancelamento, o acesso permanecerá ativo até o término do período já pago.</p>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">7. DA DISPONIBILIDADE E MANUTENÇÃO</h3>
                            <div className="pl-4 space-y-1 mt-1">
                                <p className="mt-2 leading-relaxed"><strong>7.1.</strong> A plataforma busca manter o sistema disponível de forma contínua, podendo ocorrer interrupções por:</p>
                                <p className="mt-2 leading-relaxed pl-4">7.1.1. Manutenções programadas; 7.1.2. Atualizações; 7.1.3. Fatores técnicos ou externos.</p>
                                <p className="mt-2 leading-relaxed"><strong>7.2.</strong> Tais interrupções não geram direito a indenização ou reembolso.</p>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">8. DA PROTEÇÃO DE DADOS (LGPD – LEI Nº 13.709/2018)</h3>
                            <div className="pl-4 space-y-1 mt-1">
                                <p className="mt-2 leading-relaxed"><strong>8.1.</strong> A plataforma realiza o tratamento de dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD).</p>
                                <p className="mt-2 leading-relaxed"><strong>8.2.</strong> Os dados coletados são utilizados exclusivamente para: prestação dos serviços, cumprimento de obrigações legais e melhorias no sistema.</p>
                                <p className="mt-2 leading-relaxed"><strong>8.3.</strong> A plataforma adota medidas técnicas e organizacionais para proteger os dados contra acessos não autorizados.</p>
                                <p className="mt-2 leading-relaxed"><strong>8.4.</strong> O usuário declara ciência de que dados fiscais podem ser armazenados pelo período exigido pela legislação.</p>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">9. DA LIMITAÇÃO DE RESPONSABILIDADE</h3>
                            <div className="pl-4 space-y-1 mt-1">
                                <p className="mt-2 leading-relaxed"><strong>9.1.</strong> O sistema é fornecido “como está”, não garantindo resultados específicos.</p>
                                <p className="mt-2 leading-relaxed"><strong>9.2.</strong> A plataforma não se responsabiliza por falhas de terceiros (SEFAZ, prefeituras, gateways), erros de legislação ou uso inadequado.</p>
                            </div>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">10. DA SUSPENSÃO E ENCERRAMENTO</h3>
                            <p className="mt-2 leading-relaxed pl-4"><strong>10.1.</strong> O descumprimento deste termo poderá resultar na suspensão ou encerramento da conta, sem direito a reembolso.</p>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">11. DAS DISPOSIÇÕES GERAIS</h3>
                            <p className="mt-2 leading-relaxed pl-4"><strong>11.1.</strong> Este Termo poderá ser atualizado a qualquer momento. O uso contínuo após alterações implica aceitação automática.</p>
                        </section>
                        <section>
                            <h3 className="font-bold text-zinc-900 uppercase">12. DO FORO</h3>
                            <p className="mt-2 leading-relaxed">Fica eleito o foro da comarca de <strong>MARIALVA/PR</strong>, para dirimir quaisquer questões oriundas deste Termo.</p>
                        </section>
                    </div>
                </div>
                <div className="flex flex-col text-justify mt-4">
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            name="termo"
                            id="termo"
                            disabled={!hasReadToBottom}
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <label htmlFor="termo" className="ml-2 text-sm text-zinc-700">
                            Ao clicar em <strong>“Aceito os Termos”</strong>, o usuário declara concordar integralmente com este Termo de Uso, Responsabilidade, Assinatura e Proteção de Dados.
                        </label>
                    </div>
                    {!hasReadToBottom && (
                        <p className="text-xs text-blue-600 mb-4 animate-pulse">
                            Por favor, leia todo o termo para ciencia dos termos.
                        </p>
                    )}
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={onClose} 
                        className="flex-1 py-3 border border-zinc-300 rounded-xl font-medium hover:bg-zinc-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onAccept}
                        disabled={!isChecked}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all shadow-lg 
                            ${isChecked 
                                ? "bg-green-600 text-white hover:bg-green-700 shadow-green-100" 
                                : "bg-zinc-200 text-zinc-500 cursor-not-allowed shadow-none"
                            }`
                        }
                    >
                        Aceitar e Finalizar
                    </button>
                </div>
            </div>
        </Modal>
    );
};