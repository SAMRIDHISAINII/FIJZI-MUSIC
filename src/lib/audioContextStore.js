import { createContext } from "react";

// The audio context lives in its own module so its identity stays stable across
// hot reloads of the provider file. If the context were created alongside the
// provider, editing that file would mint a new context object while already
// mounted consumers still held the old one — which surfaces as
// "useAudio must be used within AudioProvider".
export const AudioStateContext = createContext(null);