import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/ThemeToggle";
import { renderWithTheme, screen } from "@/lib/test-utils";

describe("ThemeToggle", () => {
  it("alterna entre tema claro e escuro", async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /Ativar tema escuro/i });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);

    expect(
      screen.getByRole("button", { name: /Ativar tema claro/i }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
