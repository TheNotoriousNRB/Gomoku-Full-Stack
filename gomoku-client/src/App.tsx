import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import {Header, UserProvider} from './components';
import Footer from './components/Footer';
import {Home, Login, Game, GameLog, GamesHistory, SignUp} from './pages'

function App() {
  return (
    <UserProvider>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="/gameLog" element={<GameLog />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/gameHistory/:gameId" element={<GamesHistory />} />
          <Route path="*" element={<Navigate to= "/" replace={true} />} />
        </Routes>
      </main>

      <Footer />
    </UserProvider>
    
  );
}

export default App;
