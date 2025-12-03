import React from "react";
import { Instagram, Facebook, Linkedin, Behance } from "lucide-react";
import { Link } from "react-router-dom";

const socials = [
  { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com" },
  { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com" },
  { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com" },
  { icon: <Behance className="h-5 w-5" />, href: "https://www.behance.net" },
];

const links = [
  { label: "Servicios", to: "/servicios" },
  { label: "Trabajos", to: "/trabajos" },
  { label: "Contacto", to: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/5 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="High Web" className="h-8 w-auto" />
            <span className="text-sm font-semibold text-gray-800">High Web</span>
          </div>
          <p className="text-xs text-gray-500">Creamos marcas, sitios y experiencias digitales.</p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="transition-colors hover:text-[#7741EA]">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-[#7741EA] hover:text-[#7741EA]"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-black/5 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} High Web. Todo el contenido está protegido.
      </div>
    </footer>
  );
}
