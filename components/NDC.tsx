import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "./animate-ui/components/animate/tabs";
import { Button } from "./ui/button";

export default function NDC() {
    const [activeTab, setActiveTab] = useState('voting-mechanism');

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="voting-mechanism">Private Voting</TabsTrigger>
                    <TabsTrigger value="zk-research">ZK Research</TabsTrigger>
                </TabsList>

                <TabsContents>
                    {/* Private Voting Mechanism Tab */}
                    <TabsContent value="voting-mechanism" className="space-y-3 mt-4">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Private Voting</h4>
                            <p className="text-sm text-gray-600">
                                Private stake-weight voting for NEAR governance. NDC Ops Team.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Built</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>On-chain voting snapshots with stake metrics</li>
                                <li>NEAR contracts for encrypted voting</li>
                                <li>Secret Network privacy layer</li>
                                <li>Relayer for voter anonymity</li>
                                <li>End-to-end encryption</li>
                                <li>Stake-weight algorithms</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">NEAR</span>
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">Secret Network</span>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://github.com/near-ndc/voting-v2', '_blank')}
                            >
                                View Voting System Code
                            </Button>
                        </div>
                    </TabsContent>

                    {/* ZK Research Tab */}
                    <TabsContent value="zk-research" className="space-y-3 mt-4">
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">ZK Reputation POC</h4>
                            <p className="text-sm text-gray-600">
                                Plonky2 verification on NEAR. Prove ed25519 key ownership without disclosure.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Implementation</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                <li>Plonky2 proof of ed25519 ownership</li>
                                <li>Gnark verifier → groth16 conversion</li>
                                <li>Merkle tree membership with reputation</li>
                                <li>User disclose that he has at least X reputation</li>
                                <li>On-chain verification</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Status</h4>
                            <p className="text-sm text-gray-600">
                                Abandoned due to NDC sunset in June 2024.
                                Also, compute time too high for general use.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">Plonky2</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Gnark</span>
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">Groth16</span>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Rust/Go</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open('https://github.com/akorchyn/near-zk-reputation-poc', '_blank')}
                            >
                                View ZK Repository
                            </Button>
                        </div>
                    </TabsContent>
                </TabsContents>
            </Tabs>
        </div>
    )
}
