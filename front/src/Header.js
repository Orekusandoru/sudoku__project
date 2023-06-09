import { useContext, useEffect, useState } from "react";
import { Link, Navigate,useNavigate  } from "react-router-dom";
import { UserContext } from "./UserContext";



export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);

      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null);
    navigate('/');
   

  }

 

 


  const username = userInfo?.username;
  return (
    <div className="head">
      <header>

        <Link to="/" className="logo" >
          <img src="../6258392.png" width="50" height="50" />
          Sudoku
        </Link>
        <nav>
          {username && (
            <>
              <Link className="link-primary" to="/create">Create game</Link>
              <a className="link-danger" onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

        </nav>
      </header>
    </div>
  );
}