import userEvent from "@testing-library/user-event";
import { FaqAccordion } from "@/components/FaqAccordion";
import { renderWithTheme, screen } from "@/lib/test-utils";

const items = [
  {
    id: "f1",
    pergunta: "Pergunta um?",
    resposta: "Resposta um.",
  },
  {
    id: "f2",
    pergunta: "Pergunta dois?",
    resposta: "Resposta dois.",
  },
];

describe("FaqAccordion", () => {
  it("abre e fecha painéis com aria-expanded", async () => {
    const user = userEvent.setup();
    renderWithTheme(<FaqAccordion items={items} />);

    const first = screen.getByRole("button", { name: "Pergunta um?" });
    const second = screen.getByRole("button", { name: "Pergunta dois?" });

    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Resposta um.")).toBeInTheDocument();

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Resposta dois.")).toBeInTheDocument();
    expect(first).toHaveAttribute("aria-expanded", "false");
  });
});
