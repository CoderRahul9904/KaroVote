
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Share2, Copy, Users, Clock, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface PollData {
  id: string;
  title: string;
  description: string;
  options: { id: string; text: string; votes: number; percentage: number }[];
  totalVotes: number;
  isActive: boolean;
  expiresAt: string;
}

const PollDashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    expiresAt: "2024-12-15T10:00:00Z"
  });

  const [isOnline, setIsOnline] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPoll(prev => ({
        ...prev,
        options: prev.options.map(opt => ({
          ...opt,
          votes: opt.votes + Math.floor(Math.random() * 3),
        })),
        totalVotes: prev.totalVotes + Math.floor(Math.random() * 8)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Recalculate percentages when votes change
  useEffect(() => {
    const total = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
    setPoll(prev => ({
      ...prev,
      totalVotes: total,
      options: prev.options.map(opt => ({
        ...opt,
        percentage: total > 0 ? Math.round((opt.votes / total) * 100) : 0
      }))
    }));
  }, [poll.options]);

  const shareUrl = `${window.location.origin}/poll/${id}/vote`;

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard!");
  };

  const copyPollCode = () => {
    navigator.clipboard.writeText(id || "");
    toast.success("Poll code copied to clipboard!");
  };

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
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <PieChart className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-800">Pollify</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-sm text-gray-600">
                  {isOnline ? 'Live' : 'Offline'}
                </span>
              </div>
              <Badge variant={poll.isActive ? "default" : "secondary"}>
                {poll.isActive ? "Active" : "Closed"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Poll Info */}
        <Card className="mb-8 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                  {poll.title}
                </CardTitle>
                {poll.description && (
                  <p className="text-gray-600 mb-4">{poll.description}</p>
                )}
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{poll.totalVotes} votes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Expires Dec 15, 2024</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyPollCode}
                  className="hover:bg-blue-50"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Code: {id?.substring(0, 6)}
                </Button>
                <Button
                  onClick={copyShareLink}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Results */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Results */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Live Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {poll.options.map((option, index) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{option.text}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{option.votes} votes</span>
                        <span className="font-semibold text-gray-800">{option.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ease-out ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-green-500' : 
                          index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{poll.totalVotes}</div>
                  <div className="text-blue-100">Total Votes</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg bg-gradient-to-br from-green-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {Math.max(...poll.options.map(o => o.percentage))}%
                  </div>
                  <div className="text-green-100">Leading Option</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(`/poll/${id}/results`)}
                >
                  View Public Results
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(`/poll/${id}/admin`)}
                >
                  Advanced Analytics
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Close Poll
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollDashboard;
