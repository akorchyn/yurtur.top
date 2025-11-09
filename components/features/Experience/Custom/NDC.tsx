import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "../../../animate-ui/components/animate/tabs";
import { Button } from "../../../ui/button";
import { Vote, Shield, Lock, Cpu, Zap, FlaskConical } from "lucide-react";

export default function NDC() {
    const [activeTab, setActiveTab] = useState('voting-mechanism');

    return (
        <div className="space-y-4">
            {/* Role Overview Card */}
            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-center gap-2 mb-2">
                    <Vote className="w-5 h-5 text-indigo-600" />
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
                        <div className="bg-violet-50 rounded-lg p-4 border border-violet-200">
                            <h4 className="font-bold text-gray-800 mb-2">Privacy-Preserving Governance</h4>
                            <p className="text-sm text-gray-600">
                                Stake-weighted voting with complete anonymity. Cross-chain privacy via Secret Network.
                            </p>
                        </div>

                        {/* Architecture Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Lock className="w-4 h-4 text-indigo-600" />
                                    <h5 className="font-semibold text-sm text-gray-800">Privacy Layer</h5>
                                </div>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• Secret Network integration</li>
                                    <li>• End-to-end encryption</li>
                                    <li>• Voter anonymity relayer</li>
                                </ul>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-4 h-4 text-purple-600" />
                                    <h5 className="font-semibold text-sm text-gray-800">Voting Mechanics</h5>
                                </div>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• On-chain snapshots</li>
                                    <li>• Stake-weight calculations</li>
                                    <li>• NEAR encrypted contracts</li>
                                </ul>
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
                        <div className="flex gap-2 pt-2">
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
                        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg p-4 border border-cyan-200">
                            <h4 className="font-bold text-gray-800 mb-2">Zero-Knowledge Reputation System</h4>
                            <p className="text-sm text-gray-600">
                                Experimental POC. Prove ed25519 key ownership and reputation without disclosure.
                            </p>
                        </div>

                        {/* Technical Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <FlaskConical className="w-4 h-4 text-teal-600" />
                                    <h5 className="font-semibold text-sm text-gray-800">ZK Architecture</h5>
                                </div>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• Plonky2 ed25519 proofs</li>
                                    <li>• Merkle tree membership</li>
                                    <li>• Threshold reputation disclosure</li>
                                </ul>
                            </div>

                            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Cpu className="w-4 h-4 text-cyan-600" />
                                    <h5 className="font-semibold text-sm text-gray-800">Verification Pipeline</h5>
                                </div>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• Gnark → Groth16 conversion</li>
                                    <li>• On-chain verification</li>
                                    <li>• NEAR precompile integration</li>
                                </ul>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-300">
                            <div className="text-sm">D
                                <p className="text-gray-700 font-medium">Research Status</p>
                                <p className="text-gray-600 text-xs mt-1">
                                    POC completed. NDC was sunset June 2024.
                                </p>
                            </div>
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
                        <div className="flex gap-2 pt-2">
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
