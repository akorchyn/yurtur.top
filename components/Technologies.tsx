import RotatableIconCard from './RotatableIconCard';
import technologiesData from '../public/technologies.json';

interface UsedTechnologies {
    title: string;
    src: string;
    description: string;
}

export default function Technologies() {
    return (
        <div>
            <h1 className="font-bold md:my-10 my-5 text-xl lg:text-4xl text-center p-2 lg:p-8">
                Technologies
            </h1>
            <div className="flex justify-evenly lg:items-center flex-wrap space-x-4">
                {technologiesData.map((obj, index) => (
                    <RotatableIconCard
                        key={index}
                        tooltip={obj.title}
                        src={obj.src}
                        sizeClass="w-24 h-24 lg:w-48 lg:h-48"
                        description={obj.description}
                    />
                ))}
            </div>
        </div>
    );
}
