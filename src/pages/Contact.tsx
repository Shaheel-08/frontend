import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      details: '23cs102@kpriet.ac.in',
      description: 'For technical support and general inquiries'
    },
    {
      icon: Phone,
      title: 'Emergency Medical',
      details: '0422 432 3800',
      description: 'For urgent medical concerns - consult your doctor'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      details: 'Medical AI Innovation Center',
      description: 'Coimbatore'
    }
  ];

  const supportTopics = [
    {
      icon: MessageSquare,
      title: 'Technical Support',
      description: 'Issues with image upload, analysis, or results'
    },
    {
      icon: Users,
      title: 'Medical Questions',
      description: 'General questions about AI diagnosis (not medical advice)'
    },
    {
      icon: Clock,
      title: 'Feature Requests',
      description: 'Suggestions for improving our platform'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our AI diagnosis system? Need technical support? 
            We're here to help you get the most out of AI-Powered Skin Disease Detection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="border-input-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="border-input-border"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      required
                      className="border-input-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your question or concern in detail..."
                      rows={6}
                      required
                      className="border-input-border resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full primary-gradient font-semibold"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Send className="mr-2 h-4 w-4 animate-pulse" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                    <strong>Medical Emergency:</strong> This contact form is not for medical emergencies. 
                    If you have a medical emergency, call your local emergency services immediately.
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg primary-gradient flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-primary font-medium">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Support Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportTopics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                    <topic.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{topic.title}</h4>
                      <p className="text-xs text-muted-foreground">{topic.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">How accurate is the AI diagnosis?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI system has a 92.5% accuracy rate, but it's designed for preliminary analysis only. 
                    Always consult a healthcare professional for definitive diagnosis.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Is my medical data secure?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we use enterprise-grade encryption and don't store your images. 
                    All analysis is done securely and your privacy is our priority.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What image quality works best?</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear, well-lit images with the affected area clearly visible work best. 
                    Avoid blurry or poorly lit photos for optimal results.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Do you provide medical advice?</h3>
                  <p className="text-sm text-muted-foreground">
                    No, we provide AI-generated information only. Our platform is not a replacement 
                    for professional medical consultation or treatment.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Contact;