import { green, purple } from '@material-ui/core/colors';
import {
    createMuiTheme,
    makeStyles,
    createStyles,
    Theme as AugmentedTheme,
    ThemeProvider,
    responsiveFontSizes,
  } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
  }
  
  let theme = createMuiTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  export default theme = responsiveFontSizes(theme);