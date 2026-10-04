import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { TRACK } from "@/lib/trackConfig";
import { AudioStateContext } from "@/lib/audioContextStore";

const SC_API = "https://w.soundcloud.com/player/api.js";

// Build the SoundCloud embed URL used inside the hidden player iframe.
function scEmbedUrl(url) {
  const params = new URLSearchParams({
    url,
    color: "#BEFF00",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "false",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

// Load the SoundCloud Widget API once, resolving with window.SC.
function loadSoundCloudApi() {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.SC && window.SC.Widget) return Promise.resolve(window.SC);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-sc-widget-api]");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.SC));
      existing.addEventListener("error", () => reject(new Error("sc api failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = SC_API;
    script.async = true;
    script.dataset.scWidgetApi = "true";
    script.onload = () => resolve(window.SC);
    script.onerror = () => reject(new Error("sc api failed"));
    document.head.appendChild(script);
  });
}

// Central audio engine. Owns one hidden SoundCloud player and shares playback
// state (isPlaying / current track / progress) with the CD, the visualizer and
// every row of the discography so they all stay in sync.
export function AudioProvider({ children }) {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const currentIdRef = useRef(null);
  const playingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const iframe = document.createElement("iframe");
    iframe.title = "FIJZI audio player";
    iframe.allow = "autoplay";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("frameborder", "no");
    iframe.src = scEmbedUrl(TRACK.soundcloudUrl);
    Object.assign(iframe.style, {
      position: "fixed",
      left: "-9999px",
      top: "0",
      width: "1px",
      height: "1px",
      opacity: "0",
      pointerEvents: "none",
      border: "0",
    });
    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    loadSoundCloudApi()
      .then((SC) => {
        if (cancelled || !SC || !SC.Widget) return;
        const widget = SC.Widget(iframe);
        widgetRef.current = widget;

        widget.bind(SC.Widget.Events.PLAY, () => {
          playingRef.current = true;
          setIsPlaying(true);
        });
        widget.bind(SC.Widget.Events.PAUSE, () => {
          playingRef.current = false;
          setIsPlaying(false);
        });
        widget.bind(SC.Widget.Events.FINISH, () => {
          playingRef.current = false;
          setIsPlaying(false);
          setProgress(0);
        });
        widget.bind(SC.Widget.Events.PLAY_PROGRESS, (e) => {
          if (e && typeof e.relativePosition === "number") {
            setProgress(e.relativePosition);
          }
        });
        widget.bind(SC.Widget.Events.READY, () => setReady(true));
        setReady(true);
      })
      .catch(() => {
        /* Widget unavailable — play() falls back to opening SoundCloud. */
      });

    return () => {
      cancelled = true;
      if (iframeRef.current) iframeRef.current.remove();
      iframeRef.current = null;
      widgetRef.current = null;
    };
  }, []);

  const playTrack = useCallback((track) => {
    const widget = widgetRef.current;
    if (!widget) return false;
    if (currentIdRef.current === track.id) {
      widget.play();
      return true;
    }
    currentIdRef.current = track.id;
    setCurrentId(track.id);
    setProgress(0);
    widget.load(track.soundcloudUrl, { auto_play: true });
    return true;
  }, []);

  const pauseTrack = useCallback(() => {
    const widget = widgetRef.current;
    if (widget) widget.pause();
  }, []);

  const toggleTrack = useCallback(
    (track) => {
      if (!widgetRef.current) {
        if (typeof window !== "undefined") {
          window.open(track.soundcloudUrl, "_blank", "noopener");
        }
        return;
      }
      if (currentIdRef.current === track.id && playingRef.current) {
        pauseTrack();
      } else {
        playTrack(track);
      }
    },
    [playTrack, pauseTrack]
  );

  const toggle = useCallback(() => toggleTrack(TRACK), [toggleTrack]);

  return (
    <AudioStateContext.Provider
      value={{ isPlaying, currentId, progress, ready, toggle, toggleTrack, playTrack, pauseTrack }}
    >
      {children}
    </AudioStateContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioStateContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}