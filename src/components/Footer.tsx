import { Link } from 'react-router-dom';
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin, Mail, Shield, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/_.shaheel._._?igsh=eWY0aGFxOHc3b2Z5', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mohamed-shaheel-278aa8309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
  ];

  const footerLinks = {
    product: [
      { label: 'How it Works', to: '/about' },
      { label: 'AI Technology', to: '/about' },
      { label: 'Upload Image', to: '/upload' },
      { label: 'Medical Disclaimer', to: '/about' },
    ],
    support: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Help Center', to: '/contact' },
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Service', to: '#' },
    ],
    company: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Mission', to: '/about' },
      { label: 'Medical Partners', to: '#' },
      { label: 'Research', to: '#' },
    ]
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
              <div className="p-2 rounded-lg primary-gradient">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              AI-Powered Skin Disease Detection
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Advanced AI-powered skin disease classification system providing instant, 
              accurate preliminary diagnosis and treatment recommendations.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-accent hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center group"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-warning-light border border-warning rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Medical Disclaimer</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI-Powered Skin Disease Detection provides AI-generated preliminary analysis for educational purposes only. 
                  This platform is not intended to replace professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of qualified healthcare providers with any questions regarding medical conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2025 AI-Powered Skin Disease Detection. All rights reserved.</span>
              <div className="hidden md:flex items-center gap-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-critical fill-current" />
                <span>for global health</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                ISO 27001 Certified
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                HIPAA Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;