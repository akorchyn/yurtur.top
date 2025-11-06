'use client';

import { useState } from 'react';
import timelineData from '../public/timeline_data.json';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/animate-ui/components/radix/hover-card';
import { Card } from '@/components/ui/card';

interface TimelineBubbleProps {
    year: string;
    title: string;
    description: string;
    icon: string;
}

function TimelineBubble({ year, title, description, icon }: TimelineBubbleProps) {
    const [isPopped, setIsPopped] = useState(false);

    const scaleClass = isPopped ? 'scale-110' : 'scale-100';
    const bgClass = isPopped ? 'bg-main text-secondary' : 'bg-white text-main';

    return (
        <HoverCard openDelay={0} closeDelay={100}>
            <HoverCardTrigger asChild>
                <button
                    className={`cursor-pointer transition-all duration-300 ${scaleClass}`}
                    onMouseEnter={() => setIsPopped(true)}
                    onMouseLeave={() => setIsPopped(false)}
                >
                    <Card className={`w-12 h-12 lg:w-12 lg:h-12 rounded-full flex flex-col items-center justify-center ${bgClass} transition-colors duration-300 shadow-sm border border-main/20`}>
                        <div className="text-base lg:text-lg">{icon}</div>
                    </Card>
                </button>
            </HoverCardTrigger>
            <HoverCardContent
                side="bottom"
                align="center"
                sideOffset={8}
            >
                <div className="space-y-1">
                    <div className='flex justify-between text-sm text-main'>
                        <h3 className="font-bold w-full">{title}</h3>
                        <span>{year}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{description}</p>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}

export default function BubbleTimeline() {
    return (
        <div className="flex flex-col items-start lg:items-end gap-2">
            <h3 className="text-sm font-semibold text-main/70">Journey</h3>
            <div className="flex gap-2 lg:gap-3">
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
        </div>
    );
}
