import { useContext, useEffect, useState } from "react";
import { Link, Navigate,useNavigate  } from "react-router-dom";
import { UserContext } from "./UserContext";



export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [counter, setCounter] = useState(0);
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
    setRedirect(true);
   

  }

 

 

  useEffect(() => {
    if (redirect) {
      navigate('/');
      setCounter(counter + 1);
    }
    
  }, [redirect, navigate]);

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
              <Link to="/create">Create game</Link>
              <a onClick={logout}>Logout</a>
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