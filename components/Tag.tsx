interface TagProps {
    text: string;
}

export default function Tag({ text }: TagProps) {
    return (
        <span className="text-main text-xs font-semibold mr-2 p-1 rounded">
            {text}
        </span>
    );
}
