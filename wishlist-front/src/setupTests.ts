import '@testing-library/jest-dom';

declare global {
	interface GlobalThis {
		TextEncoder?: typeof TextEncoder;
		TextDecoder?: typeof TextDecoder;
	}
}

if (typeof globalThis.TextEncoder === 'undefined' || typeof globalThis.TextDecoder === 'undefined') {
	try {
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
		// Ignore
	}
}