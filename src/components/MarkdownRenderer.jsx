import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ content }) => {
    return (
        <div className="markdown-body prose prose-invert max-w-none prose-p:text-hacker-green/80 prose-headings:text-hacker-green prose-a:text-cyber-blue hover:prose-a:text-cyber-blue/80">
            <ReactMarkdown
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-6 border-b border-hacker-green/30 pb-2 glow-text" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mb-4 text-cyber-blue glow-text mt-8 uppercase tracking-wider" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-medium mb-3 mt-6 text-hacker-green/90 uppercase tracking-wide" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-hacker-green/80" {...props} />,
                    li: ({ node, ...props }) => <li className="ml-4 marker:text-cyber-blue" {...props} />,
                    a: ({ node, ...props }) => <a className="underline decoration-cyber-blue/50 underline-offset-4 font-bold" target="_blank" rel="noopener noreferrer" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-hacker-green/50 pl-4 py-2 my-4 italic text-hacker-green/70 bg-hacker-green/5" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold text-cyber-blue" {...props} />,
                    code: ({ node, inline, ...props }) => (
                        inline ?
                            <code className="bg-terminal-gray/80 px-1.5 py-0.5 rounded text-cyber-blue text-sm border border-cyber-blue/20" {...props} /> :
                            <pre className="bg-terminal-gray/80 p-4 rounded mb-4 overflow-x-auto border border-hacker-green/20 relative group"><code className="text-hacker-green text-sm" {...props} /><div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-hacker-green/50">_SYS.CODE</div></pre>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
