import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    // Permite importar módulos SCSS/CSS/IMAGENS no Jest
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.svg\\?react$": "<rootDir>/src/__mocks__/svgReactMock.tsx",
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/src/__mocks__/fileMock.ts",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
          moduleResolution: "node",
          types: ["jest", "@testing-library/jest-dom", "node"],
          skipLibCheck: true,
          typeRoots: ["./node_modules/@types", "./src/types"],
        },
        isolatedModules: true,
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/cypress/"],
};

export default config;
