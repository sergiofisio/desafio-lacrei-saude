"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import styled from "styled-components";
import { useThemeMode } from "@/components/ThemeModeProvider";

const Toggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const IconWrap = styled(motion.span)`
  display: inline-flex;
  width: 22px;
  height: 22px;
`;

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none">
      <path
        d="M20.5 14.2A8.2 8.2 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const reduceMotion = useReducedMotion();
  const nextLabel = mode === "dark" ? "claro" : "escuro";
  const showingSun = mode === "dark";

  return (
    <Toggle
      type="button"
      onClick={toggleMode}
      aria-label={`Ativar tema ${nextLabel}`}
      aria-pressed={mode === "dark"}
      title={`Tema ${mode === "dark" ? "escuro" : "claro"}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <IconWrap
          key={mode}
          initial={
            reduceMotion ? false : { opacity: 0, rotate: -40, scale: 0.7 }
          }
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, rotate: 40, scale: 0.7 }}
          transition={{ duration: 0.2 }}
        >
          {showingSun ? <SunIcon /> : <MoonIcon />}
        </IconWrap>
      </AnimatePresence>
    </Toggle>
  );
}
