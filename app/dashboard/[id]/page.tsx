"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Share2, Copy, Users, BarChart3, ArrowLeft, Vote, Wifi } from "lucide-react"

export default function PollDashboard() {
  const [pollData, setPollData] = useState({
    title: "What's your favorite programming language?",
    totalVotes: 247,
    options: [
      { id: 1, text: "JavaScript", votes: 89, percentage: 36 },
      { id: 2, text: "Python", votes: 76, percentage: 31 },
      { id: 3, text: "TypeScript", votes: 52, percentage: 21 },
      { id: 4, text: "Go", votes: 30, percentage: 12 },
    ],
    isActive: true,
    shareLink: "https://pollify.app/vote/abc123",
  })

  const [isConnected, setIsConnected] = useState(true)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPollData((prev) => ({
        ...prev,
        totalVotes: prev.totalVotes + Math.floor(Math.random() * 3),
        options: prev.options.map((option) => {
          const newVotes = option.votes + Math.floor(Math.random() * 2)
          return {
            ...option,
            votes: newVotes,
            percentage: Math.round((newVotes / (prev.totalVotes + 1)) * 100),
          }
        }),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const copyShareLink = () => {
    navigator.clipboard.writeText(pollData.shareLink)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Vote className="w-6 h-6 text-purple-600" />
                <span className="text-xl font-bold text-purple-600">Pollify</span>
              </div>
            </div>

            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
              <span className="text-sm text-gray-600 flex items-center">
                <Wifi className="w-4 h-4 mr-1" />
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Poll Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{pollData.title}</h1>
            <Badge variant={pollData.isActive ? "default" : "secondary"} className="text-sm px-3 py-1">
              {pollData.isActive ? "Active" : "Closed"}
            </Badge>
          </div>

          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="font-semibold">{pollData.totalVotes} votes</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Real-time results</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Results */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Live Results</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {pollData.options.map((option, index) => (
                  <div key={option.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                            index === 0
                              ? "bg-purple-500"
                              : index === 1
                                ? "bg-blue-500"
                                : index === 2
                                  ? "bg-indigo-500"
                                  : "bg-green-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800">{option.text}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-800">{option.percentage}%</div>
                        <div className="text-sm text-gray-500">{option.votes} votes</div>
                      </div>
                    </div>
                    <Progress
                      value={option.percentage}
                      className={`h-3 ${
                        index === 0
                          ? "[&>div]:bg-purple-500"
                          : index === 1
                            ? "[&>div]:bg-blue-500"
                            : index === 2
                              ? "[&>div]:bg-indigo-500"
                              : "[&>div]:bg-green-500"
                      }`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            {/* Share Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Poll
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <div className="text-sm text-gray-600 mb-1">Poll Link</div>
                  <div className="text-sm font-mono text-gray-800 break-all">{pollData.shareLink}</div>
                </div>
                <Button
                  onClick={copyShareLink}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Votes</span>
                  <span className="font-bold text-2xl text-purple-600">{pollData.totalVotes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Leading Option</span>
                  <span className="font-semibold text-gray-800">
                    {pollData.options.reduce((prev, current) => (prev.votes > current.votes ? prev : current)).text}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge variant={pollData.isActive ? "default" : "secondary"}>
                    {pollData.isActive ? "Active" : "Closed"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Link href={`/admin/${pollData.title}`}>
                <Button
                  variant="outline"
                  className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  View Admin Panel
                </Button>
              </Link>
              <Link href={`/results/${pollData.title}`}>
                <Button
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  Public Results Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
