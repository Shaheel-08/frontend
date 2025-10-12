// 1. Add this import at the top
import { SpeedInsights } from "@vercel/speed-insights/react";

import { Toaster } from "@/components/ui/toaster"
import { useState } from "react"
import DiagnosisResults from "@/components/DiagnosisResults"
import ImageUpload from "@/components/ImageUpload"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

function App() {
  const [result, setResult] = useState(null)
  const [view, setView] = useState('upload') // 'upload' or 'results'

  const handleAnalysisComplete = (analysisResult: any) => {
    setResult(analysisResult);
    setView('results');
  };

  const handleNewAnalysis = () => {
    setView('upload');
    setResult(null);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {view === 'upload' && <ImageUpload onAnalysisComplete={handleAnalysisComplete} />}
          {view === 'results' && result && (
            <DiagnosisResults result={result} onNewAnalysis={handleNewAnalysis} />
          )}
        </main>
        <Footer />
        <Toaster />
      </div>
      
      {/* 2. Add this component here, at the end */}
      <SpeedInsights />
    </>
  )
}

export default App