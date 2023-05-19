import './App.css';
import { Routes, Route } from "react-router-dom"
import Layout from './Layout';
import HomePage from "./Pages/HomePage";
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContext, UserContextProvider } from './UserContext';



function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes >
    </UserContextProvider>
  );
}

export default App;
