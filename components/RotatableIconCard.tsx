interface RotatableIconCardProps {
    tooltip: string;
    src: string;
    sizeClass: string;
    description: string;
}

export default function RotatableIconCard({ tooltip, src, sizeClass, description }: RotatableIconCardProps) {
    return (
        <div className="flex items-center justify-center">
            <div className={`${sizeClass} group scale:100 hover:scale-110`}>
                <div className="relative h-full w-full rounded-xl shadow-none transition-all transform-all duration-1000 shadow-black/40 group-hover:shadow-xl [transform-style:preserve-3d] group-hover:scale-110 group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0">
                        <img
                            className="h-full w-full rounded-xl object-cover shadow-none [backface-visibility:hidden]"
                            src={src}
                            alt={tooltip}
                        />
                    </div>
                    <div className="absolute inset-0 min-h-full h-fit w-full rounded-xl bg-main/55 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="flex min-h-full flex-col justify-center items-center text-center text-sm lg:text-xl">
                            <h1 className="font-bold text-slate-50 py-1 lg:py-5">
                                {tooltip}
                            </h1>
                            <div className="text-slate-50">{description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
