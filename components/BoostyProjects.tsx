import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "./animate-ui/components/animate/tabs";
import { Button } from "./ui/button";

export default function BoostyProjects() {
    const [activeTab, setActiveTab] = useState('tricorn');

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tricorn">Tricorn Bridge</TabsTrigger>
                    <TabsTrigger value="ultimate-division">Ultimate Division</TabsTrigger>
                </TabsList>

                <TabsContents>
                    {/* Tricorn Tab Content */}
                    <TabsContent value="tricorn" className="space-y-3 mt-4">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Cross-Chain Bridge</h4>
                            <p className="text-sm text-gray-600">
                                Cross-chain bridge for EVM and non-EVM blockchains. Contract via BoostyLabs.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Built</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Rust-based tooling for bridge deployment</li>
                                <li>Casper Network smart contracts</li>
                                <li>Cross-chain interactions (Ethereum, Casper, Avalanche)</li>
                                <li>Audited by Hallborn</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Casper</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Ethereum</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">Solidity</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://tricorn.network/', '_blank')}
                            >
                                View Project
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Ultimate Division Tab Content */}
                    <TabsContent value="ultimate-division" className="space-y-3 mt-4">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">NFT Football Game</h4>
                            <p className="text-sm text-gray-600">
                                First football metaverse game on blockchain. Contract via BoostyLabs.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Built</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Token contracts for Casper blockchain</li>
                                <li>NFT contracts for player cards</li>
                                <li>NFT marketplace contract design</li>
                                <li>Backend-generated signatures for minting</li>
                                <li>Passed Casper Network audit</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Casper</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">NFT</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">ERC20</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://ultimatedivision.com', '_blank')}
                            >
                                View Project
                            </Button>
                        </div>
                    </TabsContent>
                </TabsContents>
            </Tabs>
        </div>
    )
}