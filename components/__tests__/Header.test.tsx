import userEvent from "@testing-library/user-event";
import { Header } from "@/components/Header";
import { renderWithTheme, screen } from "@/lib/test-utils";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} />;
  },
}));

describe("Header", () => {
  it("exibe navegação com links para Início e Sobre", () => {
    renderWithTheme(<Header />);

    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Sobre" })).toHaveAttribute(
      "href",
      "/sobre",
    );
  });

  it("alterna aria-expanded do menu mobile", async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const menuButton = screen.getByRole("button", { name: "Abrir menu" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(menuButton);
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
