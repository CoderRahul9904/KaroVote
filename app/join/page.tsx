"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Vote, ArrowRight, Users, Zap } from "lucide-react"

export default function JoinPollPage() {
  const [pollCode, setPollCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleJoinPoll = () => {
    if (pollCode.trim()) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to poll (for demo, we'll use a sample poll)
        window.location.href = "/vote/sample-poll"
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Vote className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Pollify
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join a Poll</h1>
          <p className="text-gray-600">Enter the poll code to participate</p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-gray-800">Enter Poll Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Input
                value={pollCode}
                onChange={(e) => setPollCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                className="text-center text-2xl font-mono tracking-wider h-14 border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                maxLength={6}
              />
              <p className="text-sm text-gray-500 text-center">Poll codes are usually 6 characters long</p>
            </div>

            <Button
              onClick={handleJoinPoll}
              disabled={!pollCode.trim() || isLoading}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Joining...</span>
                </div>
              ) : (
                <>
                  Join Poll
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-semibold text-gray-800">Join Instantly</div>
            <div className="text-xs text-gray-600">No registration required</div>
          </div>
          <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
            <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-semibold text-gray-800">Real-time</div>
            <div className="text-xs text-gray-600">See results instantly</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Don't have a poll code?</p>
          <Link href="/">
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent">
              Create Your Own Poll
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
