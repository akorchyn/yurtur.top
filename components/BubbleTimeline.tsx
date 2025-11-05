'use client';

import { useState } from 'react';
import timelineData from '../public/timeline_data.json';

interface TimelineBubbleProps {
    year: string;
    title: string;
    description: string;
    icon: string;
}

function TimelineBubble({ year, title, description, icon }: TimelineBubbleProps) {
    const [isPopped, setIsPopped] = useState(false);

    const scaleClass = isPopped ? 'scale-110' : 'scale-100';
    const bgClass = isPopped ? 'bg-main text-secondary' : 'bg-secondary text-main';
    const tooltipClass = isPopped ? '' : 'hidden';

    return (
        <div
            className={`cursor-pointer transition-all duration-300 ${scaleClass}`}
            onMouseEnter={() => setIsPopped(true)}
            onMouseLeave={() => setIsPopped(false)}
        >
            <div className={`relative w-32 h-32 lg:w-48 lg:h-48 rounded-full flex flex-col items-center justify-center ${bgClass} transition-colors duration-300 shadow-lg`}>
                <div className="text-4xl lg:text-6xl mb-2">{icon}</div>
                <span className="font-bold text-lg">{year}</span>
                <div className={`absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 mt-2 bg-white p-4 rounded-lg shadow-md lg:w-80 w-52 ${tooltipClass} transition-all duration-300`}>
                    <h3 className="font-bold text-main">{title}</h3>
                    <p className="mt-2 text-slate-400 text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
}

interface TimelineData {
    year: string;
    title: string;
    description: string;
    icon: string;
}

export default function BubbleTimeline() {
    return (
        <>
            <h2 className="md:my-10 my-5 font-bold text-main mb-8 text-center lg:text-3xl text-xl">
                Journey
            </h2>
            <div className="flex justify-center items-center relative z-0 lg:gap-20 gap-5 flex-wrap">
                {timelineData.map((data, index) => (
                    <TimelineBubble
                        key={index}
                        year={data.year}
                        title={data.title}
                        description={data.description}
                        icon={data.icon}
                    />
                ))}
            </div>
        </>
    );
}
