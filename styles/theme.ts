export type ColorMode = "light" | "dark";

const shared = {
  fonts: {
    main: "var(--font-nunito), 'Nunito', sans-serif",
  },
  fontWeights: {
    regular: 400 as const,
    bold: 700 as const,
  },
  breakpoints: {
    tablet: "768px",
    desktop: "1280px",
  },
  maxWidth: "1120px",
};

export type AppTheme = {
  mode: ColorMode;
  colors: {
    primary: string;
    primaryHover: string;
    primaryPressed: string;
    primaryLight: string;
    critical: string;
    criticalHover: string;
    criticalSurface: string;
    textHeading: string;
    textBody: string;
    textInvert: string;
    background: string;
    surface: string;
    border: string;
    muted: string;
  };
  fonts: {
    main: string;
  };
  fontWeights: {
    regular: number;
    bold: number;
  };
  breakpoints: {
    tablet: string;
    desktop: string;
  };
  maxWidth: string;
};

export const lightTheme: AppTheme = {
  ...shared,
  mode: "light",
  colors: {
    primary: "#018762",
    primaryHover: "#007756",
    primaryPressed: "#014C37",
    primaryLight: "#DFF2ED",
    critical: "#BC1C1C",
    criticalHover: "#9E1818",
    criticalSurface: "#FFF5F5",
    textHeading: "#131313",
    textBody: "#2D2D2D",
    textInvert: "#FFFFFF",
    background: "#FFFFFF",
    surface: "#F7FBFA",
    border: "#B2DFD0",
    muted: "#5A5A5A",
  },
};

export const darkTheme: AppTheme = {
  ...shared,
  mode: "dark",
  colors: {
    primary: "#3DDBA8",
    primaryHover: "#62E5BA",
    primaryPressed: "#2BB88A",
    primaryLight: "#143D32",
    critical: "#FF6B6B",
    criticalHover: "#FF8585",
    criticalSurface: "#3A1A1A",
    textHeading: "#F5F5F5",
    textBody: "#D6D6D6",
    textInvert: "#0F1412",
    background: "#0F1412",
    surface: "#1A2420",
    border: "#2F4F44",
    muted: "#A8A8A8",
  },
};

export const theme = lightTheme;

export function getTheme(mode: ColorMode): AppTheme {
  return mode === "dark" ? darkTheme : lightTheme;
}
