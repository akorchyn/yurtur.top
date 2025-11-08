'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Tag from './Tag';

// This is an example custom card component that can be used for special entries
// You can create different variations of this for different IDs

interface CustomTimelineCardProps {
    id: string;
    position: string;
    timeline: string;
    description: string;
    url: string;
    website: string;
    image_url: string;
    type: string;
    company?: string;
    via?: string;
    tags?: string;
    onTagClick?: (tag: string) => void;
    selectedTags?: Set<string>;
}

export default function CustomTimelineCard({
    id,
    position,
    timeline,
    description,
    website,
    image_url,
    type,
    company,
    via,
    tags: tagsString = '',
    onTagClick,
    selectedTags,
}: CustomTimelineCardProps) {
    const tags = tagsString
        .split(/\s+/)
        .filter(tag => tag)
        .sort()
        .map((tag, index) => (
            <Tag
                key={index}
                text={tag}
                onClick={onTagClick}
                isSelected={selectedTags?.has(tag)}
            />
        ));

    const suffix = (() => {
        if (company && via) {
            return `at ${company} via ${via}`;
        } else if (company) {
            return `at ${company}`;
        } else if (via) {
            return `via ${via}`;
        }
        return '';
    })();

    const header = `${position} ${suffix}`;

    // Example of a custom card design with different styling
    return (
        <Card
            id={id}
            className="relative z-10 w-[calc(100%-2rem)] max-w-xl transition-all duration-300
                       bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800
                       border-2 border-indigo-200 dark:border-indigo-800
                       hover:shadow-2xl hover:scale-105"
        >
            <CardHeader>
                <div className="flex items-center justify-between text-xs mb-2">
                    <div className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        {type}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">
                        {timeline}
                    </span>
                </div>
                <CardTitle className="text-lg text-gray-800 dark:text-gray-200">
                    {header}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex items-start gap-4 mb-4">
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 transform transition-transform hover:scale-110"
                    >
                        <div className="relative">
                            <img
                                src={image_url}
                                alt="Company logo"
                                className="w-16 h-16 object-contain rounded-lg shadow-md"
                            />
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-indigo-600/20 to-transparent pointer-events-none" />
                        </div>
                    </a>
                    <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                            {description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>🎯 Featured Position</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-900">
                    {tags}
                </div>
            </CardContent>
        </Card>
    );
}

// Alternative minimalist card design
export function MinimalTimelineCard({
    id,
    position,
    timeline,
    description,
    website,
    image_url,
    type,
    company,
    tags: tagsString = '',
    onTagClick,
    selectedTags,
}: CustomTimelineCardProps) {
    const tags = tagsString
        .split(/\s+/)
        .filter(tag => tag)
        .sort()
        .map((tag, index) => (
            <Tag
                key={index}
                text={tag}
                onClick={onTagClick}
                isSelected={selectedTags?.has(tag)}
            />
        ));

    return (
        <Card
            id={id}
            className="relative z-10 w-[calc(100%-2rem)] max-w-xl transition-all duration-300
                       border-l-4 border-l-green-500 hover:shadow-lg"
        >
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={image_url}
                            alt="Logo"
                            className="w-8 h-8 object-contain rounded"
                        />
                        <div>
                            <h3 className="font-semibold text-sm">{position}</h3>
                            {company && (
                                <p className="text-xs text-gray-500">@{company}</p>
                            )}
                        </div>
                    </div>
                    <span className="text-xs text-gray-400">{timeline}</span>
                </div>
            </CardHeader>
            <CardContent className="pt-2">
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <div className="flex flex-wrap gap-1">{tags}</div>
            </CardContent>
        </Card>
    );
}