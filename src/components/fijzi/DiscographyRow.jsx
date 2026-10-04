import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Heart,
  Repeat2,
  Share,
  Copy,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useAudio } from "@/lib/AudioContext";
import Waveform from "./Waveform";

function Action({ onClick, active, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BEFF00] ${
        active
          ? "bg-[#BEFF00]/10 text-[#BEFF00]"
          : "bg-[#161616] text-[#9a9a9a] hover:bg-[#1f1f1f] hover:text-[#F4F4F1]"
      }`}
    >
      {children}
    </button>
  );
}

export default function DiscographyRow({ track, index = 0 }) {
  const { currentId, isPlaying, toggleTrack, progress } = useAudio();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  const isCurrent = currentId === track.id;
  const playing = isCurrent && isPlaying;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(track.soundcloudUrl);
      toast({ title: "Link copied", description: track.title });
    } catch {
      toast({ title: "Couldn't copy link", variant: "destructive" });
    }
  };

  const share = async () => {
    const data = {
      title: `${track.title} — ${track.artist}`,
      text: `Listen to ${track.title}`,
      url: track.soundcloudUrl,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        /* user dismissed the share sheet */
      }
    }
    copyLink();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.3) }}
      className="group -mx-3 flex gap-4 rounded-xl px-3 py-5 transition-colors duration-300 hover:bg-[#0b0b0b] md:gap-6"
    >
      {/* artwork */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md md:h-20 md:w-20">
        <Image
          src={track.artwork}
          alt={`${track.title} artwork`}
          className="h-full w-full object-cover"
          fittingType="fill"
        />
        {playing && (
          <span className="absolute inset-0 flex items-center justify-center bg-[#070707]/55">
            <span className="flex h-4 items-end gap-[3px]">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-[#BEFF00]"
                  style={{ height: 16, transformOrigin: "bottom" }}
                  animate={{ scaleY: [0.25, 1, 0.45, 0.9, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                />
              ))}
            </span>
          </span>
        )}
      </div>

      {/* play / pause */}
      <button
        type="button"
        onClick={() => toggleTrack(track)}
        aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
        className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707] ${
          playing
            ? "bg-[#BEFF00] text-[#070707] focus-visible:ring-[#BEFF00]"
            : "bg-[#F4F4F1] text-[#070707] focus-visible:ring-[#F4F4F1]"
        }`}
      >
        {playing ? (
          <Pause size={16} fill="currentColor" />
        ) : (
          <Play size={16} fill="currentColor" className="translate-x-[1px]" />
        )}
      </button>

      {/* content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7a7a7a]">
              {track.artist}
            </div>
            <h3 className="truncate font-heading text-[17px] font-bold tracking-[-0.01em] text-[#F4F4F1] md:text-[19px]">
              {track.title}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[#6a6a6a] sm:inline">
              {track.timeAgo}
            </span>
            <span className="rounded-full bg-[#1c1c1c] px-3 py-1 font-mono text-[10px] tracking-[0.08em] text-[#c8c8c8]">
              # {track.tag}
            </span>
          </div>
        </div>

        {/* waveform */}
        <div className="relative mt-3 h-9 md:h-10">
          <Waveform seed={track.id} progress={progress} active={isCurrent} />
          <span className="pointer-events-none absolute bottom-0 right-0 rounded bg-[#0d0d0d]/80 px-1.5 font-mono text-[10px] text-[#9a9a9a]">
            {track.duration}
          </span>
        </div>

        {/* actions */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <Action onClick={() => setLiked((v) => !v)} active={liked} label={liked ? "Unlike" : "Like"}>
              <Heart size={13} fill={liked ? "currentColor" : "none"} />
              <span>{track.likes + (liked ? 1 : 0)}</span>
            </Action>
            <Action
              onClick={() => setReposted((v) => !v)}
              active={reposted}
              label={reposted ? "Undo repost" : "Repost"}
            >
              <Repeat2 size={13} />
            </Action>
            <Action onClick={share} label="Share">
              <Share size={13} />
            </Action>
            <Action onClick={copyLink} label="Copy link">
              <Copy size={13} />
            </Action>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="More options"
                  className="flex h-8 items-center rounded-md bg-[#161616] px-2.5 text-[#9a9a9a] transition-colors duration-200 hover:bg-[#1f1f1f] hover:text-[#F4F4F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BEFF00]"
                >
                  <MoreHorizontal size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="border-[#242424] bg-[#121212] text-[#F4F4F1]"
              >
                <DropdownMenuItem asChild className="gap-2 focus:bg-[#1f1f1f] focus:text-[#F4F4F1]">
                  <a href={track.soundcloudUrl} target="_blank" rel="noreferrer noopener">
                    <ExternalLink size={13} /> Open on SoundCloud
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={copyLink} className="gap-2 focus:bg-[#1f1f1f] focus:text-[#F4F4F1]">
                  <Copy size={13} /> Copy link
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#242424]" />
                <DropdownMenuItem onClick={share} className="gap-2 focus:bg-[#1f1f1f] focus:text-[#F4F4F1]">
                  <Share size={13} /> Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6a6a6a]">
            <Play size={10} fill="currentColor" /> {track.plays}
          </span>
        </div>
      </div>
    </motion.article>
  );
}