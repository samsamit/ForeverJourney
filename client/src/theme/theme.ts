import { createMuiTheme } from "@material-ui/core/styles";

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
  
  export const theme = createMuiTheme({
    palette: {
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