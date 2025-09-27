import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Shield, Zap, Users, Award, Globe } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Technology',
      description: 'Our system uses EfficientNetB0 architecture combined with Convolutional Neural Networks (CNN) for accurate skin disease classification.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Analysis',
      description: 'Get results in seconds with our optimized machine learning pipeline that processes images efficiently.'
    },
    {
      icon: Shield,
      title: 'Medical Grade Accuracy',
      description: 'Trained on thousands of dermatological images with validation from medical professionals.'
    },
    {
      icon: Users,
      title: 'Accessible Healthcare',
      description: 'Making preliminary skin disease detection accessible to everyone, anywhere, anytime.'
    }
  ];

  const technicalSpecs = [
    { label: 'AI Model', value: 'EfficientNetB0 + CNN' },
    { label: 'Training Dataset', value: '30,000+ Images' },
    { label: 'Accuracy Rate', value: '92.5%' },
    { label: 'Processing Time', value: '< 3 seconds' },
    { label: 'Supported Conditions', value: '15+ Diseases' },
    { label: 'Image Formats', value: 'JPG, PNG, WebP' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            About AI-Powered Skin Disease Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered skin disease classification system designed to provide 
            instant, accurate preliminary diagnosis and treatment recommendations.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="medical-card mb-16">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full primary-gradient flex items-center justify-center">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              To democratize access to preliminary skin disease detection using cutting-edge AI technology, 
              helping people get timely medical insights and encouraging appropriate professional consultation 
              when needed.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="medical-card hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-lg primary-gradient flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Specifications */}
        <Card className="medical-card mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalSpecs.map((spec, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-accent">
                  <div className="text-2xl font-bold text-primary mb-2">{spec.value}</div>
                  <div className="text-sm text-muted-foreground">{spec.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="medical-card mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-foreground mb-2">Image Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a clear photo of the affected skin area using our secure interface
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-foreground mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our EfficientNetB0 + Tensorflow analyzes the image for skin conditions
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-foreground mb-2">Results & Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Receive instant diagnosis with confidence score and treatment recommendations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Disclaimer */}
        <Card className="border-warning bg-warning-light">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warning text-white flex items-center justify-center">
              <Award className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-4">Important Medical Disclaimer</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
              <p>
                <strong>AI-Powered Skin Disease Detection is not a replacement for professional medical consultation.</strong> 
                Our AI system provides preliminary analysis and educational information only.
              </p>
              <p>
                Always consult with qualified healthcare professionals, dermatologists, or your primary 
                care physician for accurate diagnosis, treatment plans, and medical advice.
              </p>
              <p>
                If you suspect a serious skin condition or notice concerning changes, seek immediate 
                medical attention regardless of our AI analysis results.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default About;