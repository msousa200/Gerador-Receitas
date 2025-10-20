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
    // Adicionar animações de scroll a todos os elementos com data-animate
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
        rootMargin: "0px 0px -80px 0px"
      }
    );

    // Observar todos os cards, sections, e elementos principais
    const animateElements = document.querySelectorAll(
      '.card, section, .hero, .stats, .modal, .form-control, .alert'
    );
    
    animateElements.forEach((el) => {
      el.classList.add('scroll-animation', 'animate-slide-up');
      observer.observe(el);
    });

    return () => {
      animateElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

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
