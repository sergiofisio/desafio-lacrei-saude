import { Alert } from "@/components/Alert";
import { renderWithTheme, screen } from "@/lib/test-utils";

describe("Alert", () => {
  it("anuncia a mensagem com role alert", () => {
    renderWithTheme(<Alert>Não foi possível concluir a ação.</Alert>);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível concluir a ação.",
    );
  });
});
