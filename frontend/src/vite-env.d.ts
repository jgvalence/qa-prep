/// <reference types="vite/client" />

// Wildcard declaration so both Vite and ts-jest accept ?raw markdown imports
declare module '*.md?raw' {
  const content: string
  export default content
}

