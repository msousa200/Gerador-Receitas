import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="hero min-h-[70vh]" 
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop)"
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-4xl">
            <div className="badge badge-accent badge-sm mb-4 animate-pulse">✨ Powered by AI</div>
            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl">
              Nunca Mais Fique Sem Saber O Que Comer
            </h1>
            <p className="mb-8 text-lg md:text-xl font-light">
              Descubra receitas incríveis com IA baseadas nos ingredientes que você tem em casa.
              Rápido, fácil e delicioso! 🍳
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/random" className="btn btn-primary gap-2 shadow-xl hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Receita Aleatória
              </Link>
              <Link href="/buscar" className="btn btn-outline btn-accent gap-2 shadow-xl hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Buscar Receitas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Beautiful Cards */}
      <section className="py-16 px-4 bg-gradient-to-b from-base-100 to-base-200">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Funcionalidades Incríveis
            </h2>
            <p className="text-base md:text-lg opacity-70">Tudo que você precisa para nunca mais ficar sem ideias</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Random Recipe Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1">
              <figure className="px-6 pt-6">
                <div className="rounded-full bg-gradient-to-br from-primary to-secondary p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
              </figure>
              <div className="card-body items-center text-center p-5">
                <div className="badge badge-primary badge-xs">IA Generativa</div>
                <h3 className="card-title text-lg mt-2">Receita Aleatória</h3>
                <p className="text-sm opacity-70">
                  Deixe a IA surpreender você com receitas únicas e criativas geradas na hora!
                </p>
                <div className="card-actions mt-4">
                  <Link href="/random" className="btn btn-primary btn-sm btn-block">
                    Gerar Agora
                  </Link>
                </div>
              </div>
            </div>

            {/* Search by Ingredients Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-secondary/30 transition-all duration-300 hover:-translate-y-1">
              <figure className="px-6 pt-6">
                <div className="rounded-full bg-gradient-to-br from-secondary to-accent p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </figure>
              <div className="card-body items-center text-center p-5">
                <div className="badge badge-secondary badge-xs">Personalizado</div>
                <h3 className="card-title text-lg mt-2">Busca Inteligente</h3>
                <p className="text-sm opacity-70">
                  Digite os ingredientes que você tem e receba receitas perfeitamente personalizadas!
                </p>
                <div className="card-actions mt-4">
                  <Link href="/buscar" className="btn btn-secondary btn-sm btn-block">
                    Buscar Agora
                  </Link>
                </div>
              </div>
            </div>

            {/* Favorites Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-1">
              <figure className="px-6 pt-6">
                <div className="rounded-full bg-gradient-to-br from-accent to-error p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-content" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
              </figure>
              <div className="card-body items-center text-center p-5">
                <div className="badge badge-accent badge-xs">Suas Receitas</div>
                <h3 className="card-title text-lg mt-2">Favoritos</h3>
                <p className="text-sm opacity-70">
                  Salve suas receitas favoritas e crie suas próprias receitas personalizadas!
                </p>
                <div className="card-actions mt-4">
                  <Link href="/favoritos" className="btn btn-accent btn-sm btn-block">
                    Ver Favoritos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center overflow-x-auto">
            <div className="stats stats-horizontal shadow-2xl bg-base-200">
              <div className="stat place-items-center py-2 px-3 md:py-4 md:px-6">
                <div className="stat-title text-[10px] md:text-xs">Receitas Geradas</div>
                <div className="stat-value text-primary text-lg md:text-2xl">10K+</div>
                <div className="stat-desc text-[8px] md:text-[10px]">Com IA Groq</div>
              </div>
              <div className="stat place-items-center py-2 px-3 md:py-4 md:px-6">
                <div className="stat-title text-[10px] md:text-xs">Ingredientes</div>
                <div className="stat-value text-secondary text-lg md:text-2xl">500+</div>
                <div className="stat-desc text-[8px] md:text-[10px]">No banco de dados</div>
              </div>
              <div className="stat place-items-center py-2 px-3 md:py-4 md:px-6">
                <div className="stat-title text-[10px] md:text-xs">Tempo Médio</div>
                <div className="stat-value text-accent text-lg md:text-2xl">2s</div>
                <div className="stat-desc text-[8px] md:text-[10px]">Para gerar receita</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-16 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto text-center px-4">
          <div className="max-w-3xl mx-auto text-primary-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
              Pronto para Começar?
            </h2>
            <p className="text-base md:text-lg mb-6 opacity-90">
              Junte-se a milhares de pessoas que já descobriram o prazer de cozinhar com IA!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/auth/login" className="btn btn-neutral gap-2 shadow-2xl hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                Criar Conta Grátis
              </Link>
              <Link href="/criar" className="btn btn-outline btn-neutral gap-2 shadow-2xl hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Criar Receita
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 text-base-content">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🍳</span>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Gerador de Receitas
                </span>
              </div>
              <p className="text-sm opacity-70 leading-relaxed">
                O melhor gerador de receitas com IA. Descubra pratos deliciosos com os ingredientes que tem em casa.
              </p>
            </div>

            {/* Features Section */}
            <div>
              <h3 className="font-bold text-lg mb-4">Funcionalidades</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <span>🤖</span>
                  <span>IA Inteligente</span>
                </li>
                <li className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <span>🎲</span>
                  <span>Receitas Aleatórias</span>
                </li>
                <li className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <span>🔍</span>
                  <span>Busca por Ingredientes</span>
                </li>
                <li className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <span>⭐</span>
                  <span>Salvar Favoritos</span>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contacto</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/miguel-sousa-264629134/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:msousa200@gmail.com"
                    className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    msousa200@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-base-content/10">
          <div className="container mx-auto px-4 py-4 text-center">
            <p className="text-sm opacity-60">
              © 2025 Gerador de Receitas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
