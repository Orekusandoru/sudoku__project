import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Layout() {
    return (

        <main >
            <Header />
            <div className="cont">
                <Outlet />
            </div>
        </main>
    );
}