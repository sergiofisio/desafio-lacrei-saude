import userEvent from "@testing-library/user-event";
import { Button } from "@/components/Button";
import { renderWithTheme, screen } from "@/lib/test-utils";

describe("Button", () => {
  it("renderiza o texto e dispara o clique", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    renderWithTheme(
      <Button variant="primary" onClick={onClick}>
        Conhecer o projeto
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Conhecer o projeto" });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respeita o estado disabled", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    renderWithTheme(
      <Button variant="secondary" disabled onClick={onClick}>
        Indisponível
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Indisponível" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
