import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ content }) => {
    return (
        <div className="max-w-none text-zinc-300 flex flex-col space-y-5 break-words">
            <ReactMarkdown
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-zinc-100 mt-2 mb-4 tracking-tight" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-zinc-100 mt-6 mb-3 flex items-center" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-medium text-zinc-200 mt-6 mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="leading-relaxed text-[15px] opacity-90" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-none space-y-2 mt-2 mb-4" {...props} />,
                    li: ({ node, ...props }) => (
                        <li className="relative pl-6 text-[15px]" {...props}>
                            <span className="absolute left-2 top-[10px] w-1.5 h-1.5 bg-primary/60 rounded-full"></span>
                            {props.children}
                        </li>
                    ),
                    a: ({ node, ...props }) => (
                        <a
                            className="text-primary hover:text-blue-400 font-medium transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                        />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-2 border-primary/50 pl-5 py-1 my-6 italic text-zinc-400 bg-primary/5 rounded-r-lg" {...props} />
                    ),
                    strong: ({ node, ...props }) => <strong className="font-semibold text-zinc-100" {...props} />,
                    code: ({ node, inline, ...props }) => (
                        inline ?
                            <code className="bg-zinc-800/80 px-1.5 py-0.5 rounded-md text-accent font-mono text-sm border border-zinc-700/50" {...props} /> :
                            <pre className="bg-[#0f0f11] p-5 rounded-xl my-6 overflow-x-auto border border-white/5 relative group">
                                <div className="flex items-center space-x-1.5 absolute top-4 right-4">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                                </div>
                                <code className="text-zinc-300 font-mono text-sm leading-relaxed block mt-2" {...props} />
                            </pre>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
