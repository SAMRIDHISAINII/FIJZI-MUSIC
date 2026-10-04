// Single source of truth for the artist, the featured single and the discography.
// Swap the artwork, titles or SoundCloud URLs here and the whole site updates.

export const ARTIST = {
  name: "Fijzi Music",
};

// The featured / latest single — played by the hero CD and the featured strip.
export const TRACK = {
  id: "yu-hi",
  title: "Yu Hi",
  artist: "Fijzi Music",
  label: "Latest Single",
  tag: "Country",
  duration: "2:30",
  plays: 32,
  likes: 4,
  timeAgo: "2 years ago",
  artwork:
    "https://media.base44.com/images/public/6ab957b486c7effb63933941/36d3f6ecc_generated_image.png",
  soundcloudUrl: "https://soundcloud.com/samridhi-551130813/awaaz",
};

export const DISCOGRAPHY = [
  TRACK,
  {
    id: "raataan-lambiyan",
    title: "Raataan Lamblyan - Instrumental",
    artist: "Fijzi Music",
    tag: "Ambient",
    duration: "2:56",
    plays: 33,
    likes: 5,
    timeAgo: "2 years ago",
    artwork:
      "https://media.base44.com/images/public/6ab957b486c7effb63933941/e388e58c7_generated_image.png",
    soundcloudUrl:
      "https://soundcloud.com/samridhi-551130813/raataan-lambiyan-instrumental",
  },
  {
    id: "halamithi-habibo",
    title: "Halamithi Habibo - Instrumental",
    artist: "Fijzi Music",
    tag: "Folk & Singer-Songwriter",
    duration: "2:55",
    plays: 80,
    likes: 5,
    timeAgo: "2 years ago",
    artwork:
      "https://media.base44.com/images/public/6ab957b486c7effb63933941/901a84937_generated_image.png",
    soundcloudUrl: "https://soundcloud.com/samridhi-551130813/arabic-kuthu",
  },
  {
    id: "raaho-mein",
    title: "Raaho Mein",
    artist: "Fijzi Music",
    tag: "Ambient",
    duration: "2:26",
    plays: 33,
    likes: 4,
    timeAgo: "2 years ago",
    artwork:
      "https://media.base44.com/images/public/6ab957b486c7effb63933941/b5a1797b5_generated_image.png",
    soundcloudUrl: "https://soundcloud.com/samridhi-551130813/raaho-mein",
  },
];

export const LINKS = {
  spotify: "https://open.spotify.com/artist/29ZNYkVZpFxGaZzIEg3GDB",
  soundcloud: "https://soundcloud.com/samridhi-551130813",
};