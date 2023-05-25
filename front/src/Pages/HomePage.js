import Sudo from "../Sudo";
import Rating from "./Rating";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

export default function HomePage() {

    const { setUserInfo, userInfo } = useContext(UserContext);
    
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);

            });
        });
    }, []);

    const username = userInfo?.username;
    return (
        <div >  
                    {username && (
                        <>
                            <Rating />   
                        </>
                    )}
                    {!username && (
                        <>
                            <Sudo />
                        </>
                    )}
        </div>
    );
}