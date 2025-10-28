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

  // Logic to determine if a condition is critical
  const criticalDiseases = ['cancer', 'malignant', 'melanoma', 'carcinoma', 'herpes', 'cellulitis', 'lupus', 'systemic', 'vasculitis'];
  const isCritical = critical || criticalDiseases.some(cd => 
    disease.toLowerCase().includes(cd.toLowerCase())
  );

  const getConfidenceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceLabel = (percentage: number) => {
    if (percentage >= 80) return 'High Confidence';
    if (percentage >= 60) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  const handleShareToTelegram = async () => {
    setIsSending(true);
    setSendStatus('idle');

    try {
      // Get the backend URL from the .env file and add the secure endpoint
      const apiUrl = `https://ramji2311-skin-diseases.hf.space/share-telegram`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          disease: disease,
          confidence: confidencePercentage,
          treatment: treatment,
        }),
      });

      if (response.ok) {
        setSendStatus('success');
      } else {
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
    <div className="max-w-4xl mx-auto space-y-6">
      {isCritical && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="p-6 flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-600 mb-2">⚠️ Medical Attention Required</h3>
              <p className="text-sm text-gray-700">
                This condition may require immediate medical consultation. Please consult a healthcare professional as soon as possible.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagnosis Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-blue-500" />
              Diagnosis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{disease}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>AI Analysis Complete</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center font-medium">
                <span>Confidence Score</span>
                <span className={getConfidenceColor(confidencePercentage)}>
                  {confidencePercentage}% - {getConfidenceLabel(confidencePercentage)}
                </span>
              </div>
              <Progress value={confidencePercentage} className="h-2" />
              <p className="text-xs text-gray-400">Based on MobileNetV2 + TensorFlow analysis</p>
            </div>

            <div className="flex gap-2 pt-4 border-t">
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
        
        {/* Treatment Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Treatment Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">{treatment}</p>
            {recommendations && recommendations.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Key Recommendations:</h4>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pt-4 border-t">
              <div className="bg-gray-100 p-3 rounded-lg text-xs text-gray-600">
                <strong>Important:</strong> These recommendations are AI-generated for informational purposes only. Always consult a healthcare professional.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Finished with this analysis?</h3>
          <Button onClick={onNewAnalysis} variant="outline">
            Analyze Another Image
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosisResults;