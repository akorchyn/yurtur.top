import technologiesData from '../public/technologies.json';
import { Card } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/animate-ui/components/radix/hover-card';

interface TechnologyIconProps {
    title: string;
    src: string;
    description: string;
}

export function TechnologyIcon({ title, src, description }: TechnologyIconProps) {
    return (
        <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger>
                <button className="group cursor-pointer">
                    <Card className="bg-transparent w-8 h-8 p-1 lg:w-12 lg:h-12 border-none shadow-none  hover:scale-110 transition-all duration-300 overflow-hidden">
                        <img
                            className="h-full w-full object-contain rounded-xl"
                            src={src}
                            alt={title}
                        />
                    </Card>
                </button>
            </HoverCardTrigger>
            <HoverCardContent
                className="md:w-80 max-w-[90vw]"
                side="bottom"
                align="center"
                sideOffset={10}
            >
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={src}
                            alt={title}
                            className="w-8 h-8 md:w-12 md:h-12 object-contain rounded-xl"
                        />
                        <h3 className="font-bold text-base md:text-lg text-main">
                            {title}
                        </h3>
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        {description}
                    </p>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}

interface UsedTechnologies {
    title: string;
    src: string;
    description: string;
}

export default function Technologies() {
    return (
        <div className="mt-4">
            <div className="flex items-center gap-3 lg:gap-4">
                {technologiesData.map((obj: UsedTechnologies, index) => (
                    <TechnologyIcon
                        key={index}
                        title={obj.title}
                        src={obj.src}
                        description={obj.description}
                    />
                ))}
            </div>
        </div>
    );
}
