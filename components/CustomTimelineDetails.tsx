'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/animate-ui/components/radix/tabs';
import Tag from './Tag';

// Example custom detail renderer for a specific timeline entry
// This shows a completely different experience when the card is expanded
export function CustomProjectDetail({
    element,
    onTagClick,
    selectedTags
}: {
    element: any; // Use your TimelineType here
    onTagClick?: (tag: string) => void;
    selectedTags?: Set<string>;
}) {
    const [activeTab, setActiveTab] = useState('overview');

    const tags = element.tags
        ?.split(/\s+/)
        .filter((tag: string) => tag)
        .sort()
        .map((tag: string, index: number) => (
            <Tag
                key={index}
                text={tag}
                onClick={onTagClick}
                isSelected={selectedTags?.has(tag)}
            />
        ));

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-3 mt-4">
                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Project Description</h4>
                        <p className="text-sm text-gray-600">{element.description}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Role & Responsibilities</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Led development of core features</li>
                            <li>Architected scalable solutions</li>
                            <li>Mentored junior developers</li>
                        </ul>
                    </div>
                </TabsContent>

                <TabsContent value="tech" className="space-y-3 mt-4">
                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-1">
                            {tags}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Architecture</h4>
                        <p className="text-sm text-gray-600">
                            Microservices architecture with React frontend and Node.js backend
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-3 mt-4">
                    <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Achievements</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Improved performance by 40%</li>
                            <li>Reduced deployment time by 60%</li>
                            <li>Increased test coverage to 85%</li>
                        </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(element.website, '_blank')}
                        >
                            View Project
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(element.url, '_blank')}
                        >
                            More Details
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

// Another example: Gallery view for portfolio items
export function GalleryDetailView({
    element,
    onTagClick,
    selectedTags
}: {
    element: any;
    onTagClick?: (tag: string) => void;
    selectedTags?: Set<string>;
}) {
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock gallery images - in real use, these would come from your data
    const galleryImages = [
        element.image_url,
        element.image_url,
        element.image_url,
    ];

    return (
        <div className="space-y-4">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                    src={galleryImages[selectedImage]}
                    alt="Project screenshot"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex gap-2 overflow-x-auto">
                {galleryImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`shrink-0 w-20 h-20 rounded overflow-hidden border-2 ${selectedImage === idx ? 'border-primary' : 'border-gray-200'
                            }`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            <div className="prose prose-sm">
                <h4>About this project</h4>
                <p>{element.description}</p>

                <div className="not-prose flex flex-wrap gap-1 mt-3">
                    {element.tags?.split(/\s+/).filter(Boolean).map((tag: string, idx: number) => (
                        <Tag
                            key={idx}
                            text={tag}
                            onClick={onTagClick}
                            isSelected={selectedTags?.has(tag)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Interactive timeline detail with animations
export function InteractiveTimelineDetail({
    element
}: {
    element: any;
}) {
    const [expanded, setExpanded] = useState<string | null>(null);

    const milestones = [
        { date: 'Q1 2023', title: 'Project Kickoff', description: 'Initial planning and setup' },
        { date: 'Q2 2023', title: 'MVP Release', description: 'First working prototype' },
        { date: 'Q3 2023', title: 'Beta Launch', description: 'Public beta testing phase' },
        { date: 'Q4 2023', title: 'Production', description: 'Full production release' },
    ];

    return (
        <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{element.position}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{element.description}</p>
            </div>

            <div className="space-y-2">
                <h4 className="font-semibold text-sm">Project Timeline</h4>
                <div className="relative border-l-2 border-gray-300 ml-2 space-y-4">
                    {milestones.map((milestone, idx) => (
                        <div key={idx} className="relative pl-6">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full" />
                            <button
                                onClick={() => setExpanded(expanded === milestone.date ? null : milestone.date)}
                                className="text-left w-full group"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs text-gray-500">{milestone.date}</p>
                                        <p className="font-medium text-sm group-hover:text-primary transition-colors">
                                            {milestone.title}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {expanded === milestone.date ? '−' : '+'}
                                    </span>
                                </div>
                                {expanded === milestone.date && (
                                    <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-2">
                <Button size="sm" variant="default">
                    View Full Case Study
                </Button>
                <Button size="sm" variant="outline">
                    Download PDF
                </Button>
            </div>
        </div>
    );
}
