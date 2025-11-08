'use client';

import { useState } from 'react';
import ExpandableCard from './ExpandableCard';
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from './animate-ui/components/radix/tabs';
import DevHub from './DevHub';
import NDC from './NDC';
import BoostyProjects from './BoostyProjects';
import GGx from './GGx';

export interface TimelineType {
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
    started_year: number;
    ended_year?: number;
}

export interface CardProps {
    element: TimelineType,
    onTagClick: (tag: string) => void;
    selectedTags: Set<string>;
}

type CustomDetailRenderer = (
    element: TimelineType,
    defaultProps: {
        onTagClick: (tag: string) => void;
        selectedTags: Set<string>;
    }
) => React.ReactNode;

const customDetailRenderers: Record<string, CustomDetailRenderer> = {
    'devhub': (element: TimelineType, defaultProps: {
        onTagClick: (tag: string) => void;
        selectedTags: Set<string>;
    }) => <DevHub element={element} {...defaultProps} />,
    'ndc': (element: TimelineType, defaultProps: {
        onTagClick: (tag: string) => void;
        selectedTags: Set<string>;
    }) => <NDC />,
    'boosty': (element: TimelineType, defaultProps: {
        onTagClick: (tag: string) => void;
        selectedTags: Set<string>;
    }) => <BoostyProjects />,
    'ggx': (element: TimelineType, defaultProps: {
        onTagClick: (tag: string) => void;
        selectedTags: Set<string>;
    }) => <GGx />,
};

interface EducationClientsTimelineProps {
    data: TimelineType[];
}

export default function EducationClientsTimeline({ data, }: EducationClientsTimelineProps) {
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => {
            const newSet = new Set(prev);
            if (newSet.has(tag)) {
                newSet.delete(tag);
            } else {
                newSet.add(tag);
            }
            return newSet;
        });
    };

    const filteredData = selectedTags.size === 0
        ? data
        : data.filter(element => {
            if (!element.tags) return false;
            const elementTags = element.tags.split(/\s+/).filter(tag => tag);
            return elementTags.some(tag => selectedTags.has(tag));
        });

    const careerData = filteredData.filter(item => !item.is_education);
    const educationData = filteredData.filter(item => item.is_education);

    const renderTimelineItem = (element: TimelineType) => {
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

        // Check if there's a custom detail renderer for this ID
        const customDetailContent = customDetailRenderers && customDetailRenderers[element.id]
            ? customDetailRenderers[element.id](element, {
                onTagClick: toggleTag,
                selectedTags: selectedTags,
            })
            : undefined;

        return (
            <ExpandableCard
                key={element.id}
                id={element.id}
                type_={element.type}
                rightTop={element.timeline}
                header={name}
                description={element.description}
                companyImage={element.image_url}
                companyUrl={element.website}
                position={element.position}
                tags={element.tags ?? ''}
                url={element.url}
                onTagClick={toggleTag}
                selectedTags={selectedTags}
                customDetailContent={customDetailContent}
            />
        );
    };

    return (
        <div className="mb-32 mt-5 m-5 lg:m-10 lg:mt-32 lg:mb-32">
            <Tabs defaultValue="career">
                <TabsList className='bg-primary'>
                    <TabsTrigger value="career" className='text-white'>Career</TabsTrigger>
                    <TabsTrigger value="education" className='text-white'>Education</TabsTrigger>
                </TabsList>
                <TabsContents>
                    <TabsContent value="career" className='grid grid-cols-1 gap-y-5 md:grid-cols-2 '>
                        {careerData.map(renderTimelineItem)}
                    </TabsContent>
                    <TabsContent value="education" className='grid grid-cols-1 gap-y-5 md:grid-cols-2'>
                        {educationData.map(renderTimelineItem)}
                    </TabsContent>
                </TabsContents>
            </Tabs>
        </div>
    );
}
