import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { TestimonialCard } from "@/components/landing/TestimonialCard";
import { BarChart3, Code2, Bot, ShieldCheck, Users, Zap, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Clean, professional images
const heroImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";
const dashboardImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
const analyticsImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
const codeEditorImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";

// Simplified partner data
const partners = [
  { name: "GitHub", src: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
  { name: "Slack", src: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" },
  { name: "Figma", src: "https://cdn.worldvectorlogo.com/logos/figma-1.svg" },
  { name: "Linear", src: "https://cdn.worldvectorlogo.com/logos/linear-1.svg" },
  { name: "Vercel", src: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
];

// Professional testimonials
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    quote: "Livedoc transformed how we handle documentation. Our team velocity increased by 40%.",
    company: "TechFlow",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
    logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
  },
  {
    name: "Marcus Johnson",
    role: "Engineering Manager",
    quote: "The AI-powered features are game-changing. Documentation stays current without manual effort.",
    company: "DataSync",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    logo: "https://cdn.worldvectorlogo.com/logos/figma-1.svg"
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    quote: "Finally, a tool that keeps our specs and code in perfect sync. Our onboarding time dropped 60%.",
    company: "BuildCorp",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    logo: "https://cdn.worldvectorlogo.com/logos/linear-1.svg"
  },
];

// Cleaner FAQs
const faqs = [
  {
    question: "How does Livedoc keep documentation in sync with code?",
    answer: "Livedoc uses AI to automatically detect code changes and updates documentation in real-time, ensuring your docs never fall behind your development."
  },
  {
    question: "Is my code and documentation secure?",
    answer: "Yes. We use enterprise-grade encryption, SOC 2 compliance, and offer on-premise deployment options for maximum security."
  },
  {
    question: "Can Livedoc integrate with our existing tools?",
    answer: "Absolutely. Livedoc connects seamlessly with GitHub, GitLab, Jira, Slack, and most popular development tools."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes! Start with our 14-day free trial with full access to all features. No credit card required."
  },
];

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Modern Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Livedoc</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Pricing", "Docs", "Blog"].map(item => (
                <a key={item} href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  {item}
                </a>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => navigate('/auth?mode=signin')}
                aria-label="Sign In"
              >
                Sign In
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                onClick={() => navigate('/auth?mode=signup')}
                aria-label="Sign Up"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            >
              Documentation that
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> writes itself</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              The AI-powered workspace that keeps your docs, code, and team perfectly synchronized. 
              Build faster, collaborate better, ship with confidence.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => navigate('/auth?mode=signup')}
                aria-label="Sign Up"
              >
                Sign Up <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-semibold border-gray-300"
                onClick={() => navigate('/auth?mode=signin')}
                aria-label="Sign In"
              >
                Sign In
              </Button>
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <img 
                src={heroImage} 
                alt="Livedoc Dashboard" 
                className="w-full rounded-2xl shadow-2xl border border-gray-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wide mb-8">
            Trusted by teams at
          </p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {partners.map(partner => (
              <img
                key={partner.name}
                src={partner.src}
                alt={partner.name}
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Everything you need to scale documentation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From AI-powered generation to real-time collaboration, 
              Livedoc provides all the tools your team needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Bot}
              title="AI-Powered Generation"
              description="Automatically generate docs from your code with context-aware AI that understands your project."
              image={codeEditorImage}
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Sync"
              description="Keep docs and code perfectly synchronized with automatic updates when changes are detected."
              image={dashboardImage}
            />
            <FeatureCard
              icon={Users}
              title="Team Collaboration"
              description="Work together seamlessly with real-time editing, comments, and review workflows."
              image={analyticsImage}
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Enterprise Security"
              description="Bank-grade security with SOC 2 compliance, SSO, and granular access controls."
              image={heroImage}
            />
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Stop wrestling with outdated docs
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Traditional documentation becomes stale the moment it's written. 
                Livedoc uses AI to keep everything current automatically.
              </p>
              <div className="space-y-4">
                {[
                  "Automatic code-to-docs synchronization",
                  "AI-powered content generation",
                  "Version control integration",
                  "Collaborative editing workflows"
                ].map(benefit => (
                  <div key={benefit} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src={dashboardImage} 
                alt="Sync Features" 
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by development teams</h2>
            <p className="text-lg text-gray-600">
              See what teams are saying about their experience with Livedoc
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently asked questions</h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about Livedoc
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your documentation?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of teams who have already made the switch to intelligent, 
            self-updating documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Livedoc</span>
              </div>
              <p className="text-gray-400">
                The future of documentation is here.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Livedoc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
