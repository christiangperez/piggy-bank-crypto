import { Provider } from "react-redux";
import { store } from './redux/store/store';
import { AppRouter } from "./routers/AppRouter";
import { CssBaseline, ThemeProvider, createTheme, GlobalStyles } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#020870',
      light: '#0209a1',
      dark: '#000338'
    },
    secondary: {
      main: '#0e90a1',
      light: '#0fa9bd',
      dark: '#0a6b78'
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={ store }>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
