
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="max-w-2xl mx-auto text-center shadow-2xl bg-white/90 backdrop-blur-sm relative z-10">
        <CardContent className="p-12">
          {/* Sad Poll Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              <PieChart className="h-24 w-24 text-gray-400 mx-auto" />
              <div className="absolute -top-2 -right-2 text-4xl">😔</div>
            </div>
          </div>

          {/* 404 Error */}
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Oops! Poll Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              This poll doesn't exist or has expired.
            </p>
            <p className="text-gray-500">
              The poll you're looking for might have been removed, had its code changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Broken Chart Illustration */}
          <div className="mb-8 flex justify-center">
            <div className="bg-gray-100 rounded-lg p-6 max-w-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-3 bg-gray-300 rounded"></div>
                  <span className="text-gray-400 text-sm">--</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-3 bg-gray-300 rounded"></div>
                  <span className="text-gray-400 text-sm">--</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-3 bg-gray-300 rounded"></div>
                  <span className="text-gray-400 text-sm">--</span>
                </div>
              </div>
              <div className="text-center mt-4 text-gray-400 text-sm">
                📊 ❌
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
              
              <Button
                onClick={() => navigate("/join")}
                variant="outline"
                size="lg"
                className="px-8 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                <Search className="h-5 w-5 mr-2" />
                Try Another Code
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">
                Looking to create your own poll?
              </p>
              <Button
                onClick={() => navigate("/create")}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
              >
                Create New Poll
              </Button>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Need help?</strong> Make sure you've entered the correct poll code, 
              or contact the poll creator for a new link.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-xs">
        <div className="flex items-center space-x-2">
          <PieChart className="h-4 w-4" />
          <span>Powered by Pollify</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
