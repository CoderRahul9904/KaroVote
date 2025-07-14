
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
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
  pollType: 'single' | 'multiple';
}

const VotingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [poll] = useState<PollData>({
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
    pollType: 'single'
  });

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted) return;

    if (poll.pollType === 'single') {
      setSelectedOptions([optionId]);
    } else {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleSubmitVote = async () => {
    if (selectedOptions.length === 0) {
      toast.error("Please select at least one option");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setHasVoted(true);
    setIsSubmitting(false);
    toast.success("Thanks for voting! 🎉");
  };

  if (!poll.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
        <Card className="max-w-md mx-auto text-center shadow-xl">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Poll Closed</h2>
            <p className="text-gray-600 mb-6">This poll is no longer accepting votes.</p>
            <Button onClick={() => navigate(`/poll/${id}/results`)}>
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
              <Badge variant="default" className="bg-green-500">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                Live Poll
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!hasVoted ? (
          <Card className="shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                {poll.title}
              </CardTitle>
              {poll.description && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {poll.description}
                </p>
              )}
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mt-4">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{poll.totalVotes} votes so far</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Expires in 2 days</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  {poll.pollType === 'single' ? 'Select one option' : 'Select one or more options'}
                </p>
              </div>

              {poll.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    selectedOptions.includes(option.id)
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        selectedOptions.includes(option.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {selectedOptions.includes(option.id) ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="text-lg font-medium text-gray-800">
                        {option.text}
                      </span>
                    </div>
                  </div>
                </button>
              ))}

              <div className="pt-8">
                <Button
                  onClick={handleSubmitVote}
                  disabled={selectedOptions.length === 0 || isSubmitting}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    `Submit Vote${selectedOptions.length > 1 ? 's' : ''}`
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Thanks for voting!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your vote has been recorded. Here are the current results:
              </p>

              <div className="space-y-4 max-w-2xl mx-auto">
                {poll.options.map((option, index) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700 flex items-center space-x-2">
                        {selectedOptions.includes(option.id) && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span>{option.text}</span>
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{option.votes} votes</span>
                        <span className="font-semibold text-gray-800">{option.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          selectedOptions.includes(option.id) ? 'bg-green-500' :
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-purple-500' : 
                          index === 2 ? 'bg-orange-500' : 'bg-pink-500'
                        }`}
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  onClick={() => navigate(`/poll/${id}/results`)}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View Live Results
                </Button>
                <div>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Create Your Own Poll
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VotingPage;
