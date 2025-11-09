import { GraduationCap, Users, Trophy, GitBranch, CheckCircle, BookOpen, Award } from "lucide-react";
import { Button } from "./ui/button";

export default function Education() {
    return (
        <div className="space-y-6">
            {/* KPI - Bachelor's Degree */}
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <div className="space-y-4">
                    {/* Header with Logo */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 shrink-0">
                                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-base sm:text-lg text-gray-800">
                                    Bachelor of Software Engineering
                                    <span className="font-normal text-xs text-gray-500 ml-2">2019-2023</span>
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                    National Technical University of Ukraine "KPI"
                                </p>
                                <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                                    Igor Sikorsky Kyiv Polytechnic Institute • Est. 1898
                                </p>
                            </div>
                        </div>
                        <div className="bg-white px-3 py-1 rounded-full border border-gray-200 self-start">
                            <span className="text-xs sm:text-sm font-semibold text-gray-700">Grade: 84/100</span>
                        </div>
                    </div>

                    {/* Diploma Project Showcase */}
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-gray-600" />
                            <h4 className="font-semibold text-sm text-gray-700">Diploma Project</h4>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-gray-800 mb-2">
                            Web Application for Cryptocurrency Price Alerts and Price Monitoring
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">Rust</span>
                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">React</span>
                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">Protobuf</span>
                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">GraphQL</span>
                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">Crypto APIs</span>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 bg-gray-900 text-white border-gray-900 hover:bg-gray-800 hover:border-gray-800"
                            onClick={() => window.open('https://github.com/akorchyn/CoinSight', '_blank')}
                        >
                            <GitBranch className="w-3 h-3 mr-1" />
                            View on GitHub
                        </Button>
                    </div>
                </div>
            </div>

            {/* Ecole 42 / Unit Factory */}
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center shrink-0 p-2">
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAYFBMVEX///8AAAD8/Pzs7Oxubm5lZWWYmJgyMjKpqanT09M6OjrMzMyUlJTQ0NDJycmbm5tbW1t1dXVAQEBKSkp7e3sqKiqDg4NRUVFFRUW1tbX19fUICAgQEBCNjY0YGBhWVlbFZNB3AAABiElEQVRoge3Y23KCMBAG4CQcLIpCAMXaWt//LWuHU3ZLYAOk7XT2v9vIfrNmAh6E4HA4HI5Tsig0EwXNcgpX4wuow0pR7FjCHNv1HKwWag8vO1PwFNlJ90JkrtZCIHxHwPHcvQ3wq1iCW+cGeC2W4BO2gZdqCW7fExMvm9oRn5p7wEu1BLedQYhfu9oJn7FbvO4NFzybsRu8GGoHfG7uBi8NgY7P2194YQJknGA/8RLUVJxii3wP24k4yRYX1E17KmL7YHl/MCfUFY9ehc8gzT6grtTj3OM2z73V3D9pj59BbJ9+3V5279DsI+rKNpwb78m4/V/mpp3BZXO/3oKp3FzmVmd41du7nMxL05aj5RtU702tdtOYBY/QcgBs/aG84VX3GeoB19IfXkl/uJb+8Er6w7X0h7e2F7zqSg+47ssOR7f/Cnywe1xHk3mQ8dAoKb+gn0mouDbLdfi3p2IIStIfC1b8DjcvjHNQ61X4NmGcccb/Mo6/cG6KB2lsJk3mWzgcDofDoeYT9IgXTVimnsgAAAAASUVORK5CYII="
                                    alt="42"
                                    className="w-full h-full object-contain filter invert"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-base sm:text-lg text-gray-800">
                                    École 42 Program
                                    <span className="font-normal text-xs text-gray-500 ml-2">2018-2020</span>
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                    Unit Factory • Kyiv Campus
                                </p>
                                <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                                    Revolutionary peer-to-peer coding education
                                </p>
                            </div>
                        </div>
                        <div className="bg-green-50 px-3 py-1 rounded-full border border-green-200 self-start">
                            <span className="text-xs sm:text-sm font-semibold text-green-700">Completed</span>
                        </div>
                    </div>

                    {/* Unique Learning Model */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                <Users className="w-4 h-4 text-gray-600" />
                                <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Peer-to-Peer Learning</h4>
                            </div>
                            <p className="text-xs text-gray-600">
                                No teachers, no courses. Learn by doing and teaching others.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                <Trophy className="w-4 h-4 text-gray-600" />
                                <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Project-Based</h4>
                            </div>
                            <p className="text-xs text-gray-600">
                                Real-world projects from day one. Build, fail, learn, repeat.
                            </p>
                        </div>
                    </div>

                    {/* Key Projects & Skills */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <h4 className="text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2 text-gray-700">
                            <BookOpen className="w-4 h-4 text-gray-600" />
                            Core Competencies Developed
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 sm:gap-2 text-xs">
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                                <span className="text-gray-700">C/C++ Programming</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                                <span className="text-gray-700">Algorithms</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                                <span className="text-gray-700">System Design</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                                <span className="text-gray-700">Unix/Linux</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                                <span className="text-gray-700">Shell Scripting</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                                <span className="text-gray-700">Networking</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                                <span className="text-gray-700">Security</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600 shrink-0" />
                                <span className="text-gray-700">Graphics</span>
                            </div>
                        </div>
                    </div>

                    {/* Program Highlights */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="text-xs px-2 sm:px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                            24/7 Campus Access
                        </span>
                        <span className="text-xs px-2 sm:px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                            No Tuition Fees
                        </span>
                        <span className="text-xs px-2 sm:px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                            Intensive Selection
                        </span>
                        <span className="text-xs px-2 sm:px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                            Self-Directed
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
