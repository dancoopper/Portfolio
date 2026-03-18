import React from 'react';

const SkillBadge = ({ skill, type = 'default' }) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider border relative overflow-hidden group transition-all duration-300 cursor-default";

    const typeStyles = {
        default: "border-hacker-green/50 text-hacker-green hover:border-hacker-green hover:bg-hacker-green/10 hover:shadow-[0_0_15px_rgba(0,255,65,0.5)]",
        blue: "border-cyber-blue/50 text-cyber-blue hover:border-cyber-blue hover:bg-cyber-blue/10 hover:shadow-[0_0_15px_rgba(0,228,255,0.5)]",
        white: "border-gray-400/50 text-gray-300 hover:border-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
    };

    return (
        <span className={`${baseClasses} ${typeStyles[type] || typeStyles.default}`}>
            <span className="mr-1.5 opacity-50 font-normal">&gt;</span>
            <span className="relative z-10">{skill}</span>
        </span>
    );
};

export default SkillBadge;
