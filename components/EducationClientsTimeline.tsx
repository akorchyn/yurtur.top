'use client';

import { useState } from 'react';
import ExpandableCard from './ExpandableCard';

interface TimelineType {
    id: string;
    position: string;
    timeline: string;
    description: string;
    url: string;
    website: string;
    image_url: string;
    type: string;
    is_education: boolean;
    company?: string;
    via?: string;
    tags?: string;
    ended_year?: number;
}

interface EducationClientsTimelineProps {
    data: TimelineType[];
}

export default function EducationClientsTimeline({ data }: EducationClientsTimelineProps) {
    const [contentState, setContentState] = useState<Record<string, string | null>>({});

    const loadContent = async (key: string, url: string) => {
        if (contentState[key] !== undefined) {
            return;
        }

        setContentState(prev => ({ ...prev, [key]: null }));

        try {
            const response = await fetch(url);
            const content = await response.text();
            setContentState(prev => ({ ...prev, [key]: content }));
        } catch (err) {
            setContentState(prev => ({ ...prev, [key]: `Error: ${err}` }));
        }
    };

    const elements = data.map((element) => {
        const suffix = (() => {
            if (element.company && element.via) {
                return `at ${element.company} via ${element.via}`;
            } else if (element.company) {
                return `at ${element.company}`;
            } else if (element.via) {
                return `via ${element.via}`;
            }
            return '';
        })();

        const name = `${element.position} ${suffix}`;
        const reverse = element.is_education ? 'lg:flex-row-reverse' : '';
        const line = element.is_education ? 'right-[10%] left-1/2' : 'left-[10%] right-1/2';
        const label = element.is_education ? 'left-5' : 'right-5';

        return (
            <div
                key={element.id}
                className={`relative flex ${reverse}`}
                onMouseEnter={() => loadContent(element.id, element.url)}
            >
                <div>
                    <ExpandableCard
                        id={element.id}
                        type_={element.type}
                        rightTop={element.timeline}
                        header={name}
                        description={element.description}
                        companyImage={element.image_url}
                        companyUrl={element.website}
                        position={element.position}
                        markdownDetails={contentState[element.id] ?? 'Loading'}
                        tags={element.tags ?? ''}
                    />

                    <div className={`lg:block hidden absolute top-[10%] border-main border-b-4 border-dotted z-0 mx-auto h-0.5 ${line}`}>
                        <p className={`lg:block hidden absolute -top-8 transform bg-main text-white px-2 ${label}`}>
                            {element.ended_year?.toString() ?? 'Present'}
                        </p>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="mb-32 mt-5 m-5 lg:m-10 lg:mt-32 lg:mb-32">
            <h1 className="lg:text-3xl text-xl font-bold text-center text-main">
                Experience timeline
            </h1>
            <div className="text-2xl font-semibold text-main justify-around hidden lg:flex">
                <div>Work Experience</div>
                <div>Education</div>
            </div>
            <div className="mt-5 lg:mt-10 space-y-4 relative flex flex-col before:absolute before:inset-0 before:ml-5 before:-translate-x-px lg:before:mx-auto lg:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-main before:to-transparent">
                {elements}
            </div>
        </div>
    );
}
