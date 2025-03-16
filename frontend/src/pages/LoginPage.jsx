import React, { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import AuthImagePattern from "../components/AuthImagePattern"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react"
import toast from "react-hot-toast"

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { login, isLoggingIn } = useAuthStore()

    const validateForm = () => {
        if (!formData.email.trim()) return toast.error("Enter an email address, it's like your username!")
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Enter a real email address, oh mah gahd!")
        if (!formData.password) return toast.error("You need a password to keep your account safe, duhh!")
        if (formData.password.length < 6) return toast.error("Your password is too short, come on!")
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = validateForm()
        if (success === true) login(formData)
    }

    return (
        <div className="h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors">
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2x1 font-bold mt-2">Welcome Back!</h1>
                            <p className="text-base-content/60">You ready to have another chat?</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40 z-1" />
                                </div>
                                <input type="email" className={`input input-bordered w-full pl-10`} placeholder="you@examble.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-meduim">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events none">
                                    <Lock className="size-5 text-base content/40 z-1" />
                                </div>
                                <input autoComplete="password" type={showPassword ? "text" : "password"} className={`input input-bordered w-full pl-10`} placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                <button className="absolute inset-y-0 right-0 pr-3 flex items-center" type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff className="size-5 text-base-content/40 z-1" /> : <Eye className="size-5 text-base-content/40 z-1" />}
                                </button>
                            </div>
                        </div>
                        {/* Submit */}
                        <button type="submit" className="btn  btn-primary w-full">
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Go back in!"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-base-content/60 hover:underline">
                                Join now!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* Right Side - Image */}
            <AuthImagePattern title={"Welcome Back!"} subtitle={"You ready to have another chat?"} />
        </div>
    )
}

export default LoginPage
