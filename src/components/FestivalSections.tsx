import React, { useState, useEffect } from 'react';
import {
  Music,
  Users,
  Mountain,
  Leaf,
  ArrowRight,
  Play,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  Bookmark,
} from 'lucide-react';
import {
  ARTISTS,
  GALLERY_PHOTOS,
  TESTIMONIALS,
  PARTNERS,
  FESTIVAL_IMAGES,
  Artist,
  PartnerInfo,
} from '../data/festivalData';
import {
  ToraLogo,
  HeroWaveCrest,
  HeroWaveDivider,
  PalmLeftSilhouette,
  CoastalWaveIllustration,
  BrushDividerHeading,
  FooterTopWave,
} from './CoastalArt';
import type { ModalType } from './Navbar';

interface SectionsProps {
  savedArtistIds: string[];
  onNavigateSection: (id: string) => void;
  onOpenModal: (modal: ModalType, topic?: string) => void;
  onSelectArtist: (artist: Artist) => void;
  onSelectGalleryIndex: (idx: number | null) => void;
}

export function HeroSection({ onOpenModal }: Pick<SectionsProps, 'onOpenModal'>) {
  return (
    <section id="top" className="relative bg-[#032632] text-white overflow-hidden">
      {/* Background Coastal Stage Photography */}
      <div className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[670px] flex items-center pt-20 pb-24 sm:pb-28">
        <img
          src={FESTIVAL_IMAGES.heroBeachStage}
          alt="Tora Bombora coastal festival stage at golden hour sunset"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Measured contrast scrims */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#02212D]/95 via-[#043647]/65 to-[#043647]/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#032A36]/75 via-transparent to-[#021E28]/55"
          aria-hidden="true"
        />

        {/* Left Palm Tree Silhouette */}
        <div className="absolute left-0 top-10 sm:top-8 z-10 pointer-events-none opacity-85">
          <PalmLeftSilhouette />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-xl">
            {/* Cresting Wave Graphic above Tora Bombora */}
            <div className="ml-24 sm:ml-36 -mb-3 sm:-mb-4">
              <HeroWaveCrest />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[72px] leading-[0.94] tracking-wide text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
              <span className="block">TORA</span>
              <span className="block -mt-1">BOMBORA</span>
            </h1>

            <p className="mt-3 text-xs sm:text-sm font-bold tracking-[0.22em] text-[#E9F6F8] uppercase">
              Music <span className="text-[#35C9D8] mx-1">•</span> Community{' '}
              <span className="text-[#35C9D8] mx-1">•</span> Aotearoa
            </p>

            <p className="font-display text-2xl sm:text-3xl text-[#F5BA2E] mt-2.5 drop-shadow-sm">
              A Festival for the Soul
            </p>

            {/* Primary & Secondary Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onOpenModal('tickets')}
                className="whitespace-nowrap shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5BA2E] hover:bg-[#FFCA45] text-[#042834] font-bold text-sm sm:text-[15px] shadow-lg transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Get Tickets</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenModal('trailer')}
                className="whitespace-nowrap shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#042834]/80 hover:bg-[#063A4B] text-white border border-white/45 font-semibold text-sm sm:text-[15px] backdrop-blur-sm shadow-lg transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5BA2E]"
              >
                <span className="w-5 h-5 rounded-full bg-white text-[#042834] flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Organic Crashing Wave Bottom Divider */}
      <HeroWaveDivider />
    </section>
  );
}

