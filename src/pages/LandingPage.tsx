
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BarChart3, Users, Zap, TrendingUp, PieChart, Vote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");

  const handleJoinPoll = () => {
    if (joinCode.trim()) {
      navigate(`/join?code=${joinCode}`);
    }
  };

  const features = [
    {
      icon: <Vote className="h-8 w-8 text-blue-500" />,
      title: "Easy Poll Creation",
      description: "Create polls in seconds with our intuitive interface"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-500" />,
      title: "Real-time Results",
      description: "Watch votes come in live with beautiful charts"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Collaborate Seamlessly",
      description: "Share polls instantly and engage your audience"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Instant voting with real-time updates"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <PieChart className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-800">Pollify</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/auth")}>
            Login
          </Button>
          <Button onClick={() => navigate("/auth")}>
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
            Create. Vote. <span className="text-blue-600">Engage.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Transform your ideas into interactive polls and gather real-time feedback 
            from your audience with beautiful, responsive charts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/create")}
            >
              <Vote className="mr-2 h-5 w-5" />
              Create a Poll
            </Button>
            
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter poll code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="px-4 py-3 text-lg rounded-xl border-2 border-purple-300 focus:border-purple-500 transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && handleJoinPoll()}
              />
              <Button 
                variant="outline"
                size="lg"
                onClick={handleJoinPoll}
                className="px-6 py-3 text-lg rounded-xl border-2 border-purple-300 hover:bg-purple-50 transition-all duration-300"
              >
                Join Poll
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Visual Demo Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">See It In Action</h2>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Real-time Poll Results</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Option A</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full animate-pulse" style={{width: '65%'}}></div>
                    </div>
                    <span className="text-gray-600">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Option B</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full animate-pulse" style={{width: '35%'}}></div>
                    </div>
                    <span className="text-gray-600">35%</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <TrendingUp className="h-32 w-32 text-blue-400 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <PieChart className="h-6 w-6" />
            <span className="text-xl font-bold">Pollify</span>
          </div>
          <p className="text-gray-400">
            Making polling simple, beautiful, and engaging.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
