import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "./animate-ui/components/animate/tabs";
import { Button } from "./ui/button";
import { Vote, Shield, Cpu } from "lucide-react";

export default function NDC() {
    const [activeTab, setActiveTab] = useState('voting-mechanism');

    return (
        <div className="space-y-4">
            {/* Role Overview Card */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                    <Vote className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-gray-800">NDC Operations Team</h3>
                </div>
                <p className="text-sm text-gray-600">
                    Building privacy-preserving governance infrastructure for NEAR ecosystem
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                    <TabsTrigger value="voting-mechanism" className="data-[state=active]:bg-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Private Voting
                    </TabsTrigger>
                    <TabsTrigger value="zk-research" className="data-[state=active]:bg-white">
                        <Cpu className="w-3 h-3 mr-1" />
                        ZK Research
                    </TabsTrigger>
                </TabsList>

                <TabsContents>
                    {/* Private Voting Mechanism Tab */}
                    <TabsContent value="voting-mechanism" className="space-y-4 mt-4">
                        {/* Header */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-2">Privacy-Preserving Governance</h4>
                            <p className="text-sm text-gray-600">
                                Stake-weighted voting with complete anonymity. Cross-chain privacy via Secret Network.
                            </p>
                        </div>

                        {/* Architecture - Two Column Layout */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-3">System Architecture</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Privacy Layer</h5>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <div>• Secret Network integration</div>
                                        <div>• End-to-end encryption</div>
                                        <div>• Voter anonymity relayer</div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Voting Engine</h5>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <div>• On-chain snapshots</div>
                                        <div>• Stake-weight calculations</div>
                                        <div>• NEAR encrypted contracts</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">NEAR</span>
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">Secret Network</span>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">CosmWasm</span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://github.com/near-ndc/voting-v2', '_blank')}
                            >
                                View Code
                            </Button>
                        </div>
                    </TabsContent>

                    {/* ZK Research Tab */}
                    <TabsContent value="zk-research" className="space-y-4 mt-4">
                        {/* Header */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-2">Zero-Knowledge Reputation System</h4>
                            <p className="text-sm text-gray-600">
                                Experimental POC. Prove ed25519 key ownership and reputation without disclosure.
                            </p>
                        </div>

                        {/* Implementation - Flow Diagram Style */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-3">Proof Pipeline</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700">1</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-700">Identity Proof</div>
                                        <div className="text-xs text-gray-600">Plonky2 ed25519 ownership + Merkle tree membership</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700">2</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-700">Proof Conversion</div>
                                        <div className="text-xs text-gray-600">Gnark verifier → Groth16 for efficiency</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-700">3</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-700">On-chain Verification</div>
                                        <div className="text-xs text-gray-600">NEAR precompile integration for gas optimization</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="text-sm text-gray-500 italic">
                            POC completed. NDC was sunset June 2024.
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">Plonky2</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Gnark</span>
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">Groth16</span>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Go</span>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://github.com/akorchyn/near-zk-reputation-poc', '_blank')}
                            >
                                View POC Repository
                            </Button>
                        </div>
                    </TabsContent>
                </TabsContents>
            </Tabs>
        </div>
    )
}
