"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import styled from "styled-components";
import type { FaqItem } from "@/lib/mockApi";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

const Trigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textHeading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const PanelInner = styled.div`
  padding: 0 1.25rem 1.25rem;
  color: ${({ theme }) => theme.colors.textBody};
`;

const Icon = styled(motion.span)`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.35rem;
  line-height: 1;
  flex-shrink: 0;
`;

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  return (
    <List>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <Item key={item.id}>
            <Trigger
              id={buttonId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span>{item.pergunta}</span>
              <Icon
                aria-hidden="true"
                animate={reduceMotion ? undefined : { rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                +
              </Icon>
            </Trigger>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={
                    reduceMotion
                      ? false
                      : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <PanelInner>{item.resposta}</PanelInner>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Item>
        );
      })}
    </List>
  );
}
