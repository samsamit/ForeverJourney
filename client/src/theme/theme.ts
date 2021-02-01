import { createMuiTheme } from "@material-ui/core/styles";
import { darkMode } from "../constants";

declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
      general: {
        navWidth: number;
        defaultMargin: number;
        statusBarHeight: number;
      };
      map: {
        tileActiveColor: React.CSSProperties['color'],
      };
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
      general?: {
        navWidth?: number;
        defaultMargin?: number;
        statusBarHeight?: number;
      };
      map?: {
        tileActiveColor?: React.CSSProperties['color'],
      };
    }
  }
  declare module "@material-ui/core/styles/createPalette" {
    interface Palette {
      health: Palette['primary'];
      mana: Palette['primary'];
    }
    interface PaletteOptions {
      health?: PaletteOptions['primary'];
      mana?: PaletteOptions['primary'];
    }
  }
  
  export const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        light: "#67daff",
        main: "#03a9f4",
        dark: "#007ac1",
        contrastText: "#001919",

      },
      secondary: {
        light: "#58a5f0",
        main: "#0277bd",
        dark: "#004c8c",
        contrastText: "#000",
      },
      health:{
        light: "#ff5131",
        main: "#d50000",
        dark: "#9b0000",
        contrastText: "#ffffff",
      },
      mana:{
        light: "#7a7cff",
        main: "#304ffe",
        dark: "#0026ca",
        contrastText: "#ffffff",
      }
    },
    general: {
        navWidth: 80,
        defaultMargin: 20,
        statusBarHeight: 20,
     },
     map: {
       tileActiveColor: "#67daff"
     }
  });