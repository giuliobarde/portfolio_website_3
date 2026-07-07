"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface FooterProps {
  userName?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function Footer({ userName, githubUrl, linkedinUrl }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    githubUrl && {
      name: "github",
      href: githubUrl,
      icon: <FaGithub className="w-3.5 h-3.5" />,
    },
    linkedinUrl && {
      name: "linkedin",
      href: linkedinUrl,
      icon: <FaLinkedin className="w-3.5 h-3.5" />,
    },
  ].filter(Boolean) as { name: string; href: string; icon: React.ReactNode }[];

  return (
    <footer className="relative border-t border-border/50 px-4 sm:px-6 lg:px-8">
      {/* Accent hairline that fades in from the center */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-center"
      />

      <div className="max-w-7xl mx-auto py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: session close line */}
          <div className="font-mono text-xs text-muted-foreground order-2 md:order-1">
            <span className="text-accent">$</span> echo &quot;Built with Next.js + Prismic&quot;
          </div>

          {/* Center: social links */}
          {socials.length > 0 && (
            <div className="flex items-center gap-2 order-1 md:order-2">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border/60 font-mono text-xs text-muted-foreground
                    hover:text-accent hover:border-accent/40 hover:bg-accent/5 hover:shadow-[0_0_12px_hsl(var(--terminal)/0.12)]
                    transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                  <span>
                    <span className="text-accent/50">./</span>
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          )}

          {/* Right: copyright + back to top */}
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground order-3">
            <span>
              <span className="text-accent">&gt;</span> {new Date().getFullYear()}{" "}
              {userName ? `— ${userName}` : "— All rights reserved"}
            </span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border/60
                hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"
              aria-label="Back to top"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
