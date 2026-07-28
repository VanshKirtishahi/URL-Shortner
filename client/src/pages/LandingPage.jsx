import { Zap, Check, X, BarChart3, Shield, ArrowRight } from 'lucide-react';
import NeoButton from '../shared/components/NeoButton';

export default function LandingPage() {
  return (
    <div id="top" className="min-h-screen font-satoshi selection:bg-neo-yellow selection:text-black">
      
      {/* 1. Navigation */}
      <nav className="fixed top-0 w-full h-20 bg-neo-yellow border-b-2 border-black z-50 flex items-center justify-between px-6 lg:px-12">
        <a href="#top" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
            <Zap className="text-neo-yellow w-6 h-6" fill="currentColor" />
          </div>
          <span className="font-cabinet font-extrabold text-2xl tracking-tight">ShortLink.</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8 font-bold">
          <a href="#features" className="hover:underline decoration-2 underline-offset-4">Features</a>
          <a href="#how-it-works" className="hover:underline decoration-2 underline-offset-4">How it Works</a>
          <a href="#pricing" className="hover:underline decoration-2 underline-offset-4">Pricing</a>
        </div>

        <NeoButton to="/login" variant="primary" className="py-2 px-5 text-sm">
          Start Free Trial
        </NeoButton>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-neo-yellow bg-dots min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border-2 border-black font-bold text-sm shadow-[2px_2px_0_0_#000]">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              NEW: Advanced Link Analytics
            </div>
            
            <h1 className="font-cabinet font-extrabold text-6xl lg:text-8xl leading-[1.1] tracking-tighter">
              Shorten links.<br />
              <span className="text-stroke">Maximize</span> impact.
            </h1>
            
            <p className="text-xl font-medium max-w-md">
              The high-performance URL shortener built for modern marketing teams. Track clicks, analyze referrers, and boost conversions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
              <NeoButton to="/register" variant="primary" className="text-lg">
                Get Started for Free
              </NeoButton>
              <NeoButton to="/login" variant="secondary" className="text-lg">
                View Live Demo
              </NeoButton>
            </div>
          </div>

          {/* Browser Mockup */}
          <div className="bg-white border-2 border-black rounded-2xl shadow-hard-xl overflow-hidden transform lg:rotate-2">
            <div className="bg-black p-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
            </div>
            <div className="p-6 bg-neo-sage/10">
              <div className="grid gap-4">
                <div className="bg-white border-2 border-black p-4 rounded-xl shadow-hard">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">Total Clicks</span>
                    <span className="text-neo-sage font-cabinet font-bold text-2xl">24,592</span>
                  </div>
                  <div className="h-24 flex items-end gap-2">
                    {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-neo-yellow border-2 border-black rounded-t" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neo-charcoal text-white p-4 rounded-xl border-2 border-black">
                    <p className="text-xs text-gray-400 mb-1">Top Referrer</p>
                    <p className="font-bold">Twitter / X</p>
                  </div>
                  <div className="bg-neo-sage p-4 rounded-xl border-2 border-black">
                    <p className="text-xs text-black/60 mb-1">Active Links</p>
                    <p className="font-bold text-black">142</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof Marquee */}
      <div className="bg-neo-charcoal border-y-2 border-black py-6 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-16 items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center">
              {['ACME CORP', 'GLOBEX', 'SOYUZ', 'INITECH', 'UMBRELLA', 'MASSIVE DYNAMIC'].map((brand, j) => (
                <span key={j} className="font-cabinet font-bold text-3xl text-neo-sage opacity-50">
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Problem vs Solution */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-[#f4f4f5] border-2 border-dashed border-gray-400 rounded-[2rem] p-10 opacity-80">
            <h3 className="font-cabinet font-extrabold text-3xl mb-8">The Old Way</h3>
            <ul className="space-y-6 font-medium">
              {[
                "Long, ugly URLs that look like spam",
                "Zero visibility into who is clicking",
                "Links that break and can't be updated",
                "Cluttered spreadsheets to track campaigns"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-red-200 text-red-700 p-1 rounded border border-red-300">
                    <X className="w-4 h-4" />
                  </div>
                  <span className="text-lg text-gray-600">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-neo-yellow border-2 border-black rounded-[2rem] p-10 shadow-hard-lg">
            <h3 className="font-cabinet font-extrabold text-3xl mb-8">The ShortLink Way</h3>
            <ul className="space-y-6 font-medium">
              {[
                "Branded, clean shortcodes (Custom Aliases)",
                "Real-time geographic and device analytics",
                "Dynamic routing and editable destinations",
                "One beautiful dashboard for everything"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-black text-neo-yellow p-1 rounded border-2 border-black">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-bold">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </section>

      {/* 5. Feature Grid */}
      <section id="features" className="py-24 px-6 lg:px-12 bg-neo-yellow border-y-2 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-cabinet font-extrabold text-5xl mb-16 text-center">Everything you need. <br/>Nothing you don't.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Lightning Fast", icon: Zap, desc: "Redis cache-aside architecture ensures sub-millisecond redirects." },
              { title: "Deep Analytics", icon: BarChart3, desc: "Track referrers, geographic locations, and devices in real-time." },
              { title: "Secure & Reliable", icon: Shield, desc: "Built with rate-limiting and enterprise-grade infrastructure." }
            ].map((feat, i) => (
              <div key={i} className="group bg-white border-2 border-black p-8 rounded-xl shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all">
                <div className="w-16 h-16 bg-neo-sage border-2 border-black rounded-lg mb-6 flex items-center justify-center group-hover:bg-neo-yellow transition-colors">
                  <feat.icon className="w-8 h-8" />
                </div>
                <h3 className="font-cabinet font-extrabold text-2xl mb-3">{feat.title}</h3>
                <p className="font-medium text-gray-700 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How it Works (Dark Mode) */}
      <section id="how-it-works" className="py-24 px-6 lg:px-12 bg-neo-charcoal text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cabinet font-extrabold text-5xl mb-20 text-center text-white">How it works</h2>
          
          <div className="relative flex flex-col md:flex-row justify-between gap-12">
            <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-[#272727] z-0"></div>
            
            {[
              { step: 1, title: "Paste URL", color: "border-neo-sage text-neo-sage", desc: "Drop in your long, messy link." },
              { step: 2, title: "Customize", color: "border-neo-yellow text-neo-yellow", desc: "Add an alias or set an expiration date." },
              { step: 3, title: "Deploy", color: "border-white text-white", desc: "Copy the shortcode and start tracking." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center w-full">
                <div className={`w-24 h-24 rounded-full bg-neo-charcoal border-4 ${item.color} flex items-center justify-center font-cabinet font-extrabold text-4xl mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                  {item.step}
                </div>
                <h3 className="font-cabinet font-bold text-2xl mb-2">{item.title}</h3>
                <p className="text-gray-400 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section id="pricing" className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-cabinet font-extrabold text-5xl mb-16 text-center">Simple, transparent pricing.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            <div className="bg-[#f4f4f5] border-2 border-black p-8 rounded-2xl shadow-hard">
              <h3 className="font-cabinet font-bold text-2xl mb-2">Hobby</h3>
              <p className="text-4xl font-extrabold font-cabinet mb-6">$0<span className="text-lg text-gray-500 font-medium">/mo</span></p>
              <ul className="space-y-3 mb-8 font-medium">
                <li className="flex items-center gap-2"><Check className="w-5 h-5"/> 1,000 tracked clicks</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5"/> 30-day analytics retention</li>
              </ul>
              <NeoButton to="/register" variant="secondary" className="w-full">Get Started</NeoButton>
            </div>

            <div className="bg-neo-yellow border-2 border-black p-8 rounded-2xl shadow-hard-lg relative">
              <div className="absolute -top-4 -right-4 bg-black text-white text-xs font-bold px-3 py-1 border-2 border-black rotate-12">
                MOST POPULAR
              </div>
              <h3 className="font-cabinet font-bold text-2xl mb-2">Pro</h3>
              <p className="text-4xl font-extrabold font-cabinet mb-6">$9<span className="text-lg text-black/60 font-medium">/mo</span></p>
              <ul className="space-y-3 mb-8 font-medium">
                <li className="flex items-center gap-2"><Check className="w-5 h-5"/> Unlimited tracked clicks</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5"/> Real-time map & device data</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5"/> Custom branded aliases</li>
              </ul>
              <NeoButton to="/register" variant="primary" className="w-full">Start Free Trial</NeoButton>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-32 px-6 bg-neo-yellow border-y-2 border-black text-center">
        <h2 className="font-cabinet font-extrabold text-6xl md:text-7xl mb-8 tracking-tighter">Ready to take control?</h2>
        <p className="text-2xl font-medium mb-10 max-w-2xl mx-auto">Join thousands of developers and marketers optimizing their links today.</p>
        <NeoButton to="/register" variant="primary" className="text-xl px-12 py-5">
          Start building for free <ArrowRight className="ml-2 w-6 h-6" />
        </NeoButton>
      </section>

      {/* 9. Footer */}
      <footer className="bg-neo-charcoal text-white py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-neo-yellow rounded flex items-center justify-center">
                <Zap className="text-black w-5 h-5" />
              </div>
              <span className="font-cabinet font-extrabold text-xl">ShortLink.</span>
            </div>
            <p className="text-gray-400 font-medium">The high-performance URL shortener for modern teams.</p>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "API", "Documentation"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security"] }
          ].map((column, i) => (
            <div key={i}>
              <h4 className="font-cabinet font-bold text-lg mb-4 text-neo-sage">{column.title}</h4>
              <ul className="space-y-3 font-medium text-gray-400">
                {column.links.map((link, j) => (
                  <li key={j}><a href="#" className="hover:text-neo-yellow transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}