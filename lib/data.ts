// Removed the unnecessary Url imports. Standard strings are all we need for local files.

export const team = [
  {
    name: 'Sophie',
    role: 'Team Lead',
    slug: 'sophie',
    image: '/team/sophie.jpg',
    mobileImage: '/team/sophie-mobile.jpg',
    bio: 'The Jack of all trades and master of leadership. Sophie steers the strategy and keeps every story on-brand, on-brief, and on time making the connective tissue between the client’s goals and the studio’s ideas.',
    color: 'green' as const,
  },
  {
    name: 'Max',
    role: 'Head of Video',
    slug: 'max',
    image: '/team/max.jpg',
    mobileImage: '/team/max-mobile.jpg',
    bio: 'Max shoots and cuts the motion work, that includes everything from punchy social edits to full campaign films with an eye for pacing that keeps thumbs from scrolling past.',
    color: 'coral' as const,
  },
  {
    name: 'Haywood',
    role: 'Head of Graphic Design',
    slug: 'haywood',
    image: '/team/haywood.jpg',
    mobileImage: '/team/haywood-mobile.jpg',
    bio: 'Haywood builds the visual systems. This includes the persona, brand, identity, layout, motion graphics and all the snappy animations; all the things that make every deliverable unmistakably the client’s own.',
    color: 'sand' as const,
  },
];

// 1. Define the Type here (using string for the URL path)
export type Service = {
  title: string;
  description: string;
  videoUrl: string;
};

// 2. Apply the type to the array
export const services: Service[] = [
  {
    title: 'Social Media Management',
    description: 'Always-on content, community, and calendars that keep brands in the feed and in the conversation.',
    // Removed '/public' from the path
    videoUrl: '/services/social-media.webm',
  },
  {
    title: 'Content Marketing',
    description: 'Editorial and campaign content built around a story worth following, not just a schedule to fill.',
    videoUrl: '/services/content.webm',
  },
  {
    title: 'Marketing Strategy',
    description: 'Research-backed positioning and channel plans that turn attention into measurable growth.',
    videoUrl: '/services/strategy.webm',
  },
  {
    title: 'Photo & Video Editing',
    description: 'Production and post that make every asset look like it belongs to a much bigger budget.',
    videoUrl: '/services/photo-video.webm',
  },
];

// 1. Define the Project type here
export type Project = {
  title: string;
  category: string;
  year: string;
  image: string;
  thumbnail?: string;
  videoUrl?: string; // Added videoUrl for hover-to-play functionality
  slug: string;
  summary: string;
  url: string;
  platform: string;
  size: 'normal' | 'wide' | 'tall' | 'large';
  accent: 'turquoise' | 'coral' | 'green' | 'sand';
};

