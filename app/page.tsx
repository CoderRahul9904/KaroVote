import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { BarChart3, Users, Zap, ArrowRight, PieChart, Vote } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Vote className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Pollify
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/auth">
            <Button variant="ghost" className="text-gray-600 hover:text-purple-600">
              Login
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Create. Vote. Engage.
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Build interactive polls in seconds and get real-time insights from your audience. Perfect for events,
                classrooms, meetings, and social gatherings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Create a Poll
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Join with Code */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Join an existing poll</h3>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter poll code"
                    className="flex-1 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                  <Link href="/join">
                    <Button
                      variant="outline"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                    >
                      Join
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <BarChart3 className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="font-semibold text-purple-800 mb-2">Real-time Results</h3>
                <p className="text-sm text-purple-600">Watch votes come in live with beautiful charts</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 mt-8">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="font-semibold text-blue-800 mb-2">Easy Sharing</h3>
                <p className="text-sm text-blue-600">Share polls instantly with codes or links</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-indigo-100 to-indigo-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 -mt-4">
                <Zap className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="font-semibold text-indigo-800 mb-2">Lightning Fast</h3>
                <p className="text-sm text-indigo-600">Create polls in under 30 seconds</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-100 to-green-200 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <PieChart className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="font-semibold text-green-800 mb-2">Rich Analytics</h3>
                <p className="text-sm text-green-600">Detailed insights and voter analytics</p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Pollify?</h2>
            <p className="text-xl text-gray-600">
              Everything you need to create engaging polls and gather meaningful insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Multiple Poll Types",
                description: "Single choice, multiple choice, and more poll formats",
                color: "purple",
              },
              {
                title: "Real-time Updates",
                description: "See results update instantly as votes come in",
                color: "blue",
              },
              {
                title: "Mobile Optimized",
                description: "Perfect experience on all devices and screen sizes",
                color: "indigo",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-8 text-center bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <Vote className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
