import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Upload, Shield, Brain, Clock } from 'lucide-react';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Advanced MobileNetV2 + Tensorflow technology'
    },
    {
      icon: Clock,
      title: 'Instant Results',
      description: 'Get diagnosis in seconds'
    },
    {
      icon: Shield,
      title: 'Medical Grade',
      description: 'Professional treatment recommendations'
    }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-surface via-primary-light to-surface overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              AI-Powered
              <span className="block text-transparent bg-clip-text medical-gradient">
                Skin Disease Detection
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant, accurate skin disease diagnosis with our advanced AI technology. 
              Upload an image and receive professional treatment recommendations in seconds.
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up mb-12">
            <Link to="/upload">
              <Button 
                size="lg" 
                className="primary-gradient text-lg px-8 py-4 h-auto font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Upload className={`mr-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
                Upload Skin Image
              </Button>
            </Link>
            
            <p className="text-sm text-muted-foreground mt-4">
              Free • Instant • Confidential
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="medical-card p-6 text-center hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg primary-gradient flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by healthcare professionals • 99.2% accuracy rate
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-xs font-medium">ISO 27001</div>
              <div className="text-xs font-medium">HIPAA Compliant</div>
              <div className="text-xs font-medium">FDA Guidelines</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;