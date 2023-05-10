import { Link } from "react-router-dom";

export default function Sudo() {
  return (
    <div className="head">
      <header>

        <Link to="/" className="logo" >
          <img src="../logo192.png" width="30" height="30" />
          Sudoku
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    </div>
  );
}