// Provide custom jest-dom matchers (toBeInTheDocument, toHaveClass, etc.)
import '@testing-library/jest-dom';

// Ensure TextEncoder/TextDecoder are available in the Jest environment.
// Avoid a static import from Node's 'util' (which can cause TypeScript to look for Node types)
// and instead only polyfill them at runtime when necessary.
declare global {
	interface GlobalThis {
		TextEncoder?: typeof TextEncoder;
		TextDecoder?: typeof TextDecoder;
	}
}

if (typeof globalThis.TextEncoder === 'undefined' || typeof globalThis.TextDecoder === 'undefined') {
	try {
		// Use a dynamic require via eval so TypeScript doesn't try to resolve 'util' at compile time.
		const req = eval('typeof require === "function" ? require : undefined') as unknown;
		if (typeof req === 'function') {
			const utilModule = (req as (id: string) => unknown)('util') as
				| { TextEncoder?: typeof TextEncoder; TextDecoder?: typeof TextDecoder }
				| undefined;
			if (utilModule?.TextEncoder && utilModule?.TextDecoder) {
				globalThis.TextEncoder = utilModule.TextEncoder;
				globalThis.TextDecoder = utilModule.TextDecoder;
			}
		}
	} catch {
		// If we can't polyfill, tests that depend on these APIs will surface errors at runtime.
	}
}