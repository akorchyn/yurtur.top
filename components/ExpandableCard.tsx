'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Tag from './Tag';

interface ExpandableCardProps {
    id: string;
    type_: string;
    rightTop: string;
    header: string;
    companyImage: string;
    companyUrl: string;
    position: string;
    description: string;
    tags: string;
    markdownDetails: string;
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
    position,
    description,
    tags: tagsString,
    markdownDetails,
}: ExpandableCardProps) {
    const [visible, setVisible] = useState<boolean | null>(null);
    const [isInited, setIsInited] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const tags = tagsString
        .split(/\s+/)
        .filter(tag => tag)
        .sort()
        .map((tag, index) => <Tag key={index} text={tag} />);

    useEffect(() => {
        if (!isInited) {
            setIsInited(true);
            return;
        }

        if (visible === false) {
            const element = document.getElementById(id);
            if (element && window) {
                const rect = element.getBoundingClientRect();
                const innerHeight = window.innerHeight;

                if (!isCardVisible(rect, innerHeight)) {
                    const scrollY = window.scrollY;
                    const y = rect.top + scrollY - 100;
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth',
                    });
                }
            }
        }
    }, [visible, id, isInited]);

    const visibleValue = visible ?? false;

    const renderPart = visibleValue ? (
        <div
            className="prose prose-sm prose-slate prose-a:text-main prose-headings:text-sm prose-headings:font-bold prose-headings:text-slate-500 py-2"
            onClick={(e) => e.stopPropagation()}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownDetails}
            </ReactMarkdown>
        </div>
    ) : (
        <>
            <div className="flex items-center gap-4 mb-3">
                <a
                    href={companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
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
    );

    const readLessOrMore = visibleValue ? 'Read less' : 'Read more';
    const scaleClass = visibleValue
        ? 'shadow-lg scale-100'
        : 'shadow-none hover:shadow-lg scale-90';

    return (
        <div
            id={id}
            ref={cardRef}
            className={`relative z-10 w-[calc(100%-2rem)] max-w-xl group bg-white p-4 shadow-black/30 rounded border transition-all duration-1000 transform ease-in-out ${scaleClass}`}
        >
            <div className="flex items-center justify-between text-xs text-main mb-2">
                <div>{type_}</div>
                <time>{rightTop}</time>
            </div>

            <div className="font-semibold text-sm mb-3 text-slate-500">
                {header}
            </div>

            <div className="text-slate-600 text-sm mb-3">
                {renderPart}
            </div>

            <div
                className="flex justify-end text-sm text-main group-hover:underline cursor-pointer"
                onClick={() => setVisible(!visibleValue)}
            >
                {readLessOrMore}
            </div>
        </div>
    );
}
