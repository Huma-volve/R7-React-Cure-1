// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_TOKEN: string;
  readonly VITE_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}