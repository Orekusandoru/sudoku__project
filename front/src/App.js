import './App.css';
import Sudo from './Sudo';
import Header from './Header';
import { Routes, Route } from "react-router-dom"
import Layout from './Layout';
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage/>} />
        <Route path={"/login"} element={<div>login page</div>} />
      </Route>
    </Routes >

  );
}

export default App;
