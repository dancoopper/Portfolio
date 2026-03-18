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
    <div className="min-h-screen scanlines relative bg-terminal-black text-hacker-green selection:bg-hacker-green selection:text-black">
      <Header />

      <main className="px-4 relative z-10">
        <ModuleSection id="module-1" title="01.PERSONAL">
          <div className="mb-8">
            <TypingEffect text="> INITIALIZING USER PROFILE..." speed={50} className="text-hacker-green font-bold text-xl md:text-2xl mb-4 text-shadow" />
          </div>
          <MarkdownRenderer content={content.personal} />
        </ModuleSection>

        <ModuleSection id="module-2" title="02.ACADEMIC">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <MarkdownRenderer content={content.academic} />
            </div>
            <div className="border border-cyber-blue/50 bg-cyber-blue/5 p-6 rounded relative overflow-hidden group shadow-[0_0_15px_rgba(0,228,255,0.1)] hover:shadow-[0_0_25px_rgba(0,228,255,0.3)] transition-all">
              <div className="absolute inset-x-0 bottom-0 h-1 bg-cyber-blue animate-pulse"></div>
              <h3 className="text-cyber-blue font-bold mb-6 relative z-10 uppercase tracking-widest text-sm flex items-center">
                <span className="w-2 h-2 bg-cyber-blue rounded-full mr-2 animate-ping"></span>
                System.Transcript
              </h3>
              <div className="flex flex-col space-y-4 relative z-10 text-sm font-mono">
                <div className="flex justify-between border-b border-cyber-blue/20 pb-2">
                  <span className="text-cyber-blue/80">Data Structures</span><span className="text-hacker-green font-bold">A+</span>
                </div>
                <div className="flex justify-between border-b border-cyber-blue/20 pb-2">
                  <span className="text-cyber-blue/80">Algorithms</span><span className="text-hacker-green font-bold">A</span>
                </div>
                <div className="flex justify-between border-b border-cyber-blue/20 pb-2">
                  <span className="text-cyber-blue/80">Operating Systems</span><span className="text-hacker-green font-bold">A</span>
                </div>
                <div className="flex justify-between border-b border-cyber-blue/20 pb-2">
                  <span className="text-cyber-blue/80">Distributed Systems</span><span className="text-hacker-green font-bold">A+</span>
                </div>
              </div>
            </div>
          </div>
        </ModuleSection>

        <ModuleSection id="module-3" title="03.PROJECTS">
          <div className="mb-8 flex gap-3 flex-wrap bg-hacker-green/5 p-4 border border-hacker-green/20 rounded">
            <div className="w-full text-xs text-hacker-green/50 mb-2 uppercase tracking-wider font-bold">Detected Technologies</div>
            <SkillBadge skill="React" type="blue" />
            <SkillBadge skill="Python" type="default" />
            <SkillBadge skill="Rust" type="white" />
            <SkillBadge skill="Go" type="blue" />
            <SkillBadge skill="TailwindCSS" type="blue" />
            <SkillBadge skill="Node.js" type="default" />
            <SkillBadge skill="Docker" type="blue" />
            <SkillBadge skill="WebGL" type="white" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 [&>.markdown-body>h3]:mt-0 [&>.markdown-body]:grid [&>.markdown-body]:gap-6 [&>.markdown-body]:grid-cols-1">
            <MarkdownRenderer content={content.work_samples} />
          </div>
        </ModuleSection>

        <ModuleSection id="module-4" title="04.CAPSTONE">
          <div className="w-full bg-[#050505] p-6 md:p-10 border border-hacker-green shadow-[0_0_20px_rgba(0,255,65,0.15)] relative">
            <div className="absolute top-0 right-0 bg-hacker-green text-black px-2 py-1 text-xs font-bold uppercase tracking-wider">Classified</div>
            <MarkdownRenderer content={content.capstone} />
          </div>
        </ModuleSection>

        <ModuleSection id="module-5" title="05.PROFESSIONAL">
          <MarkdownRenderer content={content.professional} />
        </ModuleSection>
      </main>

      <CommandPalette />

      <footer className="py-8 mt-12 text-center text-xs text-hacker-green/40 border-t border-hacker-green/20 relative z-10 bg-terminal-black/80 flex flex-col items-center">
        <div className="w-px h-12 bg-gradient-to-b from-hacker-green/50 to-transparent mb-4"></div>
        <p className="tracking-widest uppercase">&gt; Press <kbd className="border border-hacker-green/30 px-1 rounded bg-hacker-green/10 text-hacker-green/80">Ctrl+K</kbd> to open Command Palette.</p>
        <p className="mt-4 opacity-50">© {new Date().getFullYear()} SYS.ADMIN. END OF TRANSMISSION.</p>
      </footer>
    </div>
  );
}

export default App;
