import { Provider } from "react-redux";
import { store } from './redux/store/store';
import { AppRouter } from "./routers/AppRouter";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#020870',
      light: '#0209a1',
      dark: '#010554'
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
        <CssBaseline />
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
