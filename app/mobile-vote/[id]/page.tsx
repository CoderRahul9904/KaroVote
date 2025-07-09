"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Vote, Users, Smartphone, ArrowLeft, ArrowRight } from "lucide-react"

export default function MobileVotingPage() {
  const [selectedOption, setSelectedOption] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const pollData = {
    title: "What's your favorite programming language?",
    options: [
      { id: "1", text: "JavaScript", votes: 89, percentage: 36, color: "bg-purple-500" },
      { id: "2", text: "Python", votes: 76, percentage: 31, color: "bg-blue-500" },
      { id: "3", text: "TypeScript", votes: 52, percentage: 21, color: "bg-indigo-500" },
      { id: "4", text: "Go", votes: 30, percentage: 12, color: "bg-green-500" },
    ],
    totalVotes: 247,
  }

  const handleVote = () => {
    if (selectedOption) {
      setHasVoted(true)
      setTimeout(() => {
        setShowResults(true)
      }, 2000)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pollData.options.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pollData.options.length) % pollData.options.length)
  }

  if (hasVoted && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Vote Submitted!</h2>
            <p className="text-gray-600 mb-6">Thank you for participating</p>
            <div className="animate-spin w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full mx-auto" />
            <p className="text-sm text-gray-500 mt-4">Loading results...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-bold text-purple-600">Pollify Mobile</span>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Voted
          </Badge>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{pollData.title}</h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">{pollData.totalVotes} votes</span>
            </div>
          </div>

          {pollData.options.map((option) => (
            <Card key={option.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 ${option.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                    >
                      {option.id === selectedOption ? <CheckCircle className="w-5 h-5" /> : option.id}
                    </div>
                    <span
                      className={`font-medium ${option.id === selectedOption ? "text-green-700" : "text-gray-800"}`}
                    >
                      {option.text}
                      {option.id === selectedOption && <span className="ml-2 text-xs">(Your vote)</span>}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-800">{option.percentage}%</div>
                    <div className="text-xs text-gray-500">{option.votes} votes</div>
                  </div>
                </div>
                <Progress
                  value={option.percentage}
                  className={`h-2 ${option.id === selectedOption ? "[&>div]:bg-green-500" : `[&>div]:${option.color}`}`}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent">
            Create Your Own Poll
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">
        <div className="flex items-center space-x-2">
          <Smartphone className="w-6 h-6 text-purple-600" />
          <span className="text-lg font-bold text-purple-600">Pollify Mobile</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Users className="w-4 h-4" />
          <span className="text-sm">{pollData.totalVotes} votes</span>
        </div>
      </div>

      {/* Poll Title */}
      <div className="text-center px-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{pollData.title}</h1>
        <p className="text-gray-600">Swipe through options or tap to select</p>
      </div>

      {/* Swipeable Cards */}
      <div className="px-4 mb-8">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {pollData.options.map((option, index) => (
              <div key={option.id} className="w-full flex-shrink-0 px-2">
                <Card
                  className={`bg-white/90 backdrop-blur-sm border-2 shadow-xl cursor-pointer transition-all duration-200 ${
                    selectedOption === option.id
                      ? "border-purple-400 shadow-2xl scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{option.text}</h3>
                    <p className="text-gray-600">Tap to select this option</p>
                    {selectedOption === option.id && (
                      <div className="mt-4">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={prevSlide}
            variant="outline"
            size="sm"
            className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {pollData.options.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            variant="outline"
            size="sm"
            className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Selected Option Display */}
      {selectedOption && (
        <div className="px-4 mb-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  Selected: {pollData.options.find((o) => o.id === selectedOption)?.text}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vote Button */}
      <div className="px-4 pb-8">
        <Button
          onClick={handleVote}
          disabled={!selectedOption}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          <Vote className="w-5 h-5 mr-2" />
          Submit Vote
        </Button>
      </div>
    </div>
  )
}
