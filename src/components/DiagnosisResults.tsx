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

  const handleShareToTelegram = async () => {
    setIsSending(true);
    setSendStatus('idle');

    // --- Your Telegram Bot Details ---
    const botToken = '8327110814:AAESTwjMTQBcPWcmd2uVBibE_xIQJUjF8as';
    const chatId = '6791150444';

    // Format the message using HTML for Telegram styling
    const messageText = `
<b>🔬 AI Diagnosis Report</b>
--------------------------------------
<b>Disease Detected:</b> ${disease}
<b>Confidence Score:</b> ${confidencePercentage}%

<b>📋 Treatment Recommendations:</b>
<pre>${treatment}</pre>

${recommendations && recommendations.length > 0 ?
`<b>Key Recommendations:</b>
- ${recommendations.join('\n- ')}` : ''}

<i><b>Disclaimer:</b> This is an AI-generated analysis. Always consult a qualified healthcare professional for medical advice.</i>
    `;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'HTML',
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setSendStatus('success');
      } else {
        setSendStatus('error');
        console.error('Telegram API error:', data.description);
        alert(`Failed to send message: ${data.description}`);
      }
    } catch (error) {
      setSendStatus('error');
      console.error('Network or fetch error:', error);
      alert('An error occurred. Please check the browser console for details.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Critical Warning */}
      {isCritical && (
        <Card className="border-critical bg-critical-light">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-critical flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-critical mb-2">⚠️ Medical Attention Required</h3>
                <p className="text-sm text-foreground">
                  This condition may require immediate medical consultation. 
                  Please consult a healthcare professional as soon as possible for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagnosis Card */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Diagnosis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Disease Name */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{disease}</h3>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-4 w-4 text-medical-green" />
                <span className="text-sm text-muted-foreground">
                  AI Analysis Complete
                </span>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Confidence Score</span>
                <span className={`text-sm font-semibold ${getConfidenceColor(confidencePercentage)}`}>
                  {confidencePercentage}% - {getConfidenceLabel(confidencePercentage)}
                </span>
              </div>
              <Progress 
                value={confidencePercentage} 
                className="h-3"
              />
              <p className="text-xs text-muted-foreground">
                Based on EfficientNetB0 + Tensorflow analysis
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={handleShareToTelegram}
                disabled={isSending}
              >
                <Share className="h-4 w-4 mr-2" />
                {isSending ? 'Sending...' : (sendStatus === 'success' ? 'Sent Successfully!' : 'Share to Telegram')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Treatment Recommendations */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-medical-green" />
              Treatment Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed">{treatment}</p>
            </div>

            {recommendations && recommendations.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Recommendations:</h4>
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-medical-green flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Important:</strong> These recommendations are AI-generated and for informational 
                  purposes only. Always consult with a qualified healthcare professional for personalized 
                  medical advice and treatment plans.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">What's Next?</h3>
            <p className="text-muted-foreground">After reviewing your results, you can start a new analysis.</p>
            <Button 
              onClick={onNewAnalysis}
              variant="outline"
              className="mt-6"
            >
              Analyze Another Image
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosisResults;