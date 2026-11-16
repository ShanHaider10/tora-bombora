import heroBeachStage from '../assets/images/hero_beach_stage_1794615879081.jpg';
import aboutHeartHands from '../assets/images/about_heart_hands_1794615878166.jpg';
import lineupIndieGuitarist from '../assets/images/lineup_indie_guitarist_1794615878204.jpg';
import lineupSoulVocalist from '../assets/images/lineup_soul_vocalist_1794615879523.jpg';
import lineupElectronicDj from '../assets/images/lineup_electronic_dj_1794615879102.jpg';
import lineupNightCrowd from '../assets/images/lineup_night_crowd_1794615880707.jpg';
import lineupAcousticGuitarist from '../assets/images/lineup_acoustic_guitarist_1794615880491.jpg';
import galleryFriendsSunlight from '../assets/images/gallery_friends_sunlight_1794615880994.jpg';
import galleryCoastalCampsite from '../assets/images/gallery_coastal_campsite_1794615881073.jpg';
import testimonialSarahPortrait from '../assets/images/testimonial_sarah_portrait_1794615881384.jpg';

export const FESTIVAL_IMAGES = {
  heroBeachStage,
  aboutHeartHands,
  lineupIndieGuitarist,
  lineupSoulVocalist,
  lineupElectronicDj,
  lineupNightCrowd,
  lineupAcousticGuitarist,
  galleryFriendsSunlight,
  galleryCoastalCampsite,
  testimonialSarahPortrait,
};

export interface Artist {
  id: string;
  name: string;
  origin: string;
  genre: string;
  day: 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  stage: 'Main Beach Stage' | 'Pōhutukawa Grove' | 'Lagoon Sound System';
  image: string;
  featured: boolean;
  bio: string;
  previewChordFreqs: number[];
}

