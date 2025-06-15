
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { TestimonialCard } from "@/components/landing/TestimonialCard";
import { BarChart3, Code2, Bot, ShieldCheck, Waves, Sparkle, BookCheck } from "lucide-react";
import { Fragment } from "react";

// Unsplash images
const heroImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80";
const dashboardImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
const analyticsImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
const codeEditorImage = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80";
const diagramImage = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80";

// Partner logos (these are dummy SVG logos for popular SaaS, can look like loaded logos)
const partners = [
  { name: "Hotjar", src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hotjar_logo.svg" },
  { name: "Loom", src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Loom-logo.svg" },
  { name: "Lattice", src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Lattice-logo.svg" },
  { name: "Evernote", src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Evernote_2018.svg" },
  { name: "Notion", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Atlassian", src: "https://upload.wikimedia.org/wikipedia/commons/8/82/Atlassian_Logo.svg" },
];

// Testimonials data (dummy avatars from Unsplash)
const testimonials = [
  {
    name: "Alice Nguyen",
    role: "Frontend Engineer",
    quote: "Livedoc keeps our docs up to date without the hassle. Our onboarding time is half what it used to be.",
    company: "Phantom Tech",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Atlassian_Logo.svg"
  },
  {
    name: "Bob Lee",
    role: "Technical Writer",
    quote: "The AI-powered suggestions have supercharged our workflow, and the canvas is a joy to use.",
    company: "Jupiter Inc.",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Evernote_2018.svg"
  },
  {
    name: "Carol Kim",
    role: "Engineering Manager",
    quote: "Dashboards and predictive alerts keep us ahead. Our team loves the living documentation features.",
    company: "Zenware",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Loom-logo.svg"
  },
];

// FAQs
const faqs = [
  {
    question: "How does livedoc improve my documentation process?",
    answer: "livedoc automates tedious writing, syncs docs with code in real-time, and leverages AI to generate accurate, actionable specs."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We offer end-to-end encryption, SOC 2 Type II compliance, and granular access controls for your peace of mind."
  },
  {
    question: "Can it integrate with GitHub or my CI/CD?",
    answer: "livedoc connects to GitHub, GitLab, Bitbucket, and popular CI/CDs for seamless code and doc workflows."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, start with a free trial and experience the full power of livedoc for your team."
  },
];

export default function Landing() {
  return (
    <div className="font-sans bg-gradient-to-br from-[#f6f0ff] to-[#e5f1ff] min-h-screen text-[#0f172a] flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur bg-white/70 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkle className="text-[#8b5cf6]" />
          <span className="text-xl font-extrabold tracking-tight">livedoc</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {["Product", "Features", "Pricing", "Resources", "Blog", "Sign In"].map(item => (
            <a key={item} href="#" className="hover:text-[#1e40af] transition-colors">{item}</a>
          ))}
        </div>
        <div className="ml-4">
          <Button className="bg-[#1e40af] hover:bg-[#1d4ed8] px-6 py-2 text-white font-semibold rounded-md shadow transition-colors text-base">
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-6xl font-bold tracking-tight">
            AI-powered documentation that writes itself
          </motion.h1>
          <p className="max-w-xl mx-auto text-base md:text-lg text-[#475569]">
            livedoc automates your software documentation, generates code, diagrams, and lets you collaborate in real-time — all on one canvas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-[#1e40af] hover:bg-[#1d4ed8] px-7 py-3 text-lg font-semibold shadow-lg">Try for free</Button>
            <Button variant="outline" className="text-[#1e40af] border-[#1e40af] px-7 py-3 text-lg font-semibold shadow">Request a demo</Button>
          </div>
        </div>
        {/* Hero Visuals */}
        <div className="relative mt-12 w-full max-w-4xl flex items-center justify-center">
          <motion.div className="relative w-full flex flex-col md:flex-row gap-6 items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18 } }
            }}>
            {/* Central Card */}
            <motion.div
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 35 } }}
              className="flex-1 min-w-[280px] max-w-sm bg-white/90 rounded-xl border shadow-xl p-6 z-10"
            >
              <div className="flex items-center gap-2 mb-2">
                <Bot className="text-[#8b5cf6]" />
                <span className="font-bold">AI Overview</span>
              </div>
              <img src={heroImage} alt="Dashboard Preview" className="w-full h-32 object-cover rounded-lg shadow mb-4" />
              <ul className="text-sm space-y-1">
                <li><BookCheck className="inline mr-1 text-[#1e40af]" /> Docs Coverage: <span className="font-semibold">98%</span></li>
                <li><BarChart3 className="inline mr-1 text-[#1e40af]" /> PR Coverage: <span className="font-semibold">92%</span></li>
                <li><Waves className="inline mr-1 text-[#1e40af]" /> Diagram Synced</li>
              </ul>
            </motion.div>
            {/* Floating Metric Cards */}
            <motion.div
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -30 } }}
              className="absolute left-[-50px] top-4 w-[140px] hidden md:flex flex-col gap-4 z-20"
            >
              <Card className="bg-[#f9fafb] border border-slate-200/60 shadow-sm">
                <CardContent className="pt-4 pb-3">
                  <span className="font-bold text-2xl">98%</span>
                  <div className="text-xs text-[#475569] mt-1">Specs Accurate</div>
                </CardContent>
              </Card>
              <Card className="bg-[#f9fafb] border border-slate-200/60 shadow-sm">
                <CardContent className="pt-4 pb-3">
                  <span className="font-mono">Synced</span>
                  <div className="text-xs text-[#475569] mt-1">Diagram</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: 30 } }}
              className="absolute right-[-50px] bottom-2 w-[140px] hidden md:flex flex-col gap-4 z-20"
            >
              <Card className="bg-[#f9fafb] border border-slate-200/60 shadow-sm">
                <CardContent className="pt-4 pb-3">
                  <span className="font-bold text-2xl">4 min</span>
                  <div className="text-xs text-[#475569] mt-1">Time Saved</div>
                </CardContent>
              </Card>
              <Card className="bg-[#f9fafb] border border-slate-200/60 shadow-sm">
                <CardContent className="pt-4 pb-3">
                  <span className="font-mono">Live</span>
                  <div className="text-xs text-[#475569] mt-1">Collaborate</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="w-full py-10 bg-[#f9fafb] px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <span className="uppercase text-xs md:text-sm tracking-wide text-[#475569] font-medium mb-2">Trusted by innovative teams</span>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {partners.map(p => (
              <img
                key={p.name}
                src={p.src}
                alt={p.name}
                className="h-8 w-auto grayscale hover:grayscale-0 transition"
                style={{ maxWidth: 110 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="w-full py-16 px-6 md:px-12 bg-gradient-to-br from-white via-[#f6f0ff] to-[#e5f1ff]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-center">Why dev teams love our AI-powered workspace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Code2}
              title="Live Code ↔ Diagram Sync"
              description="Edits sync instantly between code and diagram — never lose track of architecture again."
              image={diagramImage}
            />
            <FeatureCard
              icon={Waves}
              title="Voice-powered AI tasks"
              description="Trigger documentation or code generation instantly via natural speech commands."
              image={dashboardImage}
            />
            <FeatureCard
              icon={BookCheck}
              title="Version-aware doc history"
              description="Docs automatically keep pace with your PRs, branches, and releases."
              image={codeEditorImage}
            />
            <FeatureCard
              icon={Sparkle}
              title="Type-safe AI generation"
              description="AI always matches your actual codebase types and interfaces for max trust."
              image={analyticsImage}
            />
          </div>
        </div>
      </section>

      {/* Split Feature Panels */}
      <section className="w-full py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-14">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Left text + icon */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-[#1e40af] font-semibold text-lg">
                <ShieldCheck className="w-6 h-6" />
                AI-Powered Spec Verification
              </div>
              <h3 className="text-2xl font-bold mt-2 mb-2">Build with confidence</h3>
              <p className="text-[#475569] text-base md:text-lg">
                All AI-generated content is checked, verified, and cross-referenced against your codebase and APIs. Hallucination guardrails keep your specs and docs accurate.
              </p>
            </div>
            {/* Right screenshot */}
            <div className="flex-1 flex justify-center">
              <img src={dashboardImage} alt="Spec Guardrails UI" className="rounded-xl shadow-lg border w-full max-w-sm object-cover" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
            {/* Left chart */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-[#1e40af] font-semibold text-lg">
                <BarChart3 className="w-6 h-6" />
                Predictive Alerts & Analytics
              </div>
              <h3 className="text-2xl font-bold mt-2 mb-2">See the future — literally</h3>
              <p className="text-[#475569] text-base md:text-lg">
                Analytics dashboards and proactive notification widgets let leaders spot risks and opportunities before they happen.
              </p>
            </div>
            {/* Right analytic image */}
            <div className="flex-1 flex justify-center">
              <img src={analyticsImage} alt="Analytics Preview" className="rounded-xl shadow-lg border w-full max-w-sm object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-16 px-6 md:px-12 bg-[#f9fafb]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">What engineering teams are saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={i}
                name={t.name}
                role={t.role}
                quote={t.quote}
                company={t.company}
                avatar={t.avatar}
                logo={t.logo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="w-full py-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="multiple" className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem value={f.question} key={i} className="bg-white border rounded-lg shadow-sm">
                <AccordionTrigger className="text-base font-medium">{f.question}</AccordionTrigger>
                <AccordionContent className="text-[#475569] text-base">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-14 bg-gradient-to-br from-[#e5f1ff] to-[#f6f0ff] px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl md:text-4xl font-bold">Supercharge your team’s productivity with livedoc</h2>
          <p className="max-w-xl text-[#475569]">See why top teams trust us for AI-powered docs, code, and collaboration — all in one unified workspace.</p>
          <Button className="bg-[#1e40af] hover:bg-[#1d4ed8] px-8 py-4 text-lg font-semibold shadow-lg">Get Started</Button>
          <img src={dashboardImage} alt="Dashboard Preview" className="w-full max-w-xl mx-auto rounded-xl shadow-lg border mt-4" />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-[#475569] text-sm py-5">
        &copy; {new Date().getFullYear()} livedoc. All rights reserved.
      </footer>
    </div>
  );
}
