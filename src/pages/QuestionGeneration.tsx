
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FileText, Download, Printer, Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

// Mock data for document selection
const documentOptions = [
  { id: "1", title: "Advanced Physics Textbook", department: "Physics" },
  { id: "2", title: "Computer Science Fundamentals", department: "Computer Science" },
  { id: "3", title: "Organic Chemistry Notes", department: "Chemistry" },
  { id: "4", title: "Introduction to Calculus", department: "Mathematics" },
];

// Mock data for generated questions
const generatedQuestions = [
  {
    id: "q1",
    type: "mcq",
    text: "Which of the following is NOT a fundamental force in nature?",
    options: [
      { id: "a", text: "Gravity" },
      { id: "b", text: "Electromagnetic force" },
      { id: "c", text: "Strong nuclear force" },
      { id: "d", text: "Magnetic force" },
    ],
    answer: "d",
    difficulty: "medium",
    marks: 2,
  },
  {
    id: "q2",
    type: "shortAnswer",
    text: "Explain the principle of conservation of momentum.",
    answer: "The principle of conservation of momentum states that in a closed system, the total momentum remains constant if no external forces act on the system.",
    difficulty: "medium",
    marks: 5,
  },
  {
    id: "q3",
    type: "essay",
    text: "Discuss the implications of quantum mechanics on our understanding of physical reality.",
    difficulty: "hard",
    marks: 10,
  },
  {
    id: "q4",
    type: "mcq",
    text: "Which of the following is a valid application of Newton's Third Law?",
    options: [
      { id: "a", text: "A rocket propulsion system" },
      { id: "b", text: "A pendulum at rest" },
      { id: "c", text: "A ball rolling down a frictionless incline" },
      { id: "d", text: "An object in free fall" },
    ],
    answer: "a",
    difficulty: "easy",
    marks: 1,
  },
  {
    id: "q5",
    type: "shortAnswer",
    text: "Define the concept of entropy in thermodynamics.",
    answer: "Entropy is a measure of the disorder or randomness in a system. In thermodynamics, it represents the unavailability of a system's thermal energy for conversion into mechanical work.",
    difficulty: "medium",
    marks: 3,
  },
];

type QuestionType = "mcq" | "shortAnswer" | "essay";
type DifficultyLevel = "easy" | "medium" | "hard";

