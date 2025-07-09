"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Users,
  Clock,
  Globe,
  Settings,
  Copy,
  Trash2,
  ArrowLeft,
  Vote,
  TrendingUp,
  Calendar,
  MapPin,
} from "lucide-react"

export default function AdminView() {
  const [pollData] = useState({
    title: "What's your favorite programming language?",
    totalVotes: 247,
    createdAt: new Date("2024-01-15"),
    expiresAt: new Date("2024-01-22"),
    isActive: true,
    shareLink: "https://pollify.app/vote/abc123",
    options: [
      { id: 1, text: "JavaScript", votes: 89, percentage: 36 },
      { id: 2, text: "Python", votes: 76, percentage: 31 },
      { id: 3, text: "TypeScript", votes: 52, percentage: 21 },
      { id: 4, text: "Go", votes: 30, percentage: 12 },
    ],
    analytics: {
      peakHour: "2:00 PM - 3:00 PM",
      topCountries: ["United States", "India", "Germany"],
      avgVotesPerHour: 12,
      mobileVotes: 156,
      desktopVotes: 91,
    },
  })

  const handleClosePoll = () => {
    alert("Poll closed successfully!")
  }

  const handleDuplicatePoll = () => {
    alert("Poll duplicated! Redirecting to edit...")
  }

  const handleDeletePoll = () => {
    if (confirm("Are you sure you want to delete this poll? This action cannot be undone.")) {
      alert("Poll deleted successfully!")
    }
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(pollData.shareLink)
    alert("Link copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/sample-poll">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Vote className="w-6 h-6 text-purple-600" />
                <span className="text-xl font-bold text-purple-600">Pollify Admin</span>
              </div>
            </div>
            <Badge variant={pollData.isActive ? "default" : "secondary"} className="px-3 py-1">
              {pollData.isActive ? "Active" : "Closed"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Poll Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{pollData.title}</h1>
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Created {pollData.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Expires {pollData.expiresAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{pollData.totalVotes} total votes</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vote Distribution */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Vote Distribution
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

            {/* Analytics Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Peak Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Most Active Time</div>
                      <div className="text-xl font-bold text-purple-600">{pollData.analytics.peakHour}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Average Votes/Hour</div>
                      <div className="text-xl font-bold text-blue-600">{pollData.analytics.avgVotesPerHour}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Globe className="w-5 h-5 mr-2" />
                    Device & Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Mobile vs Desktop</div>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="text-sm">
                          <span className="font-semibold text-purple-600">{pollData.analytics.mobileVotes}</span> Mobile
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-blue-600">{pollData.analytics.desktopVotes}</span> Desktop
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Top Countries</div>
                      {pollData.analytics.topCountries.map((country, index) => (
                        <div key={country} className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{country}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Share Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Share Poll</CardTitle>
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
                <CardTitle className="text-lg">Quick Stats</CardTitle>
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
                  <span className="text-gray-600">Days Active</span>
                  <span className="font-semibold text-gray-800">
                    {Math.ceil((Date.now() - pollData.createdAt.getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Poll Controls */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Settings className="w-5 h-5 mr-2" />
                  Poll Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleClosePoll}
                  variant="outline"
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                  disabled={!pollData.isActive}
                >
                  {pollData.isActive ? "Close Poll" : "Poll Closed"}
                </Button>
                <Button
                  onClick={handleDuplicatePoll}
                  variant="outline"
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate Poll
                </Button>
                <Button
                  onClick={handleDeletePoll}
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Poll
                </Button>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Export Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
                >
                  Export as CSV
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
                >
                  Export as PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
