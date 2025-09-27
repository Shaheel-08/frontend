import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ImageUpload from '@/components/ImageUpload';
import DiagnosisResults from '@/components/DiagnosisResults';

const Upload = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Skin Disease Analysis
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a clear image of the affected skin area for AI-powered analysis and treatment recommendations.
          </p>
        </div>

        {!analysisResult ? (
          <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
        ) : (
          <DiagnosisResults 
            result={analysisResult} 
            onNewAnalysis={handleNewAnalysis}
          />
        )}

        {/* Privacy Notice */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-muted p-4 rounded-lg max-w-2xl">
            <p className="text-sm text-muted-foreground">
              🔒 <strong>Privacy Protected:</strong> Your images are processed locally and securely. 
              We do not store or share your medical images or personal information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;