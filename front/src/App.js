import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route } from "react-router-dom"
import Layout from './Layout';
import HomePage from "./Pages/HomePage";
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreateGame from './Pages/CreateGame';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --bs-body-bg: #545364; 
  }
`;


function App() {
  return (
    <div className="site">
       <GlobalStyle />
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreateGame />} />
        </Route>
      </Routes >
    </UserContextProvider>
    </div>
  );
}

export default App;
