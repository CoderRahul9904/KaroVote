
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Clock, TrendingUp, Globe, Copy, Trash2, ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

interface AnalyticsData {
  totalVotes: number;
  uniqueVoters: number;
  peakHour: string;
  avgResponseTime: string;
  topLocations: { country: string; votes: number }[];
  hourlyData: { hour: string; votes: number }[];
}

const AdminView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [analytics] = useState<AnalyticsData>({
    totalVotes: 127,
    uniqueVoters: 89,
    peakHour: "2:00 PM",
    avgResponseTime: "12s",
    topLocations: [
      { country: "United States", votes: 45 },
      { country: "United Kingdom", votes: 23 },
      { country: "Canada", votes: 18 },
      { country: "Germany", votes: 15 },
      { country: "Australia", votes: 12 }
    ],
    hourlyData: [
      { hour: "9 AM", votes: 5 },
      { hour: "10 AM", votes: 12 },
      { hour: "11 AM", votes: 18 },
      { hour: "12 PM", votes: 25 },
      { hour: "1 PM", votes: 30 },
      { hour: "2 PM", votes: 37 }
    ]
  });

  const pollData = {
    title: "What's your favorite programming language?",
    status: "active",
    expiresIn: "2 days, 14 hours",
    shareCode: id?.substring(0, 8).toUpperCase(),
    shareUrl: `${window.location.origin}/poll/${id}/vote`
  };

  const copyShareCode = () => {
    navigator.clipboard.writeText(pollData.shareCode || "");
    toast.success("Share code copied!");
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(pollData.shareUrl);
    toast.success("Share URL copied!");
  };

  const handleClosePoll = () => {
    toast.success("Poll closed successfully");
  };

  const handleDuplicatePoll = () => {
    navigate("/create");
    toast.success("Poll template loaded for duplication");
  };

  const handleDeletePoll = () => {
    if (confirm("Are you sure you want to delete this poll? This action cannot be undone.")) {
      toast.success("Poll deleted successfully");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(`/poll/${id}/dashboard`)}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Poll Analytics</h1>
                <p className="text-sm text-gray-600">{pollData.title}</p>
              </div>
            </div>
            
            <Badge variant={pollData.status === "active" ? "default" : "secondary"}>
              {pollData.status === "active" ? "Active" : "Closed"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{analytics.totalVotes}</div>
              <div className="text-blue-100">Total Votes</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-r from-green-500 to-teal-600 text-white">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{analytics.uniqueVoters}</div>
              <div className="text-green-100">Unique Voters</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{analytics.peakHour}</div>
              <div className="text-orange-100">Peak Hour</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{analytics.avgResponseTime}</div>
              <div className="text-purple-100">Avg Response Time</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Voting Activity Chart */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span>Voting Activity (Last 6 Hours)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.hourlyData.map((data, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 text-sm text-gray-600">{data.hour}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(data.votes / 37) * 100}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm font-semibold text-gray-800">{data.votes}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-500" />
                  <span>Top Voting Locations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-700">{location.country}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-green-500 h-full rounded-full"
                            style={{ width: `${(location.votes / 45) * 100}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-800 w-8">{location.votes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-6">
            {/* Poll Info */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Poll Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge variant={pollData.status === "active" ? "default" : "secondary"}>
                    {pollData.status === "active" ? "Active" : "Closed"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expires in</span>
                  <span className="font-semibold">{pollData.expiresIn}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Share Code</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyShareCode}
                      className="font-mono text-sm"
                    >
                      {pollData.shareCode}
                      <Copy className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyShareUrl}
                    className="w-full text-xs"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy Share URL
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Poll Controls */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Poll Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleDuplicatePoll}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Duplicate Poll
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  onClick={handleClosePoll}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Close Poll
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleDeletePoll}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Poll
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Engagement Rate</h3>
                <div className="text-3xl font-bold mb-2">
                  {Math.round((analytics.uniqueVoters / analytics.totalVotes) * 100)}%
                </div>
                <p className="text-indigo-100 text-sm">
                  High engagement indicates quality responses
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
