import { Button } from "../../../ui/button";
import { FileText, Github, Link2 } from "lucide-react";

export default function GGx() {
    const achievements = [
        {
            icon: <FileText className="w-4 h-4" />,
            title: "Whitepaper Co-author",
            description: "Co-authored core platform document",
            link: "https://web.archive.org/web/20240112193923/https://ggxchain.io/wp-content/uploads/2023/10/GGx-Whitepaper.pdf"
        },
        {
            icon: <Github className="w-4 h-4" />,
            title: "Substrate Chain",
            description: "Built blockchain from scratch",
            link: "https://github.com/ggxchain/ggxnode"
        },
        {
            icon: <Link2 className="w-4 h-4" />,
            title: "Ethereum Relayer",
            description: "Cross-chain interoperability",
            link: "https://github.com/ggxchain/transaction-receipt-relayer"
        }
    ];

    return (
        <div className="space-y-4">
            {/* Main Description */}
            <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Protocol Engineer</h4>
                <p className="text-sm text-gray-600">
                    Interchain Infrastructure Protocol with IBC, Schnorr signatures, and ZK Rollups.
                </p>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {achievements.map((achievement, index) => (
                    <a
                        key={index}
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer block"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="text-gray-600">{achievement.icon}</div>
                            <h5 className="font-medium text-xs text-gray-800">{achievement.title}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                    </a>
                ))}
            </div>

            {/* Technical Contributions */}
            <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Technical Contributions</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Built Ethereum light client on Substrate with block receipt merkle proof validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Developed custom Substrate pallets including validator rewards system</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Implemented non-recursive Merkle proof system for enhanced security</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Assisted with IBC integration and ZK precompile reviews</span>
                    </li>
                </ul>
            </div>

            {/* Tech Stack */}
            <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Substrate</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">IBC</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">Ethereum</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">ZK-SNARKs</span>
                </div>
            </div>

            {/* Status Note */}
            <div className="text-sm text-gray-500 italic">
                Project concluded in 2024
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2 pt-2">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('https://web.archive.org/web/20240112193923/https://ggxchain.io/wp-content/uploads/2023/10/GGx-Whitepaper.pdf', '_blank')}
                >
                    <FileText className="w-3 h-3 mr-1" />
                    Whitepaper
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('https://github.com/ggxchain/ggxnode', '_blank')}
                >
                    <Github className="w-3 h-3 mr-1" />
                    Node Repository
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('https://github.com/ggxchain/transaction-receipt-relayer', '_blank')}
                >
                    <Link2 className="w-3 h-3 mr-1" />
                    Relayer Code
                </Button>
            </div>
        </div>
    )
}
