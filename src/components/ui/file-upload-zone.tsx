
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { Check, File, X } from "lucide-react";

interface UploadingFile {
  id: string;
  name: string;
  progress: number;
  size: number;
  status: 'uploading' | 'scanning' | 'processing' | 'success' | 'error';
  error?: string;
}

interface FileUploadZoneProps {
  onFilesAdded: (files: File[]) => void;
  uploadingFiles?: UploadingFile[];
  className?: string;
  acceptedFileTypes?: string[];
  maxFiles?: number;
}

export function FileUploadZone({
  onFilesAdded,
  uploadingFiles = [],
  className,
  acceptedFileTypes = ['.pdf', '.docx', '.pptx', '.txt'],
  maxFiles = 10
}: FileUploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAdded(acceptedFiles);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  const getStatusColor = (status: UploadingFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'scanning':
      case 'processing':
        return 'text-blue-600';
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-destructive';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: UploadingFile['status']) => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4 text-success" />;
      case 'error':
        return <X className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:bg-muted/50",
          isDragActive ? "border-enterprise-primary bg-muted" : "border-muted-foreground/20",
          className
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-muted rounded-full">
            <File className="h-8 w-8 text-enterprise-primary" />
          </div>
          <h3 className="text-lg font-medium">Drag & drop files here</h3>
          <p className="text-sm text-muted-foreground">
            or <span className="text-enterprise-primary font-medium">browse</span> to upload
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Accepted file types: {acceptedFileTypes.join(', ')}
          </p>
        </div>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="space-y-3 mt-4">
          <h4 className="text-sm font-medium">Uploading files</h4>
          <div className="space-y-2">
            {uploadingFiles.map((file) => (
              <div key={file.id} className="bg-white dark:bg-card border rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-3">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={cn("text-xs font-medium", getStatusColor(file.status))}>
                      {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                    </span>
                    {getStatusIcon(file.status)}
                  </div>
                </div>
                <Progress value={file.progress} className="h-1.5" />
                {file.error && (
                  <p className="text-xs text-destructive mt-1">{file.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
