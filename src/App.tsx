import './App.css';
import { ThemeProvider } from 'styled-components';
import { Routes } from './routes';
import theme from './themes';
import GameProvider from './contexts/game';

function App() {

  return (
    <div className="App">
      <GameProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </GameProvider>
    </div>
  )
}

export default App
