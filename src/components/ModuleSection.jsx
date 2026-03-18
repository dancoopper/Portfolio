import React from 'react';

const ModuleSection = ({ id, title, subtitle, children }) => {
    return (
        <section id={id} className="min-h-screen py-32 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>

            <div className="relative z-10 w-full max-w-4xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2 block">{subtitle}</h2>
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">{title}</h1>
                </div>
                <div className="glass-panel p-8 md:p-12 rounded-2xl shadow-2xl">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default ModuleSection;
