import { Card } from '@/components/ui/card';

interface Language {
    name: string;
    flag: string;
    level: string;
}

const languages: Language[] = [
    {
        name: 'Ukrainian',
        flag: '🇺🇦',
        level: 'Native'
    },
    {
        name: 'English',
        flag: '🇬🇧',
        level: 'Fluent'
    }
];

export default function Languages() {
    return (
        <div className="flex flex-col items-start lg:items-end gap-2">
            <h3 className="text-sm font-semibold text-primary/70">Languages</h3>
            <div className="flex gap-2 lg:gap-3">
                {languages.map((lang, index) => (
                    <Card
                        key={index}
                        className="px-3 py-1.5 bg-white text-primary border border-primary/20 shadow-sm hover:scale-105 transition-all duration-300"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{lang.flag}</span>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">{lang.name}</span>
                                <span className="text-xs text-primary/60">{lang.level}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}