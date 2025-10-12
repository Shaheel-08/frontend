import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, FileText, Stethoscope, Share } from 'lucide-react';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  treatment: string;
  critical: boolean;
  recommendations?: string[];
}

interface ResultsProps {
  result: DiagnosisResult;
  onNewAnalysis: () => void;
}

const DiagnosisResults = ({ result, onNewAnalysis }: ResultsProps) => {
  const { disease, confidence, treatment, critical, recommendations } = result;
  const confidencePercentage = Math.round(confidence * 100);

  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const criticalDiseases = ['Chickenpox', 'Malaria', 'Skin Cancer', 'Melanoma', 'Cellulitis'];
  const isCritical = critical || criticalDiseases.some(cd =>
    disease.toLowerCase().includes(cd.toLowerCase())
  );

  const getConfidenceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-medical-green';
    if (percentage >= 60) return 'text-warning';
    return 'text-critical';
  };

  const getConfidenceLabel = (percentage: number) => {
    if (percentage >= 80) return 'High Confidence';
    if (percentage >= 60) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  // --- ✅ NEW SECURE SHARE FUNCTION ---
  const handleShareToTelegram = async () => {
    setIsSending(true);
    setSendStatus('idle');

    try {
      // Get the backend URL from the .env file and add the new endpoint
      const apiUrl = `${import.meta.env.VITE_API_URL}/share-telegram`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the diagnosis data to the backend
        body: JSON.stringify({
          disease: disease,
          confidence: confidencePercentage,
          treatment: treatment,
        }),
      });

      if (response.ok) {
        setSendStatus('success');
      } else {
        // The server failed to send the message
        throw new Error('Server failed to send the message.');
      }
    } catch (error) {
      setSendStatus('error');
      console.error('Share to Telegram error:', error);
      alert('An error occurred while trying to share the results.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* ... (The rest of your JSX code remains exactly the same) ... */}
      {isCritical && (
        <Card className="border-critical bg-critical-light">
          {/* ... */}
        </Card>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Diagnosis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{disease}</h3>
              {/* ... */}
            </div>
            <div className="space-y-3">
              {/* ... Confidence Score JSX ... */}
            </div>
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleShareToTelegram}
                disabled={isSending}
              >
                <Share className="h-4 w-4 mr-2" />
                {isSending ? 'Sending...' : (sendStatus === 'success' ? 'Sent!' : 'Share to Telegram')}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          {/* ... Treatment Recommendations JSX ... */}
        </Card>
      </div>
      <Card className="medical-card">
        {/* ... Next Steps JSX ... */}
      </Card>
    </div>
  );
};

export default DiagnosisResults;