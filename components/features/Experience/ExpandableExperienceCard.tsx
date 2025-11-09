'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Tag from '../../Tag';
import 'highlight.js/styles/github-dark.css';
import { cn } from '@/lib/utils';

interface ExpandableCardProps {
    id: string;
    type_: string;
    rightTop: string;
    header: string;
    companyImage: string;
    companyUrl: string;
    position: string;
    description: string;
    url: string,
    tags: string;
    onTagClick?: (tag: string) => void;
    selectedTags?: Set<string>;
    customDetailContent?: React.ReactNode;
}

function isCardVisible(rect: DOMRect, innerHeight: number): boolean {
    const top = rect.top;
    const bottom = rect.bottom;
    return top > 0 && bottom < innerHeight;
}

export default function ExpandableCard({
    id,
    type_,
    rightTop,
    header,
    companyImage,
    companyUrl,
    description,
    url,
    tags: tagsString,
    onTagClick,
    selectedTags,
    customDetailContent,
}: ExpandableCardProps) {
    const [open, setOpen] = useState(false);
    const [markdownDetails, setMarkdownDetails] = useState<string | null>(null);

    const loadContent = async () => {
        const response = await fetch(url);
        const content = await response.text();

        setMarkdownDetails(content);
    };

    useEffect(() => {
        // Only load markdown content if there's no custom detail content
        if (!customDetailContent) {
            loadContent()
        }
    }, [customDetailContent])

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
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <Card
                    id={id}
                    className={`relative z-10 w-[calc(100%-2rem)] max-w-xl group transition-all duration-1000 transform ease-in-out cursor-pointer`}
                >
                    <CardHeader>
                        <div className="flex items-center justify-between text-xs text-primary mb-2">
                            <div>{type_}</div>
                            <span>{rightTop}</span>
                        </div>
                        <CardTitle className="text-sm text-slate-500">
                            {header}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="text-slate-600 text-sm">
                        {!open && (
                            <>
                                <div className="flex items-center gap-4 mb-3">
                                    <a
                                        href={companyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <img
                                            src={companyImage}
                                            alt="Company logo"
                                            className="w-12 h-12 object-contain rounded-full"
                                        />
                                    </a>
                                    <div className="text-slate-700 font-medium">
                                        {description}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2 text-[0.5rem]">
                                    {tags}
                                </div>
                            </>
                        )}

                        <CollapsibleContent
                            className={cn("text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2")}
                        >
                            {customDetailContent ? (
                                <div className="py-2" onClick={(e) => e.stopPropagation()}>
                                    {customDetailContent}
                                </div>
                            ) : (
                                <div
                                    className="prose prose-sm prose-slate prose-a:text-primary prose-headings:text-sm prose-headings:font-bold prose-headings:text-slate-500 prose-code:text-xs prose-pre:text-xs py-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                    >
                                        {markdownDetails}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </CollapsibleContent>
                    </CardContent>

                    <CardFooter className="flex justify-end pt-0">
                        <Button
                            variant="link"
                            className="text-primary hover:underline p-0 h-auto"
                        >
                            {open ? 'Read less' : 'Read more'}
                        </Button>
                    </CardFooter>
                </Card>
            </CollapsibleTrigger>
        </Collapsible>
    );
}
