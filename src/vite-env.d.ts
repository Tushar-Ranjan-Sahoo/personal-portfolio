/// <reference types="vite/client" />

// Allow importing PDF files as asset URLs
declare module '*.pdf' {
  const src: string;
  export default src;
}
