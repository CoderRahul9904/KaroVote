
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const JoinPoll = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pollCode, setPollCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // Pre-fill code if coming from URL
  useEffect(() => {
    const codeFromUrl = searchParams.get("code");
    if (codeFromUrl) {
      setPollCode(codeFromUrl);
    }
  }, [searchParams]);

  const handleJoinPoll = async () => {
    if (!pollCode.trim()) {
      toast.error("Please enter a poll code");
      return;
    }

    if (pollCode.length < 6) {
      toast.error("Poll codes are at least 6 characters long");
      return;
    }

    setIsJoining(true);
    
    // Simulate API call to validate poll code
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always navigate to a sample poll
    const samplePollId = "demo123";
    navigate(`/poll/${samplePollId}/vote`);
    
    setIsJoining(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJoinPoll();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-indigo-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="absolute top-6 left-6 hover:bg-white/80"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      {/* Main Card */}
      <Card className="w-full max-w-md mx-auto shadow-2xl bg-white/90 backdrop-blur-sm border-0 relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <PieChart className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            Join a Poll
          </CardTitle>
          <p className="text-gray-600">
            Enter the poll code to participate and share your voice
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Poll Code
            </label>
            <Input
              placeholder="Enter 6-digit code"
              value={pollCode}
              onChange={(e) => setPollCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="text-center text-lg font-mono tracking-wider p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
              maxLength={12}
            />
            <p className="text-xs text-gray-500 text-center">
              Poll codes are usually 6-8 characters long
            </p>
          </div>

          <Button
            onClick={handleJoinPoll}
            disabled={!pollCode.trim() || isJoining}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isJoining ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Joining...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Join Poll</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">
              Don't have a poll code?
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/create")}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            >
              Create Your Own Poll
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-xs">
        <div className="flex items-center space-x-2">
          <PieChart className="h-4 w-4" />
          <span>Powered by Pollify</span>
        </div>
      </div>
    </div>
  );
};

export default JoinPoll;
