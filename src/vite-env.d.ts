/// <reference types="vite/client" />

// Allow importing PDF files as asset URLs
declare module '*.pdf' {
  const src: string;
  export default src;
}

// Allow importing MP3 audio files as asset URLs
declare module '*.mp3' {
  const src: string;
  export default src;
}
