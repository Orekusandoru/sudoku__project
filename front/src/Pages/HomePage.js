import UnloggedPage from "./UnloggedPage";
import Rating from "./Rating";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function HomePage() {

    const { setUserInfo, userInfo } = useContext(UserContext);
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
    function redirect() {
        navigate('/create');
    }

    const username = userInfo?.username;
    return (
        <div >
            {username && (
                <>
                    <div className="homepageContainer">
                        <div className="statscontent">
                            <Rating />
                        </div>
                        <button className="homeStartButton" onClick={redirect}>Create game</button>
                    </div>
                </>
            )}
            {!username && (
                <>
                    <UnloggedPage />
                </>
            )}
        </div>
    );
}