export default function QuestionGeneration() {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>(["mcq", "shortAnswer"]);
  const [difficultyLevel, setDifficultyLevel] = useState<number[]>([50]);
  const [numQuestions, setNumQuestions] = useState<number[]>([15]);
  const [timeLimit, setTimeLimit] = useState(60);
  const [totalMarks, setTotalMarks] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGeneratePaper = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  const getDifficultyLabel = (value: number) => {
    if (value < 33) return "Easy";
    if (value < 66) return "Medium";
    return "Hard";
  };

  const toggleQuestionType = (type: QuestionType) => {
    if (questionTypes.includes(type)) {
      setQuestionTypes(questionTypes.filter(t => t !== type));
    } else {
      setQuestionTypes([...questionTypes, type]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <span>Dashboard</span>
        <span>/</span>
        <span className="font-medium text-foreground">Generate Question Paper</span>
      </div>

      {/* Page header */}
      <div>
        <h1 className="font-headers text-2xl md:text-3xl font-bold tracking-tight">
          Question Paper Generation
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure and generate question papers using RAG technology.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Source Documents</CardTitle>
              <CardDescription>
                Select the documents to use as sources for question generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="documents">Select Documents</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Add a document" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentOptions.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        {doc.title} <span className="text-muted-foreground">({doc.department})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Selected Documents</Label>
                <div className="border rounded-md p-3 min-h-[100px]">
                  {selectedDocuments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      No documents selected
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {selectedDocuments.map((id) => {
                        const doc = documentOptions.find((d) => d.id === id);
                        return (
                          <div
                            key={id}
                            className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{doc?.title}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <span className="sr-only">Remove</span>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Configuration</CardTitle>
              <CardDescription>
                Configure the types and difficulty of questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Question Types</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="mcq"
                      checked={questionTypes.includes("mcq")}
                      onCheckedChange={() => toggleQuestionType("mcq")}
                    />
                    <Label htmlFor="mcq">MCQ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="shortAnswer"
                      checked={questionTypes.includes("shortAnswer")}
                      onCheckedChange={() => toggleQuestionType("shortAnswer")}
                    />
                    <Label htmlFor="shortAnswer">Short</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="essay"
                      checked={questionTypes.includes("essay")}
                      onCheckedChange={() => toggleQuestionType("essay")}
                    />
                    <Label htmlFor="essay">Essay</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Difficulty Level</Label>
                  <span className="text-sm font-medium">
                    {getDifficultyLabel(difficultyLevel[0])}
                  </span>
                </div>
                <Slider
                  value={difficultyLevel}
                  onValueChange={setDifficultyLevel}
                  max={100}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Easy</span>
                  <span>Medium</span>
                  <span>Hard</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Number of Questions</Label>
                  <span className="text-sm font-medium">{numQuestions[0]}</span>
                </div>
                <Slider
                  value={numQuestions}
                  onValueChange={setNumQuestions}
                  min={5}
                  max={50}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                <Select
                  value={timeLimit.toString()}
                  onValueChange={(value) => setTimeLimit(parseInt(value))}
                >
                  <SelectTrigger id="timeLimit">
                    <SelectValue placeholder="Select time limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                    <SelectItem value="180">180 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Select
                  value={totalMarks.toString()}
                  onValueChange={(value) => setTotalMarks(parseInt(value))}
                >
                  <SelectTrigger id="totalMarks">
                    <SelectValue placeholder="Select total marks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20 marks</SelectItem>
                    <SelectItem value="50">50 marks</SelectItem>
                    <SelectItem value="75">75 marks</SelectItem>
                    <SelectItem value="100">100 marks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleGeneratePaper}
                disabled={isGenerating || selectedDocuments.length === 0 || questionTypes.length === 0}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Question Paper"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Preview area */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Question Paper Preview</CardTitle>
                <CardDescription>
                  Preview and edit the generated question paper.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1.5" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-1.5" />
                  Print
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {!isGenerated ? (
                <div className="flex flex-col items-center justify-center h-[500px] text-center">
                  <div className="p-3 bg-muted rounded-full mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No question paper generated yet</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Configure the settings in the left panel and click "Generate Question Paper" to create a new question paper.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-headers font-semibold">Advanced Physics Examination</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div>Time: {timeLimit} minutes</div>
                      <div>Total Marks: {totalMarks}</div>
                      <div>Difficulty: {getDifficultyLabel(difficultyLevel[0])}</div>
                    </div>
                  </div>

                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All Questions</TabsTrigger>
                      <TabsTrigger value="mcq">MCQs</TabsTrigger>
                      <TabsTrigger value="shortAnswer">Short Answer</TabsTrigger>
                      <TabsTrigger value="essay">Essay</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="space-y-4 mt-4">
                      {generatedQuestions.map((question, index) => (
                        <div
                          key={question.id}
                          className="bg-white dark:bg-card border rounded-lg p-4 shadow-sm"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-2">
                              <span className="font-medium text-sm">Q{index + 1}.</span>
                              <div>
                                <div className="font-medium">{question.text}</div>
                                {question.type === "mcq" && (
                                  <div className="mt-2 space-y-1.5">
                                    {question.options?.map((option) => (
                                      <div key={option.id} className="flex items-start gap-2">
                                        <span>{option.id.toUpperCase()})</span>
                                        <span>{option.text}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1.5">
                              <Badge variant="outline" className="text-xs">
                                {question.marks} {question.marks === 1 ? "mark" : "marks"}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={
                                  question.difficulty === "easy"
                                    ? "border-green-500 text-green-600"
                                    : question.difficulty === "medium"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-red-500 text-red-600"
                                }
                              >
                                {question.difficulty}
                              </Badge>
                              <Badge variant="outline" className="capitalize">
                                {question.type === "mcq" ? "MCQ" : question.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex justify-between mt-3">
                            <div className="flex gap-1.5">
                              <Button variant="ghost" size="sm" className="h-7">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 text-destructive">
                                Remove
                              </Button>
                            </div>
                            {question.type !== "essay" && question.answer && (
                              <div className="text-sm">
                                <span className="text-muted-foreground font-medium mr-1">Answer:</span>
                                <span>{question.answer}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="mcq" className="space-y-4 mt-4">
                      {generatedQuestions
                        .filter((q) => q.type === "mcq")
                        .map((question, index) => (
                          <div
                            key={question.id}
                            className="bg-white dark:bg-card border rounded-lg p-4 shadow-sm"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start gap-2">
                                <span className="font-medium text-sm">Q{index + 1}.</span>
                                <div>
                                  <div className="font-medium">{question.text}</div>
                                  <div className="mt-2 space-y-1.5">
                                    {question.options?.map((option) => (
                                      <div key={option.id} className="flex items-start gap-2">
                                        <span>{option.id.toUpperCase()})</span>
                                        <span>{option.text}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {question.marks} {question.marks === 1 ? "mark" : "marks"}
                              </Badge>
                            </div>
                            <div className="flex justify-between mt-3">
                              <div className="flex gap-1.5">
                                <Button variant="ghost" size="sm" className="h-7">
                                  Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 text-destructive">
                                  Remove
                                </Button>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground font-medium mr-1">Answer:</span>
                                <span>{question.answer}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                    {/* Similar content for shortAnswer and essay tabs */}
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
