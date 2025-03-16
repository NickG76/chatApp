import React, { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2, EggFried } from "lucide-react"
import { Link } from "react-router-dom"
import AuthImagePattern from "../components/AuthImagePattern"
import toast from "react-hot-toast"

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })
  const [doPwMatch, setDoPwMatch] = useState(true)

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("You don't have a name?")
    if (!formData.email.trim()) return toast.error("Enter an email address, it's like your username!")
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Enter a real email address, oh mah gahd!")
    if (!formData.password) return toast.error("You need a password to keep your account safe, duhh!")
    if (formData.password.length < 6) return toast.error("Your password is too short, come on!")
    if (formData.password !== formData.confirmPassword && formData.password) {
      setDoPwMatch(false)
      return toast.error("Your pass... you know what? Nevermind.")
    }
    setDoPwMatch(true)
    if (!formData.age) return toast.error("How old are you?")
    if (formData.age < 18) return toast.error("You're too young to join the dark side!")
    if (formData.age > 100) return toast.error("You're too old for this sh*t!")

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()

    if (success === true) signup(formData)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bolt mt-2">Create Account</h1>
              <p className="text-base-content/60">You need to be logged in for this, silly!</p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40 z-1" />
                </div>
                <input
                  type="text"
                  className={"input input-bordered w-full pl-10"}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 z-1" />
                </div>
                <input
                  type="email"
                  className={"input input-bordered w-full pl-10"}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 z-1" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={"input input-bordered w-full pl-10"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value
                    })
                  }
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="size-5 text-base-content/40 z-1" /> : <Eye className="size-5 text-base-content/40 z-1" />}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 z-1" />
                </div>
                <input
                  type="password"
                  className={"input input-bordered w-full pl-10"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value
                    })
                  }
                />
              </div>
              {!doPwMatch && formData.password && <p className="text-s pt-2 text-red-500/60">Pssst.... Check your password</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Age</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EggFried className="size-5 text-base-content/40 z-1" />
                </div>
                <input
                  type="number"
                  className={"input input-bordered w-full pl-10"}
                  placeholder="18"
                  min="3"
                  max="101"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      age: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="text-base-content/60 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* End of left side */}
      {/* Right side */}
      <AuthImagePattern title="Join the dark side, we have cookies!" subtitle="You can't have cookies without signing up first!" />
    </div>
  )
}

export default SignUpPage
