/* eslint-disable @typescript-eslint/no-require-imports */
import "@testing-library/jest-dom";

// Polyfill para TextEncoder/TextDecoder necessário para react-router-dom
if (typeof globalThis.TextEncoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { TextEncoder, TextDecoder } = require("util");
  globalThis.TextEncoder = TextEncoder;
  (globalThis as typeof globalThis).TextDecoder = TextDecoder;
}
