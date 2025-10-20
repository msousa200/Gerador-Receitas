"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Adicionar animações de scroll a todos os elementos
    const setupAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-visible");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px"
        }
      );

      // Esperar um pouco para garantir que o DOM está pronto
      setTimeout(() => {
        // Observar todos os cards, sections, e elementos principais
        const animateElements = document.querySelectorAll(
          '.card, section, .hero, .stats, .modal-box, .form-control, .alert'
        );
        
        animateElements.forEach((el) => {
          if (!el.classList.contains('scroll-animation')) {
            el.classList.add('scroll-animation', 'animate-slide-up');
            observer.observe(el);
          }
        });
      }, 100);

      return observer;
    };

    const observer = setupAnimations();

    // Re-executar quando a página muda (navegação cliente)
    const handleRouteChange = () => {
      setTimeout(setupAnimations, 100);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [children]);

  return (
    <html lang="pt" data-theme="light">
      <head>
        <title>Gerador de Receitas - O que vais comer hoje?</title>
        <meta name="description" content="Descobre receitas aleatórias ou procura por ingredientes. Guarda as tuas favoritas!" />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
