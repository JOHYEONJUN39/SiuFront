import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './theme/GlobalStyle';
import { darkTheme, lightTheme } from './theme/theme';
import { RootState } from './store';
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./components/Router";

function App() {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Router />
    </ThemeProvider>
  );
}

export default App;