export const ARTISTS: Artist[] = [
  {
    id: 'kora-tides',
    name: 'Kora & The Tides',
    origin: 'Wellington, NZ',
    genre: 'Indie Surf Rock',
    day: 'Friday',
    time: '8:30 PM – 10:00 PM',
    stage: 'Main Beach Stage',
    image: lineupIndieGuitarist,
    featured: true,
    bio: 'Sun-drenched Stratocaster riffs meet rolling Wairarapa coastal basslines. Known for hypnotic sunset sets that unite barefoot crowds along the shoreline.',
    previewChordFreqs: [220, 277.18, 329.63, 440],
  },
  {
    id: 'marama-soul',
    name: 'Marama',
    origin: 'Tāmaki Makaurau, NZ',
    genre: 'Neo-Soul & R&B',
    day: 'Saturday',
    time: '7:45 PM – 9:15 PM',
    stage: 'Main Beach Stage',
    image: lineupSoulVocalist,
    featured: true,
    bio: 'Powerhouse Aotearoa vocalist blending lush brass harmonies, te reo Māori lyricism, and warm analog soul grooves under the twilight sky.',
    previewChordFreqs: [261.63, 311.13, 392.0, 466.16],
  },
  {
    id: 'solis-deep',
    name: 'DJ Solis',
    origin: 'Melbourne / Raglan',
    genre: 'Melodic House & Dub',
    day: 'Saturday',
    time: '11:30 PM – 1:30 AM',
    stage: 'Lagoon Sound System',
    image: lineupElectronicDj,
    featured: true,
    bio: 'Deep coastal house, organic percussion, and shimmering late-night modular textures sculpted specifically for open-air coastal amphitheatres.',
    previewChordFreqs: [196.0, 246.94, 293.66, 392.0],
  },
  {
    id: 'pacific-collective',
    name: 'Pacific Echoes Collective',
    origin: 'Byron Bay & Auckland',
    genre: 'Psychedelic Dub Fusion',
    day: 'Saturday',
    time: '9:45 PM – 11:15 PM',
    stage: 'Main Beach Stage',
    image: lineupNightCrowd,
    featured: true,
    bio: 'An eight-piece coastal powerhouse delivering expansive horns, tape-delayed percussion, and soaring communal anthems beneath the southern stars.',
    previewChordFreqs: [174.61, 220.0, 261.63, 349.23],
  },
  {
    id: 'luke-harbour',
    name: 'Luke Harbour',
    origin: 'Golden Bay, NZ',
    genre: 'Coastal Folk & Roots',
    day: 'Sunday',
    time: '5:30 PM – 7:00 PM',
    stage: 'Pōhutukawa Grove',
    image: lineupAcousticGuitarist,
    featured: true,
    bio: 'Fingerpicked acoustic storytelling steeped in salt air, campfire singalongs, and intimate harmonies as the weekend sun dips low.',
    previewChordFreqs: [293.66, 369.99, 440.0, 587.33],
  },
  {
    id: 'te-moana-brass',
    name: 'Te Moana Brass',
    origin: 'Pōneke, NZ',
    genre: 'Afro-Pacific Funk',
    day: 'Friday',
    time: '6:15 PM – 7:30 PM',
    stage: 'Main Beach Stage',
    image: galleryFriendsSunlight,
    featured: false,
    bio: 'High-energy nine-piece horn section bringing infectious Pacific funk rhythms to open Friday evening festivities.',
    previewChordFreqs: [246.94, 311.13, 369.99, 493.88],
  },
  {
    id: 'aria-drift',
    name: 'Aria & Driftwood',
    origin: 'Mount Maunganui, NZ',
    genre: 'Dream Pop',
    day: 'Sunday',
    time: '3:00 PM – 4:15 PM',
    stage: 'Pōhutukawa Grove',
    image: aboutHeartHands,
    featured: false,
    bio: 'Shimmering reverb guitars and gentle ocean-swept vocal harmonies crafted for lazy Sunday afternoons on the grass.',
    previewChordFreqs: [261.63, 329.63, 392.0, 523.25],
  },
  {
    id: 'kauri-bass',
    name: 'Kauri Bass System',
    origin: 'Ōtautahi, NZ',
    genre: 'Roots Reggae & Dub',
    day: 'Friday',
    time: '10:30 PM – 12:30 AM',
    stage: 'Lagoon Sound System',
    image: heroBeachStage,
    featured: false,
    bio: 'Hand-built warm timber sound system delivering heavyweight dub plates and conscious coastal bass.',
    previewChordFreqs: [146.83, 220.0, 293.66, 349.23],
  },
];

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  year: '2026' | '2025' | '2024';
  location: string;
  objectPosition?: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    src: heroBeachStage,
    title: 'Golden Hour at Main Beach Stage',
    caption: 'The opening Friday sunset crowd gathering along the Tora shoreline as the main stage lights up.',
    year: '2026',
    location: 'Main Beach Amphitheatre',
    objectPosition: 'center center',
  },
  {
    id: 'gal-2',
    src: lineupElectronicDj,
    title: 'Midnight Lagoon Lights',
    caption: 'Late-night beams cutting across the coastal mist during Saturday night electronic sets.',
    year: '2026',
    location: 'Lagoon Sound System',
    objectPosition: 'center center',
  },
  {
    id: 'gal-3',
    src: galleryFriendsSunlight,
    title: 'Afternoon Crew in the Sun',
    caption: 'Longtime friends and first-timers soaking up warm late-afternoon tunes by the dunes.',
    year: '2026',
    location: 'Dunes Meadow',
    objectPosition: 'center 30%',
  },
  {
    id: 'gal-4',
    src: galleryCoastalCampsite,
    title: 'Morning Coffee Over the Bay',
    caption: 'Waking up in the hillside campground to sweeping views of the Pacific swell.',
    year: '2025',
    location: 'Hilltop Tent Village',
    objectPosition: 'center 60%',
  },
  {
    id: 'gal-5',
    src: aboutHeartHands,
    title: 'Sunset Gratitude Circle',
    caption: 'Sharing the magic of dusk as ocean swells roll in behind the coastal stage.',
    year: '2025',
    location: 'Shoreline Lookout',
    objectPosition: 'center center',
  },
  {
    id: 'gal-6',
    src: galleryCoastalCampsite,
    title: 'Colourful Coastline Camp',
    caption: 'Hundreds of pitched tents nestled cleanly into the green coastal ridge with zero waste.',
    year: '2025',
    location: 'Tora Ridge Campground',
    objectPosition: 'center bottom',
  },
  {
    id: 'gal-7',
    src: lineupNightCrowd,
    title: 'Hands Up Under the Stars',
    caption: 'Saturday night headline finale with thousands singing in unison beneath the southern sky.',
    year: '2024',
    location: 'Main Beach Stage',
    objectPosition: 'center center',
  },
  {
    id: 'gal-8',
    src: lineupSoulVocalist,
    title: 'Soulful Sunset Sessions',
    caption: 'Unforgettable live vocal performances bathed in warm amber coastal twilight.',
    year: '2024',
    location: 'Main Beach Stage',
    objectPosition: 'center 25%',
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  hometown: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Tora Bombora is pure magic! The music, the people, the atmosphere... truly unforgettable!',
    name: 'Sarah M.',
    role: '3-Year Festival Regular',
    hometown: 'Wellington, NZ',
    avatar: testimonialSarahPortrait,
  },
  {
    id: 'test-2',
    quote: 'Waking up to the ocean breeze, surfing at dawn, and dancing barefoot until midnight—nothing in Aotearoa compares.',
    name: 'Tama R.',
    role: 'Surf Instructor & Camper',
    hometown: 'Raglan, NZ',
    avatar: lineupIndieGuitarist,
  },
  {
    id: 'test-3',
    quote: 'Zero plastic waste, local kai stalls, and a lineup curated with so much heart. Every detail feels intentional and welcoming.',
    name: 'Chloe K.',
    role: 'Sustainability Volunteer',
    hometown: 'Auckland, NZ',
    avatar: galleryFriendsSunlight,
  },
  {
    id: 'test-4',
    quote: 'Came solo from Christchurch and left with lifelong mates. The coastal community spirit here is second to none.',
    name: 'Liam W.',
    role: 'Acoustic Stage Attendee',
    hometown: 'Christchurch, NZ',
    avatar: lineupAcousticGuitarist,
  },
];

