"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, Vote, Users } from "lucide-react"

export default function VotingPage() {
  const [selectedOption, setSelectedOption] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const pollData = {
    title: "What's your favorite programming language?",
    description: "Help us understand the most popular programming languages in our community.",
    options: [
      { id: "1", text: "JavaScript", votes: 89, percentage: 36 },
      { id: "2", text: "Python", votes: 76, percentage: 31 },
      { id: "3", text: "TypeScript", votes: 52, percentage: 21 },
      { id: "4", text: "Go", votes: 30, percentage: 12 },
    ],
    totalVotes: 247,
  }

  const handleVote = () => {
    if (selectedOption) {
      setHasVoted(true)
      setTimeout(() => {
        setShowResults(true)
      }, 1500)
    }
  }

  if (hasVoted && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thanks for voting!</h2>
            <p className="text-gray-600 mb-4">Your vote has been recorded successfully.</p>
            <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto" />
            <p className="text-sm text-gray-500 mt-2">Loading results...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Vote Submitted!</h1>
            <p className="text-gray-600">Here are the current results</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Vote className="w-6 h-6 text-purple-600" />
                  <span>{pollData.title}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{pollData.totalVotes} total votes</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {pollData.options.map((option, index) => (
                <div key={option.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                          option.id === selectedOption
                            ? "bg-green-500"
                            : index === 0
                              ? "bg-purple-500"
                              : index === 1
                                ? "bg-blue-500"
                                : index === 2
                                  ? "bg-indigo-500"
                                  : "bg-gray-500"
                        }`}
                      >
                        {option.id === selectedOption ? <CheckCircle className="w-5 h-5" /> : index + 1}
                      </div>
                      <span
                        className={`font-medium ${option.id === selectedOption ? "text-green-700" : "text-gray-800"}`}
                      >
                        {option.text}
                        {option.id === selectedOption && <span className="ml-2 text-sm">(Your vote)</span>}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-800">{option.percentage}%</div>
                      <div className="text-sm text-gray-500">{option.votes} votes</div>
                    </div>
                  </div>
                  <Progress
                    value={option.percentage}
                    className={`h-3 ${
                      option.id === selectedOption
                        ? "[&>div]:bg-green-500"
                        : index === 0
                          ? "[&>div]:bg-purple-500"
                          : index === 1
                            ? "[&>div]:bg-blue-500"
                            : index === 2
                              ? "[&>div]:bg-indigo-500"
                              : "[&>div]:bg-gray-500"
                    }`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="text-center mt-8">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Vote className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">Pollify</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">{pollData.totalVotes} votes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{pollData.title}</h1>
          {pollData.description && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{pollData.description}</p>}
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-gray-700">Choose your answer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {pollData.options.map((option, index) => (
                <div key={option.id} className="space-y-2">
                  <div
                    className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedOption === option.id
                        ? "border-purple-400 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          selectedOption === option.id
                            ? "bg-purple-500"
                            : index === 0
                              ? "bg-purple-400"
                              : index === 1
                                ? "bg-blue-400"
                                : index === 2
                                  ? "bg-indigo-400"
                                  : "bg-green-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <Label htmlFor={option.id} className="text-lg font-medium text-gray-800 cursor-pointer flex-1">
                        {option.text}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="pt-6">
              <Button
                onClick={handleVote}
                disabled={!selectedOption}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Vote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
