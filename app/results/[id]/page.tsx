"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Users, BarChart3, Vote, TrendingUp } from "lucide-react"

export default function ResultsPage() {
  const [pollData, setPollData] = useState({
    title: "What's your favorite programming language?",
    description: "Help us understand the most popular programming languages in our community.",
    totalVotes: 247,
    options: [
      { id: 1, text: "JavaScript", votes: 89, percentage: 36, color: "purple" },
      { id: 2, text: "Python", votes: 76, percentage: 31, color: "blue" },
      { id: 3, text: "TypeScript", votes: 52, percentage: 21, color: "indigo" },
      { id: 4, text: "Go", votes: 30, percentage: 12, color: "green" },
    ],
    isActive: true,
    lastUpdated: new Date(),
  })

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Auto-refresh every 5 seconds
  useEffect(() => {
    if (!autoRefresh) return

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
        lastUpdated: new Date(),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setPollData((prev) => ({
        ...prev,
        lastUpdated: new Date(),
      }))
      setIsRefreshing(false)
    }, 1000)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      purple: { bg: "bg-purple-500", text: "text-purple-600", progress: "[&>div]:bg-purple-500" },
      blue: { bg: "bg-blue-500", text: "text-blue-600", progress: "[&>div]:bg-blue-500" },
      indigo: { bg: "bg-indigo-500", text: "text-indigo-600", progress: "[&>div]:bg-indigo-500" },
      green: { bg: "bg-green-500", text: "text-green-600", progress: "[&>div]:bg-green-500" },
    }
    return colors[color as keyof typeof colors] || colors.purple
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Poll Results</h1>
                <p className="text-sm text-gray-600">Live updates every 5 seconds</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant={pollData.isActive ? "default" : "secondary"} className="px-3 py-1">
                {pollData.isActive ? "Live" : "Closed"}
              </Badge>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Poll Info */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{pollData.title}</h2>
          {pollData.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{pollData.description}</p>
          )}

          <div className="flex items-center justify-center space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="font-semibold text-lg">{pollData.totalVotes} total votes</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Real-time results</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Updated {pollData.lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bar Chart View */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Results Breakdown</span>
                {autoRefresh && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Auto-updating</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {pollData.options.map((option, index) => {
                const colorClasses = getColorClasses(option.color)
                return (
                  <div key={option.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 ${colorClasses.bg} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800">{option.text}</span>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-xl ${colorClasses.text}`}>{option.percentage}%</div>
                        <div className="text-sm text-gray-500">{option.votes} votes</div>
                      </div>
                    </div>
                    <Progress value={option.percentage} className={`h-4 ${colorClasses.progress}`} />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Pie Chart Visualization */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Visual Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-64 h-64 mx-auto mb-6">
                {/* Simple pie chart representation */}
                <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 via-blue-400 via-indigo-400 to-green-400 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{pollData.totalVotes}</div>
                      <div className="text-sm text-gray-600">Total Votes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {pollData.options.map((option, index) => {
                  const colorClasses = getColorClasses(option.color)
                  return (
                    <div key={option.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 ${colorClasses.bg} rounded`} />
                        <span className="text-sm font-medium text-gray-700">{option.text}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{option.percentage}%</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {pollData.options.reduce((prev, current) => (prev.votes > current.votes ? prev : current)).text}
              </div>
              <div className="text-sm text-gray-600">Leading Option</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{pollData.totalVotes}</div>
              <div className="text-sm text-gray-600">Total Participants</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {Math.max(...pollData.options.map((o) => o.percentage))}%
              </div>
              <div className="text-sm text-gray-600">Highest Percentage</div>
            </CardContent>
          </Card>
        </div>

        {/* Auto-refresh toggle */}
        <div className="text-center mt-8">
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant="outline"
            className={`border-2 ${autoRefresh ? "border-green-400 text-green-600 hover:bg-green-50" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
          >
            {autoRefresh ? "Disable" : "Enable"} Auto-refresh
          </Button>
        </div>
      </div>
    </div>
  )
}
