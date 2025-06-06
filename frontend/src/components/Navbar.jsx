import React from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { MessageSquare, User, LogOut, UserRoundPlus } from "lucide-react"
import { Settings } from "lucide-react"

const Navbar = () => {
    const { authUser, logout } = useAuthStore()

    return (
        <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">NG Chat</h1>
                        </Link>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center gap-2">
                        <Link className="btn btn-sm gap-2 transition-colors" to="/theme">
                            <Settings className="size-4" />
                            <span className="hidden sm:inline">Theme</span>
                        </Link>
                        {authUser ? (
                            <>
                                <Link to={"/profile"} className={"btn btn-sm gap-2"}>
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>

                                <button className="flex gap-2 items-center cursor-pointer" onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={"/login"} className={"btn btn-sm gap-2"}>
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">Login</span>
                                </Link>

                                <Link to={"/signup"} className={"btn btn-sm gap-2"}>
                                    <UserRoundPlus className="size-5" />

                                    <span className="hidden sm:inline">Sign Up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
