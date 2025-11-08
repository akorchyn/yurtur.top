import { Badge } from '@/components/ui/badge';

interface TagProps {
    text: string;
    onClick?: (tag: string) => void;
    isSelected?: boolean;
}

export default function Tag({ text, onClick, isSelected }: TagProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick?.(text);
    };

    const baseClasses = "text-xs font-semibold mr-2 transition-all";
    const interactiveClasses = onClick ? "cursor-pointer" : "";
    const selectedClasses = isSelected
        ? "bg-primary text-white hover:bg-primary/90"
        : "text-primary bg-primary/10 hover:bg-primary/20";

    return (
        <Badge
            variant="secondary"
            className={`${baseClasses} ${interactiveClasses} ${selectedClasses}`}
            onClick={onClick ? handleClick : undefined}
        >
            {text}
        </Badge>
    );
}