export function ValuePillarsStrip({
  onNavigateSection,
  onOpenModal,
}: Pick<SectionsProps, 'onNavigateSection' | 'onOpenModal'>) {
  const pillars = [
    {
      icon: Music,
      title: 'World-Class Music',
      subtitle: 'Live performances all weekend',
      action: () => onNavigateSection('lineup'),
    },
    {
      icon: Users,
      title: 'Vibrant Community',
      subtitle: 'Connect · Celebrate · Belong',
      action: () => onOpenModal('story', 'roots'),
    },
    {
      icon: Mountain,
      title: 'Stunning Location',
      subtitle: 'Beach, Nature & Good Vibes',
      action: () => onOpenModal('story', 'camping'),
    },
    {
      icon: Leaf,
      title: 'Sustainable Festival',
      subtitle: 'Leave a Positive Footprint',
      action: () => onOpenModal('story', 'sustainability'),
    },
  ];

  return (
    <section className="coastal-paper border-b border-[#0B4A5E]/10 py-6 sm:py-7">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#0B4A5E]/15">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <button
                key={pillar.title}
                type="button"
                onClick={pillar.action}
                className="group flex items-center gap-3.5 px-4 py-3 sm:py-1 text-left hover:bg-[#0A5A70]/5 rounded-lg sm:rounded-none transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#094C5F]/10 text-[#094C5F] group-hover:bg-[#094C5F] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-[15px] text-[#073A4A] leading-snug">
                    {pillar.title}
                  </div>
                  <div className="text-xs text-[#2B5C6B] mt-0.5 truncate">{pillar.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ onOpenModal }: Pick<SectionsProps, 'onOpenModal'>) {
  return (
    <section id="about" className="relative coastal-paper py-12 sm:py-16 overflow-hidden">
      {/* Right-side coastal wave & palm vector art */}
      <div className="hidden md:block absolute right-0 bottom-0 opacity-90 pointer-events-none">
        <CoastalWaveIllustration />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Distressed Heart-Hands Photo Frame */}
          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() => onOpenModal('story', 'roots')}
              className="group relative block w-full rounded-2xl overflow-hidden bg-white p-2 sm:p-2.5 brush-frame border border-[#0B4A5E]/10 -rotate-1 hover:rotate-0 transition-transform duration-300 text-left cursor-pointer"
              aria-label="Read the story about Tora Bombora"
            >
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#042C39]">
                <img
                  src={FESTIVAL_IMAGES.aboutHeartHands}
                  alt="Festival goer making heart hands at sunset over coastal crowd"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3.5 right-4 sm:bottom-5 sm:right-6 text-right">
                  <span className="font-display text-2xl sm:text-3xl text-white drop-shadow-md leading-none block">
                    About
                  </span>
                  <span className="font-display text-2xl sm:text-3xl text-white drop-shadow-md leading-none block">
                    Tora Bombora
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Right Editorial Narrative */}
          <div className="lg:col-span-6 space-y-4">
            <h2
              className="font-display text-3xl sm:text-4xl md:text-[42px] text-[#073B4B] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              More Than a Music Festival
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#1A4B5A] max-w-xl">
              Tora Bombora is a celebration of music, people and place – set on the stunning
              coastline of Aotearoa. Join us for an unforgettable experience filled with live
              music, art, wellness, and a community that feels like home.
            </p>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => onOpenModal('story', 'roots')}
                className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#063F51] hover:bg-[#0A5A70] text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LineupSection({
  savedArtistIds,
  onSelectArtist,
  onOpenModal,
}: Pick<SectionsProps, 'savedArtistIds' | 'onSelectArtist' | 'onOpenModal'>) {
  const featuredArtists = ARTISTS.filter((a) => a.featured).slice(0, 5);

  return (
    <section id="lineup" className="coastal-paper py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <BrushDividerHeading
          title="Our Lineup"
          subtitle="An incredible mix of local and international artists"
        />

        {/* 5-Column Featured Artist Strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {featuredArtists.map((artist) => {
            const isSaved = savedArtistIds.includes(artist.id);
            return (
              <button
                key={artist.id}
                type="button"
                onClick={() => onSelectArtist(artist)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#042C39] shadow-md border border-[#0B4A5E]/15 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA3B1]"
              >
                <img
                  src={artist.image}
                  alt={`${artist.name} performing live`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
                {isSaved && (
                  <span
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-[#F5BA2E] text-[#052935] shadow-sm"
                    title="Saved to your schedule"
                  >
                    <Bookmark className="w-3 h-3 fill-current" />
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 text-white">
                  <div className="font-bold text-xs sm:text-sm leading-tight truncate">
                    {artist.name}
                  </div>
                  <div className="text-[11px] text-[#9FE6EE] truncate mt-0.5">
                    {artist.day} · {artist.genre}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenModal('full-lineup')}
            className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0C5E72] hover:bg-[#11778F] text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
          >
            <span>View Full Lineup</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {savedArtistIds.length > 0 && (
            <button
              type="button"
              onClick={() => onOpenModal('full-lineup')}
              className="text-xs font-semibold text-[#0C5E72] hover:underline"
            >
              {savedArtistIds.length} artist{savedArtistIds.length > 1 ? 's' : ''} saved to your
              personal schedule
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function CountdownBanner({ onOpenModal }: Pick<SectionsProps, 'onOpenModal'>) {
  // Target: 29 January 2027 12:00 NZDT
  const calculateTimeLeft = () => {
    const target = new Date('2027-01-29T12:00:00+13:00').getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
      min: Math.floor((diff / (1000 * 60)) % 60),
      sec: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const rings = [
    { label: 'days', value: String(timeLeft.days).padStart(2, '0'), highlight: false },
    { label: 'hrs', value: String(timeLeft.hrs).padStart(2, '0'), highlight: true },
    { label: 'min', value: String(timeLeft.min).padStart(2, '0'), highlight: false },
    { label: 'sec', value: String(timeLeft.sec).padStart(2, '0'), highlight: false },
  ];

  return (
    <section
      id="countdown"
      className="relative ocean-canvas text-white py-10 sm:py-12 overflow-hidden border-y-4 border-[#1EA6B5]/40"
    >
      {/* Subtle decorative palm silhouettes left & right */}
      <div className="hidden lg:block absolute -left-10 -top-6 opacity-30 pointer-events-none">
        <PalmLeftSilhouette />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: 2027 Edition */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl text-white">2027</span>
              <span className="text-sm sm:text-base font-extrabold tracking-widest uppercase text-[#B5EBF0]">
                Edition
              </span>
            </div>
            <div className="font-display text-xl sm:text-2xl text-[#F5BA2E] -mt-0.5">
              Mark Your Calendar!
            </div>
          </div>
        </div>

        {/* Center: Live Circular Countdown Rings */}
        <div className="flex items-center gap-3 sm:gap-4">
          {rings.map((ring) => (
            <div
              key={ring.label}
              className={`w-[70px] h-[70px] sm:w-[82px] sm:h-[82px] rounded-full flex flex-col items-center justify-center bg-[#032632]/75 border-2 shadow-inner ${
                ring.highlight
                  ? 'border-[#F5BA2E] shadow-[0_0_18px_rgba(245,186,46,0.28)]'
                  : 'border-[#27C2D1] shadow-[0_0_16px_rgba(39,194,209,0.22)]'
              }`}
            >
              <span className="font-mono-tabular text-xl sm:text-2xl font-bold text-white leading-none">
                {ring.value}
              </span>
              <span className="text-[11px] text-[#B7E8EE] mt-1 font-medium">{ring.label}</span>
            </div>
          ))}
        </div>

        {/* Right: Join the Journey CTA */}
        <div className="flex flex-col items-center lg:items-end">
          <button
            type="button"
            onClick={() => onOpenModal('tickets')}
            className="px-6 py-2.5 rounded-lg bg-[#F5BA2E] hover:bg-[#FFCA45] text-[#042834] font-display text-2xl shadow-lg -rotate-2 hover:rotate-0 transition-transform duration-150 cursor-pointer"
          >
            Join the Journey
          </button>
          <span className="font-display text-lg text-[#CBE8EC] mt-1.5">
            Be part of the magic!
          </span>
        </div>
      </div>
    </section>
  );
}

