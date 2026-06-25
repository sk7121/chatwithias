import { useState } from "react";
import api from "../utils/api";

export default function AuthPage({ onLogin }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const endpoint = isRegister ? "/auth/register" : "/auth/login";
            const payload = isRegister ? { username, email, password } : { email, password };

            const response = await api.post(endpoint, payload);
            onLogin(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to authenticate.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 px-6">
            <div className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold">{isRegister ? "Create account" : "Welcome back"}</h1>
                    <p className="mt-2 text-slate-400">{isRegister ? "Register and start chatting" : "Login to continue your conversations"}</p>
                </div>  

                <form onSubmit={handleSubmit} className="space-y-5">
                    {isRegister && (
                        <label className="block">
                            <span className="text-sm text-slate-300">Username</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Enter a display name"
                                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
                                required
                            />
                        </label>
                    )}

                    <label className="block">
                        <span className="text-sm text-slate-300">Email address</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-slate-300">Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-blue-500"
                            required
                        />
                    </label>

                    {error && <div className="rounded-3xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Working..." : isRegister ? "Create account" : "Login"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-400">
                    {isRegister ? "Already have an account?" : "Don’t have an account?"}
                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        className="ml-2 font-semibold text-blue-400 hover:text-blue-300"
                    >
                        {isRegister ? "Login" : "Register"}
                    </button>
                </div>
            </div>
        </div>
    );
}