// 2. Apply the type to the array
export const projects: Project[] = [
  {
    title: 'Elim Group',
    category: 'Brand Campaign & Social',
    year: '2025',
    slug: 'elim-group',
    image: '/work/thumbs/project-1.webp',
    thumbnail: '/work/thumbs/project-1.webp',
    videoUrl: '/work/videos/elim-farms.webm/', // Added video path
    summary: 'A full rebrand of Elim Group’s social presence, pairing bold photography with a content system built for daily posting.',
    url: 'https://github.com/your-org/elim-group',
    platform: 'Brand Campaign & Social',
    size: 'tall',
    accent: 'turquoise',
  },
  {
    title: 'Proto Poultry',
    category: 'Content & Storytelling',
    year: '2025',
    slug: 'proto-poultry',
    image: '/work/thumbs/project-2.webp',
    thumbnail: '/work/thumbs/project-2.webp',
    videoUrl: '/work/videos/proto-poultry.webm', // Added video path
    summary: 'From-the-field content that turned a working farm into a following — photo, video, and a voice people actually trust.',
    url: 'https://github.com/your-org/proto-poultry',
    platform: 'Content & Storytelling',
    size: 'wide',
    accent: 'coral',
  },
  {
    title: 'Zantchito',
    category: 'Marketing Strategy',
    year: '2024',
    slug: 'zantchito',
    image: '/work/thumbs/project-3.webp',
    thumbnail: '/work/thumbs/project-3.webp',
    videoUrl: '/work/videos/zantchito.webm', // Added video path
    summary: 'Positioning and launch strategy for an entrepreneurship programme, built to recruit its first cohort on a tight runway.',
    url: 'https://github.com/your-org/zantchito',
    platform: 'Marketing Strategy',
    size: 'normal',
    accent: 'green',
  },
  {
    title: 'MAFECO',
    category: 'Photo & Video',
    year: '2024',
    slug: 'mafeco',
    image: '/work/thumbs/project-4.webp',
    thumbnail: '/work/thumbs/project-4.webp',
    videoUrl: '/work/videos/mafeco.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/mafeco',
    platform: 'Photo & Video',
    size: 'normal',
    accent: 'sand',
  },
  {
    title: 'BLUEWAVES ENERGIES LTD',
    category: 'Marketing Strategy',
    year: '2026',
    slug: 'bluewaves',
    image: '/work/thumbs/bluewaves.webp',
    thumbnail: '/work/thumbs/bluewaves.webp',
    videoUrl: '/work/videos/bluewaves.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/bluewaves',
    platform: 'Marketing Strategy',
    size: 'wide',
    accent: 'sand',
  },
  {
    title: 'SOLID PEST CONTROL',
    category: 'Brand Campaign & Social',
    year: '2026',
    slug: 'solid-pest-control',
    image: '/work/thumbs/solid-pest.webp',
    thumbnail: '/work/thumbs/solid-pest.webp',
    videoUrl: '/work/videos/solid-pest.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/solid-pest-control',
    platform: 'Brand Campaign & Social',
    size: 'normal',
    accent: 'sand',
  },
  {
    title: 'FABRIC MUSE',
    category: 'Brand Campaign & Social',
    year: '2026',
    slug: 'fabric-muse',
    image: '/work/fabric-muse.webp',
    thumbnail: '/work/thumbs/fabric-muse.webp',
    videoUrl: '/work/videos/fabric-muse.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/fabric-muse',
    platform: 'Brand Campaign & Social',
    size: 'normal',
    accent: 'sand',
  },
  {
    title: 'AGRA: VALUE4HER',
    category: 'Marketing Strategy',
    year: '2026',
    slug: 'agra-value4her',
    image: '/work/thumbs/agra.webp',
    thumbnail: '/work/thumbs/agra.webp',
    videoUrl: '/work/videos/agra.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/agra-value4her',
    platform: 'Marketing Strategy',
    size: 'wide',
    accent: 'sand',
  },
  {
    title: 'EQUIP GROUP',
    category: 'Marketing Strategy, Brand Campaign & Social',
    year: '2026',
    slug: 'equip-group',
    image: '/work/thumbs/equip-group.webp',
    thumbnail: '/work/thumbs/equip-group.webp',
    videoUrl: '/work/videos/equip-group.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/equip-group',
    platform: 'Brand Campaign & Social, Marketing Strategy',
    size: 'large',
    accent: 'sand',
  },
  {
    title: 'BUY MALAWI STRATEGY',
    category: 'Photo & Video',
    year: '2026',
    slug: 'buy-malawi-strategy',
    image: '/work/thumbs/bms.webp',
    thumbnail: '/work/thumbs/bms.webp',
    videoUrl: '/work/videos/bms.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/buy-malawi-strategy',
    platform: 'Photo & Video',
    size: 'normal',
    accent: 'sand',
  },
  {
    title: 'LOTA EVENTS',
    category: 'Brand Campaign',
    year: '2026',
    slug: 'lota-events',
    image: '/work/thumbs/lota-events.webp',
    thumbnail: '/work/thumbs/lota-events.webp',
    videoUrl: '/work/videos/lota-events.mp4', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/lota-events',
    platform: 'Brand Campaign',
    size: 'normal',
    accent: 'sand',
  },
  {
    title: 'SUBSTANCE MUSIC',
    category: 'Brand Campaign & Social',
    year: '2026',
    slug: 'substance-music',
    image: '/work/thumbs/substance-music.webp',
    thumbnail: '/work/thumbs/substance-music.webp',
    videoUrl: '/work/videos/substance-music.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/substance-music',
    platform: 'Brand Campaign & Social',
    size: 'normal',
    accent: 'sand',
  },
   {
    title: 'CHARLES HUDSON ATTORNEYS',
    category: 'Brand Campaign',
    year: '2026',
    slug: 'charles-hudson-attorneys',
    image: '/work/thumbs/charles-hudson.webp',
    thumbnail: '/work/thumbs/charles-hudson.webp',
    videoUrl: '/work/videos/charles-hudson.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/charles-hudson',
    platform: 'Brand Campaign',
    size: 'wide',
    accent: 'sand',
  },
   {
    title: 'CHRIS SAMOSAS',
    category: 'Brand Campaign',
    year: '2026',
    slug: 'chris-samosas',
    image: '/work/thumbs/chris-samosas.webp',
    thumbnail: '/work/thumbs/chris-samosas.webp',
    videoUrl: '/work/videos/chris-samosas.webm', // Added video path
    summary: 'Documentary-style photo and video coverage across a nationwide cooperative network, cut into a single coherent story.',
    url: 'https://github.com/your-org/chris-samosas',
    platform: 'Brand Campaign',
    size: 'normal',
    accent: 'sand',
  },
];
