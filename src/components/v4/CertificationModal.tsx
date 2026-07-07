"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  type CertificationItem,
  formatDate,
  hasRichText,
} from "@/lib/timeline-utils";

type CertificationModalProps = {
  certification: CertificationItem;
  certifications: CertificationItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const KIND_LABEL: Record<string, string> = {
  certification: "CERT",
  award: "AWARD",
  event: "EVENT",
};

const CertificationModal: React.FC<CertificationModalProps> = ({
  certification,
  certifications,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [mounted, setMounted] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  const hasNavigation = certifications.length > 1;

  const handlePrev = useCallback(() => {
    if (!hasNavigation) return;
    setSlideDirection("left");
    const newIndex =
      (currentIndex - 1 + certifications.length) % certifications.length;
    onNavigate(newIndex);
  }, [hasNavigation, currentIndex, certifications.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (!hasNavigation) return;
    setSlideDirection("right");
    const newIndex = (currentIndex + 1) % certifications.length;
    onNavigate(newIndex);
  }, [hasNavigation, currentIndex, certifications.length, onNavigate]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (hasNavigation) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, hasNavigation, handlePrev, handleNext]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "cert-modal-overlay") onClose();
  };

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0,
    }),
  };

  if (!mounted) return null;

  const kind = certification.kind || "certification";
  const kindLabel = KIND_LABEL[kind] || "CERT";
  const slug =
    certification.title?.toLowerCase().replace(/\s+/g, "-") || "credential";
  const credentialFilled = isFilled.link(certification.credential_url);

  const modalContent = (
    <motion.div
      id="cert-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100] p-4"
      onClick={handleOverlayClick}
      style={{ zIndex: 100 }}
    >
      {hasNavigation && (
        <button
          onClick={handlePrev}
          className={cn(
            "absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110]",
            "w-10 h-10 md:w-12 md:h-12 rounded-full",
            "terminal-card flex items-center justify-center",
            "text-muted-foreground transition-all duration-200",
            "hover:scale-110 active:scale-95",
          )}
          style={{ borderColor: "hsl(var(--neon-red) / 0.3)" }}
          aria-label="Previous certification"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasNavigation && (
        <button
          onClick={handleNext}
          className={cn(
            "absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110]",
            "w-10 h-10 md:w-12 md:h-12 rounded-full",
            "terminal-card flex items-center justify-center",
            "text-muted-foreground transition-all duration-200",
            "hover:scale-110 active:scale-95",
          )}
          style={{ borderColor: "hsl(var(--neon-red) / 0.3)" }}
          aria-label="Next certification"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="terminal-card max-w-[90vw] sm:max-w-2xl w-full relative max-h-[90vh] overflow-hidden"
        style={{ borderColor: "hsl(var(--neon-red) / 0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                aria-label="Close modal"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-xs text-muted-foreground ml-2 truncate">
              {slug} — {kind}
            </span>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Close"
          >
            [ESC]
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-48px)] overflow-x-hidden">
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={currentIndex}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-6 space-y-5"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="font-mono text-[10px] px-2 py-0.5 rounded border"
                    style={{
                      color: "hsl(var(--neon-red))",
                      backgroundColor: "hsl(var(--neon-red) / 0.1)",
                      borderColor: "hsl(var(--neon-red) / 0.3)",
                    }}
                  >
                    {kindLabel}
                  </span>
                </div>
                <h2 className="font-mono text-xl md:text-2xl font-bold text-foreground">
                  {certification.title}
                </h2>
                {certification.issuer && (
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span
                      className="font-mono text-sm"
                      style={{ color: "hsl(var(--neon-red))" }}
                    >
                      @ {certification.issuer}
                    </span>
                  </div>
                )}
              </div>

              <div
                className="w-12 h-px"
                style={{ backgroundColor: "hsl(var(--neon-red))" }}
              />

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                {certification.date_issued && (
                  <span>issued {formatDate(certification.date_issued)}</span>
                )}
                {certification.date_expires && (
                  <span>expires {formatDate(certification.date_expires)}</span>
                )}
              </div>

              {hasRichText(certification.description) && (
                <div>
                  <h3
                    className="font-mono text-xs mb-2 uppercase tracking-wider"
                    style={{ color: "hsl(var(--neon-red))" }}
                  >
                    # Details
                  </h3>
                  <div className="text-sm text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
                    <PrismicRichText field={certification.description} />
                  </div>
                </div>
              )}

              {credentialFilled && (
                <div>
                  <PrismicNextLink
                    field={certification.credential_url}
                    className="group inline-flex items-center gap-2 font-mono text-xs px-3 py-2 rounded border transition-colors"
                    style={{
                      color: "hsl(var(--neon-red))",
                      backgroundColor: "hsl(var(--neon-red) / 0.08)",
                      borderColor: "hsl(var(--neon-red) / 0.3)",
                    }}
                  >
                    <span>view credential</span>
                    <svg
                      className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </PrismicNextLink>
                </div>
              )}

              {hasNavigation && (
                <div className="pt-4 border-t border-border/30 flex items-center justify-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {currentIndex + 1} / {certifications.length}
                  </span>
                  <span className="text-border mx-2">|</span>
                  <span className="font-mono text-[10px] text-muted-foreground/60 flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[9px]">←</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[9px]">→</kbd>
                    <span className="ml-1">navigate</span>
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
};

export default CertificationModal;
