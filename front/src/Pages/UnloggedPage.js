import { Link } from "react-router-dom";



export default function UnloggedPage() {
    return (
        <div className="unlogHomepage">

            <div>Here is a little instruction how to play:
                
            </div>
            <div>
                1.<Link className="link-success" to="/register"> Register</Link>
            </div>
            <div>
                2.<Link className="link-success" to="/login"> LogIn</Link>
            </div>
            <div>
                3. Create a game and just have fun!
            </div>
        </div>
    );
}