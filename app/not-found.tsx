import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Vote, Home, Search, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Vote className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Pollify
            </span>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            {/* Sad Chart Illustration */}
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Broken chart bars */}
                <div className="flex items-end space-x-2 opacity-50">
                  <div className="w-4 h-12 bg-purple-400 rounded-t transform rotate-12" />
                  <div className="w-4 h-8 bg-blue-400 rounded-t transform -rotate-6" />
                  <div className="w-4 h-6 bg-indigo-400 rounded-t transform rotate-3" />
                  <div className="w-4 h-4 bg-green-400 rounded-t transform -rotate-12" />
                </div>

                {/* Crack effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-0.5 bg-red-400 transform rotate-45" />
                  <div className="w-16 h-0.5 bg-red-400 transform -rotate-45 absolute" />
                </div>
              </div>

              {/* Sad emoji */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-2xl">😢</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-2 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">404 - Page Not Found</span>
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! This poll doesn't exist</h1>

              <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
                The poll you're looking for might have expired, been deleted, or the link might be incorrect.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
              </Link>

              <Link href="/create">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-xl bg-transparent"
                >
                  <Vote className="w-5 h-5 mr-2" />
                  Create New Poll
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <Search className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-blue-800 mb-1">Looking for a specific poll?</h3>
                  <p className="text-sm text-blue-600">
                    Make sure you have the correct poll code or link. Poll codes are usually 6 characters long (e.g.,
                    ABC123).
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Need help?</p>
          <div className="flex justify-center space-x-4">
            <Link href="/join">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                Join with Code
              </Button>
            </Link>
            <Link href="/create">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                Create Poll
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
