
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Plus, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

interface PollOption {
  id: string;
  text: string;
}

const PollCreation = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<PollOption[]>([
    { id: "1", text: "" },
    { id: "2", text: "" }
  ]);
  const [pollType, setPollType] = useState("single");
  const [expiration, setExpiration] = useState("24");

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, { id: Date.now().toString(), text: "" }]);
    }
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id));
    }
  };

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(option => 
      option.id === id ? { ...option, text } : option
    ));
  };

  const handleCreatePoll = () => {
    if (!title.trim()) {
      toast.error("Please enter a poll title");
      return;
    }
    
    const validOptions = options.filter(opt => opt.text.trim());
    if (validOptions.length < 2) {
      toast.error("Please enter at least 2 options");
      return;
    }

    // Generate a random poll ID for demo
    const pollId = Math.random().toString(36).substr(2, 9);
    toast.success("Poll created successfully!");
    navigate(`/poll/${pollId}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              Create Your Poll
            </CardTitle>
            <p className="text-gray-600">
              Design an engaging poll and start collecting responses instantly
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Poll Title */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700">
                Poll Title *
              </label>
              <Input
                placeholder="What's your question?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700">
                Description (Optional)
              </label>
              <Textarea
                placeholder="Add some context to help voters understand your poll..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors min-h-[100px]"
              />
            </div>

            {/* Poll Options */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-gray-700">
                Poll Options *
              </label>
              {options.map((option, index) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    {index + 1}
                  </div>
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option.text}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                    className="flex-1 p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                  {options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(option.id)}
                      className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              {options.length < 10 && (
                <Button
                  variant="outline"
                  onClick={addOption}
                  className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Option
                </Button>
              )}
            </div>

            {/* Poll Settings */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700">
                  Poll Type
                </label>
                <Select value={pollType} onValueChange={setPollType}>
                  <SelectTrigger className="p-3 rounded-xl border-2 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Choice</SelectItem>
                    <SelectItem value="multiple">Multiple Choice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-lg font-semibold text-gray-700">
                  Expires In
                </label>
                <Select value={expiration} onValueChange={setExpiration}>
                  <SelectTrigger className="p-3 rounded-xl border-2 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Hour</SelectItem>
                    <SelectItem value="12">12 Hours</SelectItem>
                    <SelectItem value="24">24 Hours</SelectItem>
                    <SelectItem value="168">7 Days</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Create Button */}
            <div className="pt-6">
              <Button
                onClick={handleCreatePoll}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Create Poll
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PollCreation;
