import { Provider } from 'react-redux';

import { store } from './redux/store/store';
import { AppRouter } from './routers/AppRouter';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  GlobalStyles,
} from '@mui/material';
import { useEffect } from 'react';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5b68e1',
      // light: '#0209a1',
      dark: '#6298f0',
    },
    secondary: {
      main: '#181e37',
      // light: '#0fa9bd',
      // dark: '#0a6b78',
    },
  },
});

const App = () => {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
        />
        <CssBaseline />
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