export interface TicketTier {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  remaining: number;
  includes: string[];
  badge?: string;
}

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'weekend-pass',
    name: '3-Day Weekend Festival Pass',
    subtitle: 'Friday 29 Jan – Sunday 31 Jan 2027',
    price: 265,
    remaining: 142,
    includes: [
      'Full access to all 3 coastal music stages',
      'Sunrise yoga, breathwork & wellness cove',
      'Art installations & local artisan markets',
    ],
  },
  {
    id: 'weekend-camping',
    name: 'Weekend Pass + Coastal Camping',
    subtitle: 'Includes 3 nights ocean-view tent pitch',
    price: 345,
    remaining: 64,
    badge: 'Most Popular',
    includes: [
      '3-Day Festival Pass + shaded ridge camping',
      'Hot solar showers & drinking water stations',
      'Dedicated coastal shuttle to Tora beach',
    ],
  },
  {
    id: 'whanau-pack',
    name: 'Whānau & Friends 4-Pack',
    subtitle: '4 Weekend Passes + Group Tent Plot',
    price: 1180,
    remaining: 19,
    includes: [
      '4 × 3-Day Weekend Passes + reserved camp plot',
      '1 × vehicle eco-parking pass included',
      'Reusable stainless festival cups for all 4',
    ],
  },
  {
    id: 'saturday-day',
    name: 'Saturday Tide Day Pass',
    subtitle: 'Saturday 30 Jan 2027 · 10 AM – 2 AM',
    price: 145,
    remaining: 88,
    includes: [
      'Full Saturday access across all stages',
      'Daytime wellness & ocean workshops',
      'Return Martinborough shuttle option',
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Tickets' | 'Camping' | 'Sustainability' | 'Getting There';
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'When and where does Tora Bombora 2027 take place?',
    answer:
      'Tora Bombora 2027 takes place from Friday 29 January to Sunday 31 January 2027 along the rugged South Wairarapa coastline at Tora, Aotearoa — roughly 90 minutes southeast of Wellington.',
    category: 'Getting There',
  },
  {
    question: 'How does coastal camping and campervan parking work?',
    answer:
      'Tent camping is included with the Weekend + Camping Pass across our ocean-view ridge paddocks. Solar-heated showers, compost toilets, and fresh filtered water refill stations are available 24/7.',
    category: 'Camping',
  },
  {
    question: 'What makes Tora Bombora a zero-waste sustainable festival?',
    answer:
      'We operate a strict pack-in, pack-out policy with zero single-use plastics on site. All food vendors serve on compostable ware, reusable steel cups are provided at bars, and 100% of stage lighting runs on solar-hybrid batteries.',
    category: 'Sustainability',
  },
  {
    question: 'Are shuttles available from Wellington and Martinborough?',
    answer:
      'Yes! Return eco-coaches depart Wellington Railway Station and Martinborough Square throughout Friday and Sunday. We strongly encourage carpooling or shuttle travel to protect the coastal road.',
    category: 'Getting There',
  },
  {
    question: 'Can I transfer or refund my ticket if my plans change?',
    answer:
      'All passes can be safely name-transferred to a friend at no extra fee up to 48 hours before gates open via your confirmation code.',
    category: 'Tickets',
  },
];

export interface PartnerInfo {
  id: string;
  name: string;
  role: string;
  description: string;
}

export const PARTNERS: PartnerInfo[] = [
  {
    id: 'airbnb',
    name: 'Airbnb',
    role: 'Coastal Stays Partner',
    description: 'Connecting out-of-town festival whānau with nearby South Wairarapa baches and eco-cabins.',
  },
  {
    id: 'corona',
    name: 'Corona',
    role: 'Plastic-Free Shoreline Partner',
    description: 'Supporting beach clean-up crews and sunset acoustic sessions with 100% aluminum-only bar service.',
  },
  {
    id: 'vodafone',
    name: 'Vodafone',
    role: 'Festival Connectivity Partner',
    description: 'Providing temporary coastal cellular towers for cashless vendor booths and emergency safety.',
  },
  {
    id: 'resene',
    name: 'Resene',
    role: 'Community Art & Mural Partner',
    description: 'Supplying low-VOC eco-paints for live coastal murals and interactive stage art installations.',
  },
  {
    id: 'nzmusic',
    name: 'NZ Music Month',
    role: 'Aotearoa Talent Partner',
    description: 'Championing emerging local bands, te reo Māori artists, and regional touring musicians.',
  },
  {
    id: 'auckland',
    name: 'Auckland Council',
    role: 'Cultural Arts Grant Supporter',
    description: 'Backing sustainable community arts programming and youth music workshops.',
  },
];
