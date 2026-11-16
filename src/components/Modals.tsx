import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Calendar,
  MapPin,
  Clock,
  Search,
  Download,
  Ticket,
  Sparkles,
  Leaf,
  Compass,
  Sun,
  Send,
  ChevronDown,
} from 'lucide-react';
import {
  ARTISTS,
  GALLERY_PHOTOS,
  TICKET_TIERS,
  FAQ_ITEMS,
  FESTIVAL_IMAGES,
  Artist,
  GalleryPhoto,
} from '../data/festivalData';
import { playArtistChordPreview, stopAudioPreview } from '../utils/audioPreview';
import type { ModalType } from './Navbar';

interface ModalShellProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  maxWidth?: string;
  children: React.ReactNode;
}

function ModalShell({
  title,
  subtitle,
  onClose,
  maxWidth = 'max-w-3xl',
  children,
}: ModalShellProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      stopAudioPreview();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#021C24]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full ${maxWidth} max-h-[90vh] flex flex-col rounded-2xl bg-[#F6F1E5] text-[#083543] shadow-2xl border border-[#0B4A5E]/15 overflow-hidden`}
      >
        <div className="flex items-start justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 bg-[#042D3A] text-white border-b border-white/10">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl leading-tight text-white">
              {title}
            </h3>
            {subtitle && <p className="text-xs sm:text-sm text-[#B8DDE3] mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-7 flex-1">{children}</div>
      </div>
    </div>
  );
}

interface AllModalsProps {
  activeModal: ModalType;
  modalTopic?: string;
  selectedArtist: Artist | null;
  selectedGalleryIndex: number | null;
  savedArtistIds: string[];
  onToggleSaveArtist: (id: string) => void;
  onSelectArtist: (artist: Artist) => void;
  onSelectGalleryIndex: (idx: number | null) => void;
  onClose: () => void;
}

export function FestivalModals({
  activeModal,
  modalTopic,
  selectedArtist,
  selectedGalleryIndex,
  savedArtistIds,
  onToggleSaveArtist,
  onSelectArtist,
  onSelectGalleryIndex,
  onClose,
}: AllModalsProps) {
  if (!activeModal) return null;

  switch (activeModal) {
    case 'tickets':
      return <TicketCheckoutModal onClose={onClose} />;
    case 'trailer':
      return <TrailerPlayerModal onClose={onClose} />;
    case 'full-lineup':
      return (
        <FullLineupModal
          savedArtistIds={savedArtistIds}
          onToggleSaveArtist={onToggleSaveArtist}
          onSelectArtist={onSelectArtist}
          onClose={onClose}
        />
      );
    case 'artist-detail':
      return selectedArtist ? (
        <ArtistDetailModal
          artist={selectedArtist}
          isSaved={savedArtistIds.includes(selectedArtist.id)}
          onToggleSave={() => onToggleSaveArtist(selectedArtist.id)}
          onClose={onClose}
        />
      ) : null;
    case 'gallery':
      return (
        <GalleryExplorerModal
          initialIndex={selectedGalleryIndex}
          onSelectIndex={onSelectGalleryIndex}
          onClose={onClose}
        />
      );
    case 'story':
      return <StoryModal initialTab={modalTopic} onClose={onClose} />;
    case 'faq':
      return <FaqModal onClose={onClose} />;
    case 'contact':
      return <ContactModal onClose={onClose} />;
    default:
      return null;
  }
}