export function GalleryAndCommunitySection({
  onOpenModal,
  onSelectGalleryIndex,
}: Pick<SectionsProps, 'onOpenModal' | 'onSelectGalleryIndex'>) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const current = TESTIMONIALS[activeTestimonial];

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="gallery" className="coastal-paper py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left: Festival Gallery 4x2 Grid */}
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl sm:text-4xl text-[#073B4B]">Festival Gallery</h2>
            <p className="text-sm text-[#285966] mt-0.5 font-medium">Relive the memories!</p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {GALLERY_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => {
                    onSelectGalleryIndex(idx);
                    onOpenModal('gallery');
                  }}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-[#042C39] shadow-sm border border-[#0B4A5E]/15 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA3B1]"
                  aria-label={`View photo: ${photo.title}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: photo.objectPosition ?? 'center' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  onSelectGalleryIndex(null);
                  onOpenModal('gallery');
                }}
                className="whitespace-nowrap inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0C6A7E] hover:bg-[#118199] text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
              >
                <span>View Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: What Our Community Says */}
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl sm:text-4xl text-[#073B4B]">
              What Our Community Says
            </h2>
            <p className="text-sm text-[#285966] mt-0.5 font-medium">Real stories. Real vibes.</p>

            <div className="relative mt-4">
              <div className="bg-[#FCF9F1] rounded-2xl border border-[#0B4A5E]/12 shadow-sm px-6 sm:px-10 py-6 sm:py-8 min-h-[210px] flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
                <img
                  src={current.avatar}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-md shrink-0"
                />
                <div className="text-center sm:text-left">
                  <blockquote className="text-sm sm:text-base italic leading-relaxed text-[#0B3C4B] font-medium">
                    “{current.quote}”
                  </blockquote>
                  <div className="mt-3 font-bold text-sm text-[#073B4B]">– {current.name}</div>
                  <div className="text-xs text-[#3C6875]">
                    {current.role} · {current.hometown}
                  </div>
                </div>
              </div>

              {/* Carousel Prev/Next Controls */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-[#0B4A5E]/15 shadow-md text-[#073B4B] hover:bg-[#E7F3F5] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-[#0B4A5E]/15 shadow-md text-[#073B4B] hover:bg-[#E7F3F5] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`View story from ${t.name}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === activeTestimonial
                      ? 'w-6 bg-[#138A9A]'
                      : 'w-2.5 bg-[#0B4A5E]/25 hover:bg-[#0B4A5E]/45'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  const [selectedPartner, setSelectedPartner] = useState<PartnerInfo | null>(null);

  return (
    <section className="coastal-paper pt-4 pb-12 sm:pb-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <BrushDividerHeading title="Our Partners" />

        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center divide-y sm:divide-y-0 sm:divide-x divide-[#0B4A5E]/15">
          {PARTNERS.map((partner) => {
            const active = selectedPartner?.id === partner.id;
            return (
              <button
                key={partner.id}
                type="button"
                onClick={() => setSelectedPartner(active ? null : partner)}
                className={`px-4 py-3 flex items-center justify-center transition-opacity cursor-pointer ${
                  active ? 'opacity-100 bg-white/70 rounded-lg' : 'opacity-85 hover:opacity-100'
                }`}
              >
                {partner.id === 'airbnb' && (
                  <span className="font-bold text-lg tracking-tight text-[#FF5A5F]">airbnb</span>
                )}
                {partner.id === 'corona' && (
                  <span className="font-serif font-extrabold text-lg tracking-tight text-[#0C2B54] border-b-2 border-[#F5BA2E]">
                    Corona
                  </span>
                )}
                {partner.id === 'vodafone' && (
                  <span className="font-bold text-lg tracking-tight text-[#E60000]">vodafone</span>
                )}
                {partner.id === 'resene' && (
                  <span className="font-serif font-extrabold text-lg text-[#1A1A1A]">Resene</span>
                )}
                {partner.id === 'nzmusic' && (
                  <span className="font-extrabold text-xs tracking-wider uppercase leading-tight text-[#111827] text-center">
                    NZ MUSIC
                    <br />
                    MONTH
                  </span>
                )}
                {partner.id === 'auckland' && (
                  <span className="font-bold text-xs leading-tight text-[#0D4A5E] text-center">
                    Auckland
                    <br />
                    Council
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedPartner && (
          <div className="mt-4 max-w-xl mx-auto bg-white/85 border border-[#0B4A5E]/15 rounded-xl px-4 py-3 text-center text-xs sm:text-sm text-[#083543]">
            <span className="font-bold">{selectedPartner.name}</span> —{' '}
            <span className="font-semibold text-[#0C6A7E]">{selectedPartner.role}:</span>{' '}
            {selectedPartner.description}
          </div>
        )}
      </div>
    </section>
  );
}

export function FooterSection({
  onNavigateSection,
  onOpenModal,
}: Pick<SectionsProps, 'onNavigateSection' | 'onOpenModal'>) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'subscribed'>('idle');
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus('error');
      return;
    }
    setStatus('subscribed');
    setEmail('');
  };

  const triggerSocialNotice = (platform: string) => {
    setSocialNotice(`Tora Bombora ${platform} — 2027 Summer Playlist & Coastal Updates Ready`);
    window.setTimeout(() => setSocialNotice(null), 3500);
  };

  return (
    <footer className="relative bg-[#F5F0E3]">
      <FooterTopWave />

      <div className="bg-[#032C38] text-white pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-white/10">
            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => onNavigateSection('top')}
              className="shrink-0 cursor-pointer"
              aria-label="Back to top"
            >
              <ToraLogo />
            </button>

            {/* Footer Nav Links */}
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#D6EEF2] font-medium">
              <button
                type="button"
                onClick={() => onNavigateSection('top')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => onOpenModal('story', 'roots')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Festival
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('lineup')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Lineup
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('gallery')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Gallery
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('about')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => onOpenModal('faq')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                FAQ
              </button>
              <button
                type="button"
                onClick={() => onOpenModal('contact')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { name: 'Facebook', label: 'f' },
                { name: 'Instagram', label: 'ig' },
                { name: 'YouTube', label: 'yt' },
                { name: 'Spotify', label: 'sp' },
              ].map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => triggerSocialNotice(s.name)}
                  aria-label={`Tora Bombora on ${s.name}`}
                  className="w-8 h-8 rounded-full bg-white text-[#032C38] hover:bg-[#F5BA2E] font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Stay in the Loop Newsletter */}
            <div className="w-full lg:w-auto lg:min-w-[300px]">
              <div className="font-bold text-sm text-white">Stay in the Loop</div>
              <p className="text-xs text-[#A9D5DC] mt-0.5">
                Get the latest updates and festival news.
              </p>

              {status === 'subscribed' ? (
                <div className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#138A9A]/30 border border-[#35C9D8]/50 text-xs font-semibold text-[#DDF7FA]">
                  <Check className="w-4 h-4 text-[#F5BA2E]" />
                  <span>You’re on the Tora Bombora coastal list!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-2.5 flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Your Email Address"
                    aria-label="Your Email Address"
                    className="flex-1 min-w-0 px-3 py-2 rounded-md bg-white text-[#052935] text-xs placeholder:text-[#5B7E88] focus:outline-none focus:ring-2 focus:ring-[#F5BA2E]"
                  />
                  <button
                    type="submit"
                    className="whitespace-nowrap shrink-0 px-4 py-2 rounded-md bg-[#F5BA2E] hover:bg-[#FFCA45] text-[#042834] font-bold text-xs transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-[11px] text-[#FFD166] mt-1">
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </div>

          {socialNotice && (
            <div className="mt-4 text-center text-xs text-[#F5BA2E] font-medium">
              {socialNotice}
            </div>
          )}

          {/* Bottom Legal Line */}
          <div className="pt-6 text-center text-xs text-[#9CC7CE]">
            © 2027 Tora Bombora. All rights reserved. <span className="mx-2">|</span> A Festival
            for the Soul
          </div>
        </div>
      </div>
    </footer>
  );
}
