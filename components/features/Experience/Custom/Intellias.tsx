import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "../../../animate-ui/components/animate/tabs";
import { Map, Route } from "lucide-react";

export default function Intellias() {
    const [activeTab, setActiveTab] = useState('here-wego');

    return (
        <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full sm:min-h-0 min-h-15 grid-cols-1 sm:grid-cols-2 bg-gray-100">
                    <TabsTrigger value="here-wego" className="data-[state=active]:bg-white text-xs sm:text-sm">
                        <Map className="w-3 h-3 mr-1 shrink-0" />
                        <span className="truncate">HERE WeGo SDK</span>
                    </TabsTrigger>
                    <TabsTrigger value="routing" className="data-[state=active]:bg-white text-xs sm:text-sm">
                        <Route className="w-3 h-3 mr-1 shrink-0" />
                        <span className="truncate">Map Routing</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContents>
                    {/* HERE WeGo SDK Tab */}
                    <TabsContent value="here-wego" className="space-y-4 mt-4">
                        {/* Header */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-2">Mobile Navigation SDK</h4>
                            <p className="text-sm text-gray-600">
                                Junior C++ Engineer. Maintained legacy SDK while new version was in development.
                            </p>
                        </div>

                        {/* Contributions */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Work Done</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• SDK maintenance and updates</li>
                                <li>• Compatibility with latest mobile OS</li>
                                <li>• Bug investigation and fixes</li>
                                <li>• Routing algorithm improvements</li>
                                <li>• Heuristics adjustments</li>
                            </ul>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">C++</span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Mobile SDK</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Navigation</span>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Map Routing Tab */}
                    <TabsContent value="routing" className="space-y-4 mt-4">
                        {/* Header */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-bold text-gray-800 mb-2">Map Format & Routing Optimization</h4>
                            <p className="text-sm text-gray-600">
                                Middle C++ Engineer. Built new map format for optimized routing speed.
                            </p>
                        </div>

                        {/* Development Areas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-sm text-gray-700 mb-2">Format Development</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• New data format design</li>
                                    <li>• Routing team collaboration</li>
                                    <li>• Component implementation</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-sm text-gray-700 mb-2">Optimization</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Performance profiling</li>
                                    <li>• Bottleneck resolution</li>
                                    <li>• Test coverage</li>
                                </ul>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">Stack</h4>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">C++</span>
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Performance</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">Algorithms</span>
                            </div>
                        </div>
                    </TabsContent>
                </TabsContents>
            </Tabs>
        </div>
    )
}
