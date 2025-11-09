import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "../../../animate-ui/components/animate/tabs";
import { Button } from "../../../ui/button";
import Link from "next/link";
import { Code2, Briefcase, Trophy, Package } from "lucide-react";

interface RaceOfSlothsStats {
    number_of_sloths: number;
    number_of_repos: number;
    number_of_orgs: number;
    number_of_contributions: number;
    total_rating: number;
    number_of_famed_sloths: number;
}

export default function DevHub() {
    const [activeTab, setActiveTab] = useState('near-api-rs');
    const [slothStats, setSlothStats] = useState<RaceOfSlothsStats | null>(null);
    const [statsLoading, setStatsLoading] = useState(false);

    useEffect(() => {
        if (activeTab === 'race-of-sloths' && !slothStats) {
            setStatsLoading(true);
            fetch('https://api.race-of-sloths.com/info')
                .then(res => res.json())
                .then(data => {
                    setSlothStats(data);
                    setStatsLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch Race of Sloths stats:', err);
                    setStatsLoading(false);
                });
        }
    }, [activeTab, slothStats]);

    return (
        <div className="space-y-4">
            {/* Role Overview Card */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-gray-800">NEAR DevHub Maintainer</h3>
                </div>
                <p className="text-sm text-gray-600">
                    Creator and maintainer of essential Rust tooling for NEAR Protocol ecosystem
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-rows-3 sm:grid-rows-1 min-h-20 sm:min-h-0 grid-cols-1 sm:grid-cols-3 bg-gray-100">
                    <TabsTrigger value="near-api-rs" className="data-[state=active]:bg-white text-xs sm:text-sm">
                        <Package className="w-3 h-3 mr-1 shrink-0" />
                        <span className="truncate">near-api-rs</span>
                    </TabsTrigger>
                    <TabsTrigger value="nearn" className="data-[state=active]:bg-white text-xs sm:text-sm">
                        <Briefcase className="w-3 h-3 mr-1 shrink-0" />
                        <span className="truncate">NEARN</span>
                    </TabsTrigger>
                    <TabsTrigger value="race-of-sloths" className="data-[state=active]:bg-white text-xs sm:text-sm">
                        <Trophy className="w-3 h-3 mr-1 shrink-0" />
                        <span className="truncate">Race-Of-Sloths</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContents>
                    {/* near-api-rs Tab Content */}
                    <TabsContent value="near-api-rs" className="space-y-4 mt-4">
                        {/* Header with badges */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 mb-2">Rust Client Library for NEAR</h4>
                                    <p className="text-sm text-gray-600">
                                        Created from scratch. Full async RPC client with hardware wallet support.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <a href="https://crates.io/crates/near-api" target="_blank" rel="noopener noreferrer">
                                    <img src="https://img.shields.io/crates/v/near-api.svg?style=flat-square" className="rounded-sm" alt="Crates.io version" />
                                </a>
                                <a href="https://docs.rs/near-api" target="_blank" rel="noopener noreferrer">
                                    <img src="https://docs.rs/near-api/badge.svg?style=flat-square" alt="Reference Documentation" className="rounded-sm" />
                                </a>
                            </div>
                        </div>

                        {/* Features - Cards Style */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-3">Architecture & Features</h4>
                            <div className="space-y-2">
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1 p-2 bg-gray-50 rounded border border-gray-200">
                                        <span className="text-xs font-medium text-gray-700">API Design</span>
                                        <p className="text-xs text-gray-600 mt-1">Builder pattern for intuitive chaining</p>
                                    </div>
                                    <div className="flex-1 p-2 bg-gray-50 rounded border border-gray-200">
                                        <span className="text-xs font-medium text-gray-700">Concurrency</span>
                                        <p className="text-xs text-gray-600 mt-1">Account key pool prevents nonce races</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1 p-2 bg-gray-50 rounded border border-gray-200">
                                        <span className="text-xs font-medium text-gray-700">Async Runtime</span>
                                        <p className="text-xs text-gray-600 mt-1">Full Tokio support for high performance</p>
                                    </div>
                                    <div className="flex-1 p-2 bg-gray-50 rounded border border-gray-200">
                                        <span className="text-xs font-medium text-gray-700">Signing</span>
                                        <p className="text-xs text-gray-600 mt-1">Secret key, Ledger wallet, and other</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">NEAR Protocol</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Tokio</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">JSONRPC</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://github.com/near/near-api-rs', '_blank')}
                            >
                                GitHub
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://crates.io/crates/near-api', '_blank')}
                            >
                                Crates.io
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://docs.rs/near-api', '_blank')}
                            >
                                Docs
                            </Button>
                        </div>
                    </TabsContent>

                    {/* NEARN Tab Content */}
                    <TabsContent value="nearn" className="space-y-4 mt-4">
                        {/* Header */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-2">Gig Marketplace Platform</h4>
                            <p className="text-sm text-gray-600">
                                Core developer. Built the foundation for NEAR ecosystem's talent platform.
                            </p>
                            <div className="mt-3">
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
                                    Main tool for hackathons & grants
                                </span>
                            </div>
                        </div>

                        {/* What I Built - Compact Grid */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-3">Core Contributions</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">▸</span>
                                    <span>Sponsorship listing type</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">▸</span>
                                    <span>Notification system</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">▸</span>
                                    <span>Milestone tracking</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">▸</span>
                                    <span>Automation pipelines</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">▸</span>
                                    <span>Payment workflows</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">▸</span>
                                    <span>API integrations</span>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">NEAR</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">TypeScript</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Next.js</span>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">n8n</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://nearn.io', '_blank')}
                            >
                                Visit Platform
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://learnnear.club/nearn-the-near-talent-platform/', '_blank')}
                            >
                                Platform Details
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Race of Sloths Tab Content */}
                    <TabsContent value="race-of-sloths" className="space-y-4 mt-4">
                        {/* Header */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-2">Gamified Open-Source Platform</h4>
                            <p className="text-sm text-gray-600">
                                Backend architect & smart contracts developer. Turning commits into competitions.
                            </p>
                            <div className="mt-3 inline-block">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200">
                                    🏆 Live & Active Platform
                                </span>
                            </div>
                        </div>

                        {/* Architecture - Creative Layout */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
                                Platform Architecture
                                {slothStats && (
                                    <span className="text-xs font-normal text-green-600 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                        Live Data
                                    </span>
                                )}
                            </h4>

                            {/* Backend Systems - Card Style */}
                            <div className="space-y-3">
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                                            <span className="text-xs font-bold text-orange-700">BE</span>
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-sm font-medium text-gray-700 mb-1">Backend Infrastructure</h5>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-600">
                                                <div>▸ Rust server core</div>
                                                <div>▸ GitHub bot automation</div>
                                                <div>▸ Real-time leaderboards</div>
                                                <div>▸ Prometheus metrics</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                                            <span className="text-xs font-bold text-purple-700">SC</span>
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-sm font-medium text-gray-700 mb-1">Smart Contract Layer</h5>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-600">
                                                <div>▸ On-chain scoring</div>
                                                <div>▸ Streak calculation</div>
                                                <div>▸ Open data</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Key Features - Mini Cards with Live Stats */}
                                <div className="grid grid-cols-3 gap-2 mt-3">
                                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                                        <div className="text-lg font-bold text-gray-700">
                                            {statsLoading ? (
                                                <span className="text-sm">...</span>
                                            ) : (
                                                slothStats ? slothStats.number_of_sloths : '96'
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">Active Sloths</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                                        <div className="text-lg font-bold text-gray-700">
                                            {statsLoading ? (
                                                <span className="text-sm">...</span>
                                            ) : (
                                                slothStats ? slothStats.number_of_repos : '212'
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">Repositories</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                                        <div className="text-lg font-bold text-gray-700">
                                            {statsLoading ? (
                                                <span className="text-sm">...</span>
                                            ) : (
                                                slothStats ? slothStats.number_of_contributions.toLocaleString() : '1,679'
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">Contributions</div>
                                    </div>
                                </div>

                                {/* Additional Live Stats Row */}
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                                        <div className="text-lg font-bold text-gray-700">
                                            {statsLoading ? (
                                                <span className="text-sm">...</span>
                                            ) : (
                                                slothStats ? slothStats.number_of_orgs : '61'
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">Organizations</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                                        <div className="text-lg font-bold text-gray-700">
                                            {statsLoading ? (
                                                <span className="text-sm">...</span>
                                            ) : (
                                                slothStats ? Math.floor(slothStats.total_rating / 1000).toLocaleString() + 'k' : '112k'
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">Total Rating</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-200 text-center">
                                        <div className="text-lg font-bold text-gray-700">
                                            {statsLoading ? (
                                                <span className="text-sm">...</span>
                                            ) : (
                                                slothStats ? slothStats.number_of_famed_sloths : '15'
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">Hall of Fame</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Users Stats Badge */}
                        <Link className="shrink-0 inline-block" href="https://race-of-sloths.com/profile/akorchyn" target="_blank">
                            <img
                                src="https://badge.race-of-sloths.com/akorchyn?type=bot&theme=light"
                                alt="Race of Sloths Badge"
                                className="hover:opacity-90 transition-opacity border-gray-200"
                            />
                        </Link>

                        {/* Tech Stack */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">NEAR</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Prometheus</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Grafana</span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">GitHub API</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://race-of-sloths.com', '_blank')}
                            >
                                Live Platform
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://github.com/NEAR-DevHub/race-of-sloths', '_blank')}
                            >
                                GitHub
                            </Button>
                        </div>
                    </TabsContent>
                </TabsContents>
            </Tabs>
        </div>
    )
}
