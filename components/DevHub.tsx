import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "./animate-ui/components/animate/tabs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function DevHub() {
    const [activeTab, setActiveTab] = useState('near-api-rs');

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="near-api-rs">near-api-rs</TabsTrigger>
                    <TabsTrigger value="nearn">NEARN</TabsTrigger>
                    <TabsTrigger value="race-of-sloths">Race-Of-Sloths</TabsTrigger>
                </TabsList>

                <TabsContents>
                    {/* near-api-rs Tab Content */}
                    <TabsContent value="near-api-rs" className="space-y-3 mt-4">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">near-api-rs</h4>
                            <p className="text-sm text-gray-600">
                                Rust library for NEAR Protocol RPC API interactions. Created from scratch.
                            </p>
                            <div className="flex gap-2 mt-2">
                                <a href="https://crates.io/crates/near-api" target="_blank" rel="noopener noreferrer">
                                    <img src="https://img.shields.io/crates/v/near-api.svg?style=flat-square" alt="Crates.io version" />
                                </a>
                                <a href="https://docs.rs/near-api" target="_blank" rel="noopener noreferrer">
                                    <img src="https://docs.rs/near-api/badge.svg?style=flat-square" alt="Reference Documentation" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Features</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Multiple signing methods (secret key, seed phrase, Ledger)</li>
                                <li>Account key pool to prevent nonce collisions</li>
                                <li>Builder pattern API</li>
                                <li>Tokio async runtime</li>
                                <li>Hardware wallet support</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">NEAR</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Tokio</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Cryptography</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
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
                    <TabsContent value="nearn" className="space-y-3 mt-4">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">NEARN</h4>
                            <p className="text-sm text-gray-600">
                                Gig marketplace for NEAR ecosystem. Core developer.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Built</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Designed and implemented sponsorships</li>
                                <li>Created notification system</li>
                                <li>Implemented milestones support</li>
                                <li>The portal become main tool for hackathons and grants for NEAR Ecosystem</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">NEAR</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">TypeScript</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Next.js</span>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">n8n</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
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
                    <TabsContent value="race-of-sloths" className="space-y-3 mt-4">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Race of Sloths</h4>
                            <p className="text-sm text-gray-600">
                                Gamified open-source contributions. Backend & smart contracts developer.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Backend</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Rust server infrastructure</li>
                                <li>GitHub bot API</li>
                                <li>Scoring and streak tracking</li>
                                <li>Real-time leaderboards</li>
                                <li>Prometheus + Grafana monitoring</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Smart Contracts</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>On-chain scoring</li>
                                <li>Reward distribution</li>
                                <li>Achievement logic</li>
                                <li>Gas optimizations</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">NEAR</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Prometheus</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Grafana</span>
                            </div>
                        </div>

                        <Link className="shrink-0" href="https://race-of-sloths.com/profile/akorchyn" target="_blank">
                            <img
                                src="https://badge.race-of-sloths.com/akorchyn?theme=light"
                                alt="Race of Sloths Badge"
                            />
                        </Link>

                        <div className="flex gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://race-of-sloths.com', '_blank')}
                            >
                                View Live Platform
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://github.com/NEAR-DevHub/race-of-sloths', '_blank')}
                            >
                                GitHub Repository
                            </Button>
                        </div>
                    </TabsContent>
                </TabsContents>
            </Tabs>
        </div>
    )
}
