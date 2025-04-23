
import { useState } from "react";
import { FileUploadZone } from "@/components/ui/file-upload-zone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface UploadingFile {
  id: string;
  name: string;
  progress: number;
  size: number;
  status: 'uploading' | 'scanning' | 'processing' | 'success' | 'error';
  error?: string;
}

export default function UploadDocument() {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  // Simulate file upload progress
  const handleFilesAdded = (files: File[]) => {
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      progress: 0,
      size: file.size,
      status: 'uploading' as const,
    }));

    setUploadingFiles((prev) => [...prev, ...newFiles]);

    // Simulate progress for each file
    newFiles.forEach((file) => {
      const interval = setInterval(() => {
        setUploadingFiles((prev) => {
          const updatedFiles = prev.map((f) => {
            if (f.id === file.id) {
              const newProgress = f.progress + 10;
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...f, progress: 100, status: 'success' as const };
              }
              return { ...f, progress: newProgress };
            }
            return f;
          });
          return updatedFiles;
        });
      }, 500);
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <span>Dashboard</span> 
        <span>/</span> 
        <span className="font-medium text-foreground">Upload Document</span>
      </div>

      {/* Page header */}
      <div>
        <h1 className="font-headers text-2xl md:text-3xl font-bold tracking-tight">
          Upload Documents
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload educational materials to be processed for question generation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>
                Upload PDF, DOCX, PPTX, or TXT files up to 50MB each.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadZone
                onFilesAdded={handleFilesAdded}
                uploadingFiles={uploadingFiles}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Document Metadata</CardTitle>
              <CardDescription>
                Add information about your document to help with organization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title</Label>
                <Input id="title" placeholder="Enter document title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course/Subject</Label>
                <Input id="course" placeholder="Enter course or subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academic-year">Academic Year</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fall">Fall</SelectItem>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Keywords/Tags</Label>
                <Input id="tags" placeholder="Enter comma-separated tags" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Additional Notes</Label>
                <Textarea id="description" placeholder="Enter any additional information" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Save Metadata</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
