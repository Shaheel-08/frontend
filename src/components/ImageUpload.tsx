import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';

interface UploadProps {
  onAnalysisComplete: (result: any) => void;
}

const ImageUpload = ({ onAnalysisComplete }: UploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 10000000) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      
      const apiUrl = `https://shaheel-08-skin-disease-backend.hf.space/predict`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("API Request Failed");
      
      const result = await response.json();
      
      onAnalysisComplete(result);

    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || 'An error occurred during analysis.',
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="medical-card max-w-2xl mx-auto">
      <CardContent className="p-8">
        {!selectedFile ? (
          <div
            className={`upload-zone p-8 text-center cursor-pointer ${
              dragActive ? 'border-primary bg-primary-light' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full primary-gradient flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Upload Skin Image
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your image here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG • Max 10MB • Best results with clear, well-lit images
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Uploaded skin image"
                className="w-full max-h-96 object-contain rounded-lg border border-card-border"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 p-4 bg-accent rounded-lg">
              <ImageIcon className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <Button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="w-full primary-gradient font-semibold py-3"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                'Analyze for Skin Conditions'
              )}
            </Button>

            <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
              <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only 
              and should not replace professional medical consultation.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
