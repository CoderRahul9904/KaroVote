
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, RefreshCw, Users, Clock, TrendingUp, Share2, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface PollData {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const [poll, setPoll] = useState<PollData>({
    id: id || "",
    title: "What's your favorite programming language?",
    description: "Help us understand the current trends in programming languages among developers.",
    options: [
      { id: "1", text: "JavaScript", votes: 45, percentage: 45 },
      { id: "2", text: "Python", votes: 32, percentage: 32 },
      { id: "3", text: "TypeScript", votes: 15, percentage: 15 },
      { id: "4", text: "Go", votes: 8, percentage: 8 }
    ],
    totalVotes: 100,
    isActive: true,
    createdAt: "2024-12-10T10:00:00Z",
    expiresAt: "2024-12-15T10:00:00Z"
  });

  // Auto-refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPoll(prev => {
        const newOptions = prev.options.map(opt => ({
          ...opt,
          votes: opt.votes + Math.floor(Math.random() * 2),
        }));
        
        const newTotal = newOptions.reduce((sum, opt) => sum + opt.votes, 0);
        
        return {
          ...prev,
          options: newOptions.map(opt => ({
            ...opt,
            percentage: newTotal > 0 ? Math.round((opt.votes / newTotal) * 100) : 0
          })),
          totalVotes: newTotal
        };
      });
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsRefreshing(false);
    setLastUpdated(new Date());
    toast.success("Results updated!");
  };

  const shareResults = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Results link copied to clipboard!");
  };

  const sortedOptions = [...poll.options].sort((a, b) => b.votes - a.votes);
  const winner = sortedOptions[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hover:bg-blue-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                size="sm"
                onClick={shareResults}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Poll Header */}
        <Card className="mb-8 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <CardTitle className="text-3xl font-bold text-gray-800">
                    {poll.title}
                  </CardTitle>
                  <Badge variant={poll.isActive ? "default" : "secondary"} className="ml-2">
                    {poll.isActive ? "Live" : "Closed"}
                  </Badge>
                </div>
                
                {poll.description && (
                  <p className="text-gray-600 mb-4 text-lg">{poll.description}</p>
                )}
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{poll.totalVotes} total votes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                  </div>
                  {poll.isActive && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Live updates</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span>Live Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {sortedOptions.map((option, index) => (
                  <div key={option.id} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {index === 0 && (
                          <div className="text-2xl">🏆</div>
                        )}
                        <span className="font-semibold text-gray-800 text-lg">
                          {option.text}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">{option.votes} votes</span>
                        <span className="font-bold text-xl text-gray-800">
                          {option.percentage}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${
                          index === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 
                          index === 1 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                          index === 2 ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 
                          'bg-gradient-to-r from-orange-500 to-orange-600'
                        }`}
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Participate Card */}
            {poll.isActive && (
              <Card className="mt-6 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">Haven't voted yet?</h3>
                  <p className="mb-4 text-green-100">Join the conversation and make your voice heard!</p>
                  <Button
                    onClick={() => navigate(`/poll/${id}/vote`)}
                    variant="secondary"
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Vote Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Winner Card */}
            <Card className="shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-semibold mb-1">Current Leader</div>
                <div className="text-xl font-bold">{winner.text}</div>
                <div className="text-yellow-100">{winner.percentage}% of votes</div>
              </CardContent>
            </Card>

            {/* Total Votes */}
            <Card className="shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">{poll.totalVotes}</div>
                <div className="text-blue-100">Total Votes</div>
              </CardContent>
            </Card>

            {/* Voting Activity */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Most Votes</span>
                    <span className="font-semibold">{winner.votes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Options</span>
                    <span className="font-semibold">{poll.options.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <Badge variant={poll.isActive ? "default" : "secondary"}>
                      {poll.isActive ? "Active" : "Closed"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/create")}
                >
                  Create Your Own Poll
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/join")}
                >
                  Join Another Poll
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
