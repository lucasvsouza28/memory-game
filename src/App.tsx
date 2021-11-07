import './App.css';
import { ThemeProvider } from 'styled-components';
import { Routes } from './routes';
import theme from './themes';

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  )
}

export default App
