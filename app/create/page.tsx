"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, X, ArrowLeft, Vote, Clock } from "lucide-react"

export default function CreatePoll() {
  const [options, setOptions] = useState(["", ""])
  const [pollType, setPollType] = useState("single")

  const addOption = () => {
    setOptions([...options, ""])
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
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
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Create Your Poll</h1>
          <p className="text-xl text-gray-600">Build an engaging poll in just a few steps</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center text-gray-800">Poll Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Poll Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg font-semibold text-gray-700">
                Poll Title *
              </Label>
              <Input
                id="title"
                placeholder="What's your favorite programming language?"
                className="text-lg p-4 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            {/* Poll Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-semibold text-gray-700">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Add more context to help voters understand your poll..."
                className="min-h-[100px] border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            {/* Poll Type */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-700">Poll Type</Label>
              <RadioGroup value={pollType} onValueChange={setPollType} className="flex space-x-8">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single" className="text-gray-600">
                    Single Choice
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multiple" id="multiple" />
                  <Label htmlFor="multiple" className="text-gray-600">
                    Multiple Choice
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Poll Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-gray-700">Poll Options</Label>
                <Button
                  onClick={addOption}
                  variant="outline"
                  size="sm"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>

              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                    {options.length > 2 && (
                      <Button
                        onClick={() => removeOption(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Expiration Time */}
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-gray-700 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Poll Duration
              </Label>
              <Select>
                <SelectTrigger className="border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1hour">1 Hour</SelectItem>
                  <SelectItem value="6hours">6 Hours</SelectItem>
                  <SelectItem value="1day">1 Day</SelectItem>
                  <SelectItem value="3days">3 Days</SelectItem>
                  <SelectItem value="1week">1 Week</SelectItem>
                  <SelectItem value="never">Never Expires</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Create Button */}
            <div className="pt-6">
              <Link href="/dashboard/sample-poll">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Create Poll
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
