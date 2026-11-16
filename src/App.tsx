import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, ModalType } from './components/Navbar';
import {
  HeroSection,
  ValuePillarsStrip,
  AboutSection,
  LineupSection,
  CountdownBanner,
  GalleryAndCommunitySection,
  PartnersSection,
  FooterSection,
} from './components/FestivalSections';
import { FestivalModals } from './components/Modals';
import { Artist } from './data/festivalData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalTopic, setModalTopic] = useState<string | undefined>(undefined);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
  const [savedArtistIds, setSavedArtistIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('tora_bombora_saved_artists');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tora_bombora_saved_artists', JSON.stringify(savedArtistIds));
    } catch {
      // ignore storage errors
    }
  }, [savedArtistIds]);

  useEffect(() => {
    const sections = ['top', 'about', 'lineup', 'countdown', 'gallery'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -72;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const handleOpenModal = useCallback((modal: ModalType, topic?: string) => {
    setModalTopic(topic);
    setActiveModal(modal);
  }, []);

  const handleSelectArtist = useCallback((artist: Artist) => {
    setSelectedArtist(artist);
    setActiveModal('artist-detail');
  }, []);

  const handleToggleSaveArtist = useCallback((artistId: string) => {
    setSavedArtistIds((prev) =>
      prev.includes(artistId) ? prev.filter((id) => id !== artistId) : [...prev, artistId]
    );
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
    setModalTopic(undefined);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E3] text-[#083543]">
      <Navbar
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onOpenModal={handleOpenModal}
      />

      <main className="flex-1">
        <HeroSection onOpenModal={handleOpenModal} />

        <ValuePillarsStrip
          onNavigateSection={handleNavigateSection}
          onOpenModal={handleOpenModal}
        />

        <AboutSection onOpenModal={handleOpenModal} />

        <LineupSection
          savedArtistIds={savedArtistIds}
          onSelectArtist={handleSelectArtist}
          onOpenModal={handleOpenModal}
        />

        <CountdownBanner onOpenModal={handleOpenModal} />

        <GalleryAndCommunitySection
          onOpenModal={handleOpenModal}
          onSelectGalleryIndex={setSelectedGalleryIndex}
        />

        <PartnersSection />
      </main>

      <FooterSection
        onNavigateSection={handleNavigateSection}
        onOpenModal={handleOpenModal}
      />

      <FestivalModals
        activeModal={activeModal}
        modalTopic={modalTopic}
        selectedArtist={selectedArtist}
        selectedGalleryIndex={selectedGalleryIndex}
        savedArtistIds={savedArtistIds}
        onToggleSaveArtist={handleToggleSaveArtist}
        onSelectArtist={handleSelectArtist}
        onSelectGalleryIndex={setSelectedGalleryIndex}
        onClose={handleCloseModal}
      />
    </div>
  );
}
