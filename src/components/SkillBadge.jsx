import React from 'react';

const SkillBadge = ({ skill, type = 'default' }) => {
    const baseClasses = "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border transition-colors";

    const typeStyles = {
        default: "border-white/10 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 hover:text-white",
        primary: "border-primary/20 bg-primary/10 text-primary-400 hover:bg-primary/20 hover:text-blue-300",
        accent: "border-accent/20 bg-accent/10 text-accent hover:bg-accent/20 hover:text-purple-300"
    };

    return (
        <span className={`${baseClasses} ${typeStyles[type] || typeStyles.default}`}>
            {skill}
        </span>
    );
};

export default SkillBadge;