function TicketCheckoutModal({ onClose }: { onClose: () => void }) {
  const [selectedTierId, setSelectedTierId] = useState<string>('weekend-camping');
  const [quantity, setQuantity] = useState<number>(2);
  const [includeShuttle, setIncludeShuttle] = useState<boolean>(true);
  const [includeCupKit, setIncludeCupKit] = useState<boolean>(true);
  const [step, setStep] = useState<'select' | 'details' | 'confirmed'>('select');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [bookingCode] = useState(() => `TB27-${Math.floor(1000 + Math.random() * 9000)}`);

  const selectedTier = TICKET_TIERS.find((t) => t.id === selectedTierId) ?? TICKET_TIERS[0];
  const baseTotal = selectedTier.price * quantity;
  const shuttleTotal = includeShuttle ? 45 * quantity : 0;
  const cupTotal = includeCupKit ? 18 * quantity : 0;
  const grandTotal = baseTotal + shuttleTotal + cupTotal;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fullName.trim().length < 2) {
      setFormError('Please enter your full name for the festival pass.');
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setFormError('Please enter a valid email address so we can send your passes.');
      return;
    }
    setFormError('');
    setStep('confirmed');
  };

  const handleDownloadPass = () => {
    const summary = [
      'TORA BOMBORA 2027 — FESTIVAL PASS CONFIRMATION',
      '================================================',
      `Booking Reference: ${bookingCode}`,
      `Attendee Name: ${fullName}`,
      `Email: ${email}`,
      `Pass Type: ${selectedTier.name} × ${quantity}`,
      `Wellington Eco-Shuttle: ${includeShuttle ? `Yes ($${shuttleTotal})` : 'No'}`,
      `Reusable Steel Cup Kit: ${includeCupKit ? `Yes ($${cupTotal})` : 'No'}`,
      `Total (NZD): $${grandTotal}`,
      'Dates: 29–31 January 2027 · Tora Coast, Wairarapa, Aotearoa',
    ].join('\n');
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bookingCode}-Tora-Bombora-Pass.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ModalShell
      title="Tora Bombora 2027 Passes"
      subtitle="29 – 31 January 2027 · Tora Coast, South Wairarapa, Aotearoa"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      {step === 'select' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {TICKET_TIERS.map((tier) => {
              const active = tier.id === selectedTierId;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    active
                      ? 'bg-white border-[#0A5A70] ring-2 ring-[#0A5A70]/25 shadow-sm'
                      : 'bg-white/70 border-[#0A4D61]/15 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-[#052E3B] text-base">{tier.name}</div>
                      <div className="text-xs text-[#2C5F6E] mt-0.5">{tier.subtitle}</div>
                    </div>
                    <span className="font-mono-tabular font-bold text-lg text-[#053B4C] shrink-0">
                      ${tier.price}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {tier.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-xs text-[#1E4F5E]">
                        <Check className="w-3.5 h-3.5 text-[#138A9A] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-2 border-t border-[#0A4D61]/10 flex items-center justify-between text-xs text-[#426E7B]">
                    <span>{tier.remaining} passes left</span>
                    {tier.badge && (
                      <span className="font-semibold text-[#A66E00]">{tier.badge}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quantity & Add-ons */}
          <div className="bg-white rounded-xl border border-[#0A4D61]/15 p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-sm text-[#052E3B]">Number of Passes</div>
                <div className="text-xs text-[#3C6875]">Includes zero-waste site levy</div>
              </div>
              <div className="inline-flex items-center gap-3 bg-[#F4EFE2] rounded-lg p-1 border border-[#0A4D61]/15">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-md bg-white text-[#052E3B] font-bold hover:bg-[#E7F3F5] transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-mono-tabular font-bold w-6 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(6, q + 1))}
                  className="w-8 h-8 rounded-md bg-white text-[#052E3B] font-bold hover:bg-[#E7F3F5] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#0A4D61]/10">
              <label className="flex items-start gap-3 p-3 rounded-lg bg-[#F9F6EE] border border-[#0A4D61]/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeShuttle}
                  onChange={(e) => setIncludeShuttle(e.target.checked)}
                  className="mt-0.5 accent-[#0A5A70] w-4 h-4"
                />
                <div className="text-xs">
                  <div className="font-semibold text-[#052E3B]">
                    Return Wellington Eco-Shuttle (+$45/person)
                  </div>
                  <div className="text-[#45707D] mt-0.5">
                    Direct coach from Wellington Railway Station & Martinborough
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg bg-[#F9F6EE] border border-[#0A4D61]/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCupKit}
                  onChange={(e) => setIncludeCupKit(e.target.checked)}
                  className="mt-0.5 accent-[#0A5A70] w-4 h-4"
                />
                <div className="text-xs">
                  <div className="font-semibold text-[#052E3B]">
                    Reusable Stainless Cup & Lanyard (+$18/person)
                  </div>
                  <div className="text-[#45707D] mt-0.5">
                    Required at festival bars for 100% plastic-free pours
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Summary Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#3F6B78] font-semibold">
                Total Estimate (NZD)
              </div>
              <div className="font-mono-tabular text-2xl font-bold text-[#052E3B]">
                ${grandTotal.toLocaleString()} NZD
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep('details')}
              className="px-6 py-3 rounded-full bg-[#F5BA2E] hover:bg-[#FFCA45] text-[#052935] font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Continue to Attendee Details →
            </button>
          </div>
        </div>
      )}

      {step === 'details' && (
        <form onSubmit={handleConfirm} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-white border border-[#0A4D61]/15 flex items-center justify-between text-sm">
            <div>
              <span className="font-bold">{selectedTier.name}</span> × {quantity}
            </div>
            <div className="font-mono-tabular font-bold">${grandTotal} NZD</div>
          </div>

          {formError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#083543] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aroha Henderson"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#0A4D61]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA3B1]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#083543] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aroha@example.co.nz"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#0A4D61]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA3B1]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#083543] mb-1">
                Mobile Phone (for SMS gate updates)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+64 21 555 0192"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#0A4D61]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA3B1]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#083543] mb-1">
                Camping / Accessibility Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Quiet family zone, gluten-free kai, etc."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#0A4D61]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA3B1]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={() => setStep('select')}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#083543] hover:bg-black/5 transition-colors"
            >
              ← Back to Passes
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#074B5E] hover:bg-[#0A627A] text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Reserve Festival Passes →
            </button>
          </div>
        </form>
      )}

      {step === 'confirmed' && (
        <div className="text-center py-4 space-y-5">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#138A9A]/15 text-[#0C6E7D] flex items-center justify-center">
            <Ticket className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#138A9A]">
              Pass Reservation Confirmed
            </div>
            <h4 className="font-display text-3xl text-[#052E3B] mt-1">
              See You on the Coast, {fullName.split(' ')[0]}!
            </h4>
            <p className="text-sm text-[#35616E] mt-1.5 max-w-md mx-auto">
              Your reservation confirmation has been prepared for <strong>{email}</strong>.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-xl border border-[#0A4D61]/15 p-4 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-[#45707D]">Booking Reference</span>
              <span className="font-mono-tabular font-bold text-[#052E3B]">{bookingCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#45707D]">Pass Selection</span>
              <span className="font-semibold">
                {selectedTier.name} × {quantity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#45707D]">Total Reserved</span>
              <span className="font-mono-tabular font-bold text-[#052E3B]">
                ${grandTotal} NZD
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleDownloadPass}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5BA2E] hover:bg-[#FFCA45] text-[#052935] font-bold text-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Pass Summary</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#074B5E] text-white font-semibold text-sm hover:bg-[#0A627A] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

function TrailerPlayerModal({ onClose }: { onClose: () => void }) {
  const chapters = [
    {
      title: '01. Golden Hour Main Stage',
      caption: 'Live coastal rhythms as the sun sets behind the Tora headland.',
      image: FESTIVAL_IMAGES.heroBeachStage,
      freqs: [220, 277.18, 329.63, 440],
    },
    {
      title: '02. A Community That Feels Like Home',
      caption: 'Thousands gathering barefoot along the shoreline for sunset sets.',
      image: FESTIVAL_IMAGES.aboutHeartHands,
      freqs: [261.63, 329.63, 392.0, 523.25],
    },
    {
      title: '03. Ridge Camping Over the Pacific',
      caption: 'Salt-air mornings overlooking breaking swells and green coastal hills.',
      image: FESTIVAL_IMAGES.galleryCoastalCampsite,
      freqs: [293.66, 369.99, 440.0, 587.33],
    },
    {
      title: '04. Midnight Lagoon Amphitheatre',
      caption: 'Laser beams, live electronic sets, and starry skies until dawn.',
      image: FESTIVAL_IMAGES.lineupElectronicDj,
      freqs: [196.0, 246.94, 293.66, 392.0],
    },
  ];

  const [chapterIdx, setChapterIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setChapterIdx((prev) => (prev + 1) % chapters.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [playing, chapters.length]);

  useEffect(() => {
    if (soundOn) {
      playArtistChordPreview(chapters[chapterIdx].freqs);
    } else {
      stopAudioPreview();
    }
  }, [soundOn, chapterIdx]);

  const current = chapters[chapterIdx];

  return (
    <ModalShell
      title="Tora Bombora — Official Festival Reel"
      subtitle="Highlights from the South Wairarapa Coast · 2024–2026"
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-4">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#03222C] shadow-lg">
          <img
            src={current.image}
            alt={current.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-wrap items-end justify-between gap-4 text-white">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#F5BA2E] font-bold">
                {current.title}
              </div>
              <p className="text-sm sm:text-base text-white/95 mt-1">{current.caption}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-semibold transition-colors"
              >
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{playing ? 'Pause Reel' : 'Play Reel'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSoundOn((s) => !s)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5BA2E] text-[#052935] text-xs font-bold hover:bg-[#FFCA45] transition-colors"
              >
                {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{soundOn ? 'Sound On' : 'Preview Audio'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chapter selector buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {chapters.map((ch, idx) => (
            <button
              key={ch.title}
              type="button"
              onClick={() => setChapterIdx(idx)}
              className={`text-left p-2.5 rounded-lg border text-xs transition-colors ${
                idx === chapterIdx
                  ? 'bg-[#074B5E] text-white border-[#074B5E]'
                  : 'bg-white text-[#083543] border-[#0A4D61]/15 hover:bg-[#E7F3F5]'
              }`}
            >
              <div className="font-bold truncate">{ch.title}</div>
            </button>
          ))}
        </div>
      </div>
    </ModalShell>
  );
}

function FullLineupModal({
  savedArtistIds,
  onToggleSaveArtist,
  onSelectArtist,
  onClose,
}: {
  savedArtistIds: string[];
  onToggleSaveArtist: (id: string) => void;
  onSelectArtist: (artist: Artist) => void;
  onClose: () => void;
}) {
  const [dayFilter, setDayFilter] = useState<'All' | 'Friday' | 'Saturday' | 'Sunday'>('All');
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered = ARTISTS.filter((artist) => {
    const matchDay = dayFilter === 'All' || artist.day === dayFilter;
    const matchStage = stageFilter === 'All' || artist.stage === stageFilter;
    const matchQuery =
      !query.trim() ||
      artist.name.toLowerCase().includes(query.toLowerCase()) ||
      artist.genre.toLowerCase().includes(query.toLowerCase()) ||
      artist.origin.toLowerCase().includes(query.toLowerCase());
    return matchDay && matchStage && matchQuery;
  });

  const handleAudioToggle = (artist: Artist) => {
    if (playingId === artist.id) {
      stopAudioPreview();
      setPlayingId(null);
    } else {
      setPlayingId(artist.id);
      playArtistChordPreview(artist.previewChordFreqs, () => setPlayingId(null));
    }
  };

  return (
    <ModalShell
      title="2027 Full Lineup & Set Times"
      subtitle={`Showing ${filtered.length} artists · ${savedArtistIds.length} saved to your schedule`}
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-5">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-[#0A4D61]/15">
            {(['All', 'Friday', 'Saturday', 'Sunday'] as const).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setDayFilter(day)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  dayFilter === day
                    ? 'bg-[#074B5E] text-white'
                    : 'text-[#1E4F5E] hover:bg-[#F4EFE2]'
                }`}
              >
                {day === 'All' ? 'All Days' : day}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              aria-label="Filter by stage"
              className="px-3 py-2 rounded-lg bg-white border border-[#0A4D61]/20 text-xs font-medium text-[#083543]"
            >
              <option value="All">All Stages</option>
              <option value="Main Beach Stage">Main Beach Stage</option>
              <option value="Pōhutukawa Grove">Pōhutukawa Grove</option>
              <option value="Lagoon Sound System">Lagoon Sound System</option>
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#45707D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artist or genre..."
                className="pl-8 pr-3 py-2 rounded-lg bg-white border border-[#0A4D61]/20 text-xs w-44 focus:outline-none focus:ring-2 focus:ring-[#1FA3B1]"
              />
            </div>
          </div>
        </div>

        {/* Artist List */}
        {filtered.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-[#0A4D61]/10">
            <p className="text-sm font-medium text-[#2C5F6E]">
              No artists match your current filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setDayFilter('All');
                setStageFilter('All');
                setQuery('');
              }}
              className="mt-2 text-xs font-bold text-[#0A5A70] underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filtered.map((artist) => {
              const saved = savedArtistIds.includes(artist.id);
              const isPlaying = playingId === artist.id;
              return (
                <div
                  key={artist.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-white border border-[#0A4D61]/15 shadow-xs hover:border-[#1FA3B1] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => onSelectArtist(artist)}
                    className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-[#053848]"
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectArtist(artist)}
                          className="font-bold text-sm text-[#052E3B] hover:text-[#0E7487] text-left truncate"
                        >
                          {artist.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleSaveArtist(artist.id)}
                          className={`p-1.5 rounded-md transition-colors shrink-0 ${
                            saved
                              ? 'bg-[#F5BA2E] text-[#052935]'
                              : 'bg-[#F4EFE2] text-[#3C6875] hover:text-[#052E3B]'
                          }`}
                          aria-label={saved ? 'Remove from my schedule' : 'Save to my schedule'}
                          title={saved ? 'Saved in My Schedule' : 'Save to My Schedule'}
                        >
                          <Bookmark className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <div className="text-xs text-[#3C6875] mt-0.5">
                        {artist.genre} · {artist.origin}
                      </div>
                      <div className="text-xs font-medium text-[#0C5E70] mt-1">
                        {artist.day} · {artist.time} · {artist.stage}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => handleAudioToggle(artist)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                          isPlaying
                            ? 'bg-[#1FA3B1] text-white'
                            : 'bg-[#E7F3F5] text-[#083B4A] hover:bg-[#D4EBEF]'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        <span>{isPlaying ? 'Stop Sound' : 'Audio Preview'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectArtist(artist)}
                        className="text-[11px] font-semibold text-[#083B4A] hover:underline"
                      >
                        Artist Bio →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ModalShell>
  );
}

function ArtistDetailModal({
  artist,
  isSaved,
  onToggleSave,
  onClose,
}: {
  artist: Artist;
  isSaved: boolean;
  onToggleSave: () => void;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    if (playing) {
      stopAudioPreview();
      setPlaying(false);
    } else {
      setPlaying(true);
      playArtistChordPreview(artist.previewChordFreqs, () => setPlaying(false));
    }
  };

  return (
    <ModalShell title={artist.name} subtitle={`${artist.genre} · ${artist.origin}`} onClose={onClose} maxWidth="max-w-2xl">
      <div className="space-y-5">
        <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#042C39]">
          <img
            src={artist.image}
            alt={artist.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white border border-[#0A4D61]/15 flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#1FA3B1] shrink-0" />
            <div>
              <div className="text-[#45707D]">Day</div>
              <div className="font-bold text-[#052E3B]">{artist.day}</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#0A4D61]/15 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#1FA3B1] shrink-0" />
            <div>
              <div className="text-[#45707D]">Set Time</div>
              <div className="font-bold text-[#052E3B]">{artist.time}</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#0A4D61]/15 flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#1FA3B1] shrink-0" />
            <div>
              <div className="text-[#45707D]">Stage</div>
              <div className="font-bold text-[#052E3B]">{artist.stage}</div>
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-[#144453]">{artist.bio}</p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={toggleAudio}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              playing
                ? 'bg-[#1FA3B1] text-white'
                : 'bg-[#074B5E] hover:bg-[#0A627A] text-white'
            }`}
          >
            {playing ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{playing ? 'Playing Soundscape...' : 'Listen to Sound Preview'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleSave}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#F5BA2E] border-[#F5BA2E] text-[#052935]'
                : 'bg-white border-[#0A4D61]/25 text-[#083543] hover:bg-[#E7F3F5]'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved in Schedule' : 'Save Set to Schedule'}</span>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function GalleryExplorerModal({
  initialIndex,
  onSelectIndex,
  onClose,
}: {
  initialIndex: number | null;
  onSelectIndex: (idx: number | null) => void;
  onClose: () => void;
}) {
  const [yearFilter, setYearFilter] = useState<'All' | '2026' | '2025' | '2024'>('All');

  const filteredPhotos: GalleryPhoto[] =
    yearFilter === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.year === yearFilter);

  const activePhoto =
    initialIndex !== null && GALLERY_PHOTOS[initialIndex] ? GALLERY_PHOTOS[initialIndex] : null;

  useEffect(() => {
    if (initialIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        onSelectIndex((initialIndex + 1) % GALLERY_PHOTOS.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((initialIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [initialIndex, onSelectIndex]);

  return (
    <ModalShell
      title="Tora Bombora Festival Gallery"
      subtitle="Memories from the South Wairarapa coastline"
      onClose={onClose}
      maxWidth="max-w-4xl"
    >
      {activePhoto ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onSelectIndex(null)}
              className="text-xs font-bold text-[#074B5E] hover:underline"
            >
              ← Back to All Photos
            </button>
            <span className="text-xs font-mono-tabular text-[#45707D]">
              {(initialIndex ?? 0) + 1} / {GALLERY_PHOTOS.length}
            </span>
          </div>

          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#03222C]">
            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() =>
                onSelectIndex(
                  ((initialIndex ?? 0) - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onSelectIndex(((initialIndex ?? 0) + 1) % GALLERY_PHOTOS.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#0A4D61]/15">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-bold text-base text-[#052E3B]">{activePhoto.title}</h4>
              <span className="text-xs font-medium text-[#3C6875]">
                {activePhoto.location} · {activePhoto.year} Edition
              </span>
            </div>
            <p className="text-sm text-[#1E4F5E] mt-1">{activePhoto.caption}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {(['All', '2026', '2025', '2024'] as const).map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setYearFilter(yr)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  yearFilter === yr
                    ? 'bg-[#074B5E] text-white'
                    : 'bg-white text-[#1E4F5E] border border-[#0A4D61]/15 hover:bg-[#E7F3F5]'
                }`}
              >
                {yr === 'All' ? 'All Editions' : `${yr} Archive`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {filteredPhotos.map((photo) => {
              const globalIdx = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => onSelectIndex(globalIdx)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#042C39] text-left"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: photo.objectPosition ?? 'center' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                    <span className="text-white text-xs font-bold leading-tight">
                      {photo.title}
                    </span>
                    <span className="text-[#F5BA2E] text-[10px] font-medium">
                      {photo.year} Edition
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </ModalShell>
  );
}

function StoryModal({ initialTab, onClose }: { initialTab?: string; onClose: () => void }) {
  const tabs = [
    {
      id: 'roots',
      label: 'Our Roots',
      icon: Sparkles,
      heading: 'Born on the Wild Wairarapa Coast',
      body: 'What began as a humble driftwood stage and solar generator among friends has grown into Aotearoa’s most cherished boutique coastal gathering. Every January, we return to Tora with a strict 2,500-person capacity so the land, ocean, and community stay intimate.',
      bullets: [
        'Three stages nestled between ocean dunes and native coastal bush',
        'Curated mix of Aotearoa icons, rising te reo artists, and global selectors',
        'Community-led safety, whānau respect, and zero-ego dancefloors',
      ],
    },
    {
      id: 'camping',
      label: 'Camping',
      icon: Compass,
      heading: 'Ocean-View Ridge Camping',
      body: 'Pitch your tent on rolling coastal pastures overlooking the South Pacific swell. Wake up to salt air, dawn surf breaks, and freshly brewed barista coffee within steps of your tent.',
      bullets: [
        'Dedicated Quiet Whānau Zone & Late-Night Owls Zone',
        'Solar-heated outdoor showers and shaded water refill stations',
        'Self-contained campervan paddocks with direct beach trail access',
      ],
    },
    {
      id: 'wellness',
      label: 'Wellness & Surf',
      icon: Sun,
      heading: 'Mind, Body & Ocean Rhythm',
      body: 'Tora Bombora begins well before the evening bass drops. Mornings open with guided breathwork, coastal yoga, cold-water ocean plunges, and acoustic workshops.',
      bullets: [
        'Daily 7:30 AM beachside Vinyasa & sound-bath sessions',
        'Guided coastal foraging & harbour ecology walks',
        'Wood-fired cedar barrel saunas beside the lagoon',
      ],
    },
    {
      id: 'sustainability',
      label: 'Sustainability',
      icon: Leaf,
      heading: 'Leave a Positive Footprint',
      body: 'As kaitiaki of this coastline for three days each summer, leaving Tora cleaner than we found it is non-negotiable. Every stage, kitchen, and bar operates under our Zero-Waste Charter.',
      bullets: [
        '100% solar-hybrid battery arrays powering daytime stages',
        'Zero single-use plastics — reusable stainless cups across all bars',
        'Free native coastal planting session on Sunday afternoon',
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(
    tabs.some((t) => t.id === initialTab) ? initialTab! : 'roots'
  );
  const current = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <ModalShell
      title="Inside Tora Bombora"
      subtitle="Music · Community · Place · Kaitiakitanga"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  active
                    ? 'bg-[#074B5E] text-white'
                    : 'bg-white text-[#1E4F5E] border border-[#0A4D61]/15 hover:bg-[#E7F3F5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-[#0A4D61]/15 p-5 sm:p-6 space-y-4">
          <h4 className="font-display text-2xl sm:text-3xl text-[#052E3B]">{current.heading}</h4>
          <p className="text-sm sm:text-base leading-relaxed text-[#22515E]">{current.body}</p>
          <ul className="space-y-2 pt-2">
            {current.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-[#083543]">
                <Check className="w-4 h-4 text-[#138A9A] shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ModalShell>
  );
}

function FaqModal({ onClose }: { onClose: () => void }) {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const [category, setCategory] = useState<string>('All');

  const items =
    category === 'All' ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.category === category);

  return (
    <ModalShell
      title="Frequently Asked Questions"
      subtitle="Everything you need to prepare for Tora Coast 2027"
      onClose={onClose}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Tickets', 'Camping', 'Sustainability', 'Getting There'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setOpenIdx(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                category === cat
                  ? 'bg-[#074B5E] text-white'
                  : 'bg-white text-[#1E4F5E] border border-[#0A4D61]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2.5">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.question}
                className="rounded-xl bg-white border border-[#0A4D61]/15 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left font-bold text-sm text-[#052E3B] hover:bg-[#F9F6EE] transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-sm text-[#2A5967] leading-relaxed border-t border-[#0A4D61]/10 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ModalShell>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.trim().length < 2) {
      setError('Please enter your name.');
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Please include a brief message (at least 10 characters).');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <ModalShell
      title="Contact & Community Inquiries"
      subtitle="Artist submissions, kai stalls, volunteers & accessibility support"
      onClose={onClose}
      maxWidth="max-w-xl"
    >
      {sent ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#138A9A]/15 text-[#0C6E7D] flex items-center justify-center">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="font-display text-2xl text-[#052E3B]">Kia Ora, {name}!</h4>
          <p className="text-sm text-[#2A5967] max-w-sm mx-auto">
            Thanks for reaching out about <strong>{topic}</strong>. Our Wellington festival crew
            will reply to <strong>{email}</strong> within 2 business days.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#074B5E] text-white font-bold text-sm hover:bg-[#0A627A] transition-colors"
          >
            Back to Festival
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nikau Taylor"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#0A4D61]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA3B1]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nikau@example.co.nz"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#0A4D61]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA3B1]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Inquiry Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#0A4D61]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA3B1]"
            >
              <option>General Inquiry</option>
              <option>Volunteer & Zero-Waste Crew</option>
              <option>Food Stall / Artisan Vendor</option>
              <option>Artist & Performer Submission</option>
              <option>Accessibility & Whānau Support</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Message *</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us how you'd like to connect or be involved in Tora Bombora 2027..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#0A4D61]/25 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA3B1]"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F5BA2E] hover:bg-[#FFCA45] text-[#052935] font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </ModalShell>
  );
}
