"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Vote, Mail, Lock, User, ArrowLeft, BarChart3, Users, Zap } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard or home
      window.location.href = "/"
    }, 2000)
  }

  const handleGoogleAuth = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/"
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Form */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 mb-6 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>

              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Vote className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Pollify
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? "Welcome back!" : "Create your account"}
              </h1>
              <p className="text-gray-600">
                {isLogin
                  ? "Sign in to manage your polls and view analytics"
                  : "Join thousands of users creating engaging polls"}
              </p>
            </div>

            {/* Auth Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-gray-800">{isLogin ? "Sign In" : "Sign Up"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Google Auth */}
                <Button
                  onClick={handleGoogleAuth}
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-6 bg-transparent"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                        required
                      />
                    </div>
                  </div>

                  {isLogin && (
                    <div className="text-right">
                      <Button variant="link" className="text-purple-600 hover:text-purple-700 p-0 h-auto">
                        Forgot password?
                      </Button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                      </div>
                    ) : isLogin ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                {/* Toggle Auth Mode */}
                <div className="text-center">
                  <span className="text-gray-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-12">
          <div className="max-w-md text-center">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <BarChart3 className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
                <h3 className="font-semibold text-purple-800 mb-2">Real-time Analytics</h3>
                <p className="text-sm text-purple-600">Track your poll performance with detailed insights</p>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 mt-8">
                <Users className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="font-semibold text-blue-800 mb-2">Engage Your Audience</h3>
                <p className="text-sm text-blue-600">Create polls that drive meaningful participation</p>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 -mt-4">
                <Zap className="w-12 h-12 text-indigo-600 mb-4 mx-auto" />
                <h3 className="font-semibold text-indigo-800 mb-2">Lightning Fast</h3>
                <p className="text-sm text-indigo-600">Set up polls in seconds, not minutes</p>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <Vote className="w-12 h-12 text-green-600 mb-4 mx-auto" />
                <h3 className="font-semibold text-green-800 mb-2">Easy Sharing</h3>
                <p className="text-sm text-green-600">Share polls with simple codes or links</p>
              </Card>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join the Polling Revolution</h2>
            <p className="text-xl text-gray-600">
              Create engaging polls, gather insights, and make data-driven decisions with Pollify.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
