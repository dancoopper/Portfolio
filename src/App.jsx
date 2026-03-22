import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CommandPalette from './components/CommandPalette';
import MarkdownRenderer from './components/MarkdownRenderer';
import ModuleSection from './components/ModuleSection';
import TypingEffect from './components/TypingEffect';
import SkillBadge from './components/SkillBadge';

function App() {
  const [content, setContent] = useState({
    personal: '',
    academic: '',
    work_samples: '',
    capstone: '',
    professional: ''
  });

  useEffect(() => {
    const fetchContent = async () => {
      const files = ['personal', 'academic', 'work_samples', 'capstone', 'professional'];
      const results = {};

      await Promise.all(files.map(async (file) => {
        try {
          const response = await fetch(`/content/${file}.md`);
          const text = await response.text();
          results[file] = text;
        } catch (error) {
          console.error(`Error loading ${file}.md:`, error);
          results[file] = `# Error loading ${file}`;
        }
      }));

      setContent(results);
    };
    fetchContent();
  }, []);

  return (
    <div className="min-h-screen relative font-sans">
      <Header />

      <main className="px-6 relative z-10 transition-colors">
        <ModuleSection id="module-1" subtitle="Introduction" title="Personal Profile.">
          <div className="mb-10">
            <TypingEffect text="Initializing environment..." speed={40} className="text-zinc-100 font-medium text-lg md:text-xl" />
          </div>
          <MarkdownRenderer content={content.personal} />
        </ModuleSection>

        <ModuleSection id="module-2" subtitle="Education" title="Academic History.">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <MarkdownRenderer content={content.academic} />
            </div>
            <div className="border border-white/10 bg-zinc-900/50 p-6 rounded-2xl relative overflow-hidden group shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-zinc-100 font-bold mb-6 text-sm uppercase tracking-wide flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                Academic Transcript
              </h3>
              <div className="flex flex-col space-y-4 relative z-10 text-sm">
                <div className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-lg transition-colors">
                  <span className="text-zinc-400 font-medium">Data Structures</span>
                  <span className="text-primary font-bold px-2 py-0.5 bg-primary/10 rounded">A+</span>
                </div>
                <div className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-lg transition-colors">
                  <span className="text-zinc-400 font-medium">Algorithms</span>
                  <span className="text-zinc-300 font-bold px-2 py-0.5 bg-white/5 rounded">A</span>
                </div>
                <div className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-lg transition-colors">
                  <span className="text-zinc-400 font-medium">Operating Systems</span>
                  <span className="text-zinc-300 font-bold px-2 py-0.5 bg-white/5 rounded">A</span>
                </div>
                <div className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-lg transition-colors">
                  <span className="text-zinc-400 font-medium">Distributed Systems</span>
                  <span className="text-primary font-bold px-2 py-0.5 bg-primary/10 rounded">A+</span>
                </div>
              </div>
            </div>
          </div>
        </ModuleSection>

        <ModuleSection id="module-3" subtitle="Portfolio" title="Work Samples.">
          <div className="mb-10 flex gap-3 flex-wrap">
            <SkillBadge skill="React" type="primary" />
            <SkillBadge skill="Python" type="default" />
            <SkillBadge skill="Rust" type="default" />
            <SkillBadge skill="Go" type="primary" />
            <SkillBadge skill="TailwindCSS" type="accent" />
            <SkillBadge skill="Node.js" type="default" />
            <SkillBadge skill="Docker" type="primary" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 [&>.max-w-none>h3]:mt-0">
            <MarkdownRenderer content={content.work_samples} />
          </div>
        </ModuleSection>


        {/* TODO: Add real capstone project info */}
        <ModuleSection id="module-4" subtitle="Architecture" title="Capstone Project.">
          <div className="w-full bg-[#0a0a0c] p-8 md:p-12 border border-white/5 rounded-2xl shadow-xl relative mt-4">
            <div className="absolute -top-3 left-8 bg-zinc-800 border border-white/10 text-zinc-300 px-3 py-1 text-xs font-semibold rounded-full shadow-lg">Documentation System</div>
            <MarkdownRenderer content={content.capstone} />
          </div>
        </ModuleSection>

        <ModuleSection id="module-5" subtitle="History" title="Professional Info.">
          <MarkdownRenderer content={content.professional} />
        </ModuleSection>
      </main>

      <CommandPalette />

      <footer className="py-12 mt-20 border-t border-white/5 bg-zinc-950 flex flex-col items-center">
        <div className="flex items-center space-x-2 text-zinc-500 text-sm mb-6">
          <span>Press</span>
          <kbd className="font-sans px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 shadow-sm text-xs font-medium">Ctrl</kbd>
          <span>+</span>
          <kbd className="font-sans px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 shadow-sm text-xs font-medium">K</kbd>
          <span>to navigate</span>
        </div>
        <div className="text-zinc-600 text-xs flex space-x-4">
          <span>© {new Date().getFullYear()} DEV.STUDIO</span>
          <span>•</span>
          <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
          <span>•</span>
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
