import { Card } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/animate-ui/components/radix/hover-card';

interface RotatableIconCardProps {
    tooltip: string;
    src: string;
    sizeClass: string;
    description: string;
}

export default function RotatableIconCard({ tooltip, src, sizeClass, description }: RotatableIconCardProps) {
    return (
        <div className="flex items-center justify-center">
            <HoverCard openDelay={0} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <div className={`${sizeClass}`}>
                        <Card className="relative h-full w-full border-none shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer">
                            <img
                                className="h-full w-full object-cover"
                                src={src}
                                alt={tooltip}
                            />
                        </Card>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent
                    className="w-72 lg:w-80"
                    side="top"
                    align="center"
                    sideOffset={10}
                >
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg text-primary">
                            {tooltip}
                        </h3>
                        <p className="text-sm text-slate-600">
                            {description}
                        </p>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}
