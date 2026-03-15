import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^next/server$": "<rootDir>/__mocks__/next/server.ts",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@prisma/client)/)",
  ],
};

export default config;
