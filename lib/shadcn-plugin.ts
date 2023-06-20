/* eslint-disable prettier/prettier */
import plugin from "tailwindcss/plugin";
import convert from "color-convert";

function hexToHsl(hex:string) {
  const [r, g, b] = convert.hex.hsl(hex);
  return `${r} ${g}% ${b}%`;
}

type ColorFunction = {
  (): string;
  (opacityValue: string): string;
};

function withOpacity(variableName: string): ColorFunction {
  const colorFn: ColorFunction = (opacityValue?: string) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${variableName}) / ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
  return colorFn;
}


const shadcnPlugin = plugin(
  // Add CSS Variables Definition to the base layer
  function ({ addBase }) {
    addBase({
      ":root": {
        "--background": hexToHsl("#ffffff"),
        "--foreground": "222.2 47.4% 11.2%",
        "--muted": "210 40% 96.1%",
        "--muted-foreground": "215.4 16.3% 46.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 47.4% 11.2%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 47.4% 11.2%",
        "--border": "214.3 31.8% 91.4%",
        "--input": "214.3 31.8% 91.4%",
        "--primary": "222.2 47.4% 11.2%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 40% 96.1%",
        "--secondary-foreground": "222.2 47.4% 11.2%",
        "--accent": "210 40% 96.1%",
        "--accent-foreground": "222.2 47.4% 11.2%",
        "--destructive": "0 100% 50%",
        "--destructive-foreground": "210 40% 98%",
        "--ring": "215 20.2% 65.1%",
        "--radius": "0.5rem"
      },
      ".dark": {
        "--background": "224 71% 4%",
        "--foreground": "213 31% 91%",
        "--muted": "223 47% 11%",
        "--muted-foreground": "215.4 16.3% 56.9%",
        "--popover": "224 71% 4%",
        "--popover-foreground": "215 20.2% 65.1%",
        "--card": "224 71% 4%",
        "--card-foreground": "213 31% 91%",
        "--border": "216 34% 17%",
        "--input": "216 34% 17%",
        "--primary": "210 40% 98%",
        "--primary-foreground": "222.2 47.4% 1.2%",
        "--secondary": "222.2 47.4% 11.2%",
        "--secondary-foreground": "210 40% 98%",
        "--accent": "216 34% 17%",
        "--accent-foreground": "210 40% 98%",
        "--destructive": "0 63% 31%",
        "--destructive-foreground": "210 40% 98%",
        "--ring": "216 34% 17%",
        "--radius": "0.5rem"
      },
      // '*': {
      //   '@apply border-border':{},
      // },
      // body: {
      //   '@apply bg-background text-foreground':{},
      //   'font-feature-settings: "rlig" 1, "calt" 1':{}
      // },
    });

  },
  // another Copy of the Config Object which will eventually be merged with the Tailwind Config
  {   
    darkMode: ["class"],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: withOpacity("--border")(),
          input: withOpacity("--input")(),
          ring: withOpacity("--ring")(),
          background: withOpacity("--background")(),
          foreground: withOpacity("--foreground")(),
          primary: {
            DEFAULT: withOpacity("--primary")(),
            foreground: withOpacity("--primary-foreground")(),
          },
          secondary: {
            DEFAULT: withOpacity("--secondary")(),
            foreground: withOpacity("--secondary-foreground")(),
          },
          destructive: {
            DEFAULT: withOpacity("--destructive")(),
            foreground: withOpacity("--destructive-foreground")(),
          },
          muted: {
            DEFAULT: withOpacity("--muted")(),
            foreground: withOpacity("--muted-foreground")(),
          },
          accent: {
            DEFAULT: withOpacity("--accent")(),
            foreground: withOpacity("--accent-foreground")(),
          },
          popover: {
            DEFAULT: withOpacity("--popover")(),
            foreground: withOpacity("--popover-foreground")(),
          },
          card: {
            DEFAULT: withOpacity("--card")(),
            foreground: withOpacity("--card-foreground")(),
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      }
    }
  }
);

export default shadcnPlugin;