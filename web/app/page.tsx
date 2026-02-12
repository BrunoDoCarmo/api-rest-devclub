import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ShieldCheck, TrendingUp, Wallet } from "lucide-react";

const HomePage = () => {
    
    return (
        <div className="relative min-h-screen overflow-hidden bg-black text-white">
            {/* 🟢 Efeito de fundo: Gradients de Brilho */}
            <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute right-0 top-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />

            {/* Hero Section */}
            <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-32 text-center">
                <h1 className="max-w-4xl bg-linear-to-b from-white to-zinc-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-8xl">
                    Domine seu dinheiro <br /> 
                    <span className="text-white">sem esforço.</span>
                </h1>
                
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
                    A plataforma de gestão financeira que utiliza IA para categorizar seus gastos, 
                    prever tendências e otimizar seu patrimônio automaticamente.
                </p>
                
                <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row">
                    <Link
                        href="/create"
                        className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-10 py-4 font-bold text-white transition-all hover:bg-blue-500 hover:ring-4 hover:ring-blue-500/20"
                    >
                        Começar Grátis
                        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/login"
                        className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-10 py-4 font-bold backdrop-blur-md transition-all hover:bg-zinc-800"
                    >
                        Ver Demonstração
                    </Link>
                </div>

                {/* Mockup da Plataforma (Simulado com bordas e glow) */}
                <div className="relative mt-20 w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 shadow-2xl shadow-blue-500/10 flex justify-center">
                    <div className="rounded-xl bg-black/50 p-1">
                        <Image
                            src="/dashboard.svg"
                            width={173}
                            height={39}
                            alt="Finance AI"
                            className="w-full h-full rounded-xl border border-zinc-700 mb-8 brightness-200 lg:brightness-100"
                        />
                    </div>                
                    <div className="rounded-xl bg-black/50 p-1">
                        <Image
                            src="/transacoes.svg"
                            width={173}
                            height={39}
                            alt="Finance AI"
                            className="w-full h-full rounded-xl border border-zinc-700 mb-8 brightness-200 lg:brightness-100"
                        />
                    </div>                
                    <div className="rounded-xl bg-black/50 p-1">
                        <Image
                            src="/ai.svg"
                            width={173}
                            height={39}
                            alt="Finance AI"
                            className="w-full h-full rounded-xl border border-zinc-700 mb-8 brightness-200 lg:brightness-100"
                        />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="mx-auto max-w-7xl px-6 py-32">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold md:text-4xl">Tudo o que você precisa em um só lugar</h2>
                    <p className="mt-4 text-zinc-400">Tecnologia de ponta aplicada à sua saúde financeira.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FeatureCard 
                        icon={<TrendingUp className="text-blue-500" />}
                        title="Previsão de Gastos"
                        description="Nossa IA analisa seu histórico e avisa se você vai ultrapassar o orçamento antes mesmo de acontecer."
                    />
                    <FeatureCard 
                        icon={<Wallet className="text-emerald-500" />}
                        title="Multicontas"
                        description="Conecte seus bancos e cartões para ter uma visão unificada do seu saldo e investimentos."
                    />
                    <FeatureCard 
                        icon={<ShieldCheck className="text-purple-500" />}
                        title="Privacidade Bancária"
                        description="Dados criptografados de ponta a ponta. Nós nunca temos acesso às suas senhas bancárias."
                    />
                </div>
            </section>
        </div>
    );
}

export default HomePage;
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition-all hover:border-blue-500/50 hover:bg-zinc-900/60">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 transition-colors group-hover:border-blue-500/30">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-3 text-zinc-400 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}