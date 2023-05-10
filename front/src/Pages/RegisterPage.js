export default function RegisterPage() {
    return (
        <div>
            <form className="register">
                <h1>Register</h1>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <button className="btnlog">Register</button>
            </form>
        </div>

    );
}