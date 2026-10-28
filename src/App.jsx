import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, Shield, FileText, Camera, MapPin, ClipboardCheck, 
  Download, HelpCircle, Search, Menu, X, ExternalLink, 
  ChevronRight, ChevronLeft, Globe, BookOpen, Layers
} from 'lucide-react';
import { chaptersId } from './data/chaptersId';
import { chaptersEn } from './data/chaptersEn';
import logoImg from './assets/logo_baru.png';

export default function App() {
  // Detect language from URL parameter (?lang=en) or default to ID
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en') return 'en';
    }
    return 'id';
  });

  const [activeChapterId, setActiveChapterId] = useState('quickstart');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Active chapters based on chosen language
  const chapters = useMemo(() => {
    return lang === 'en' ? chaptersEn : chaptersId;
  }, [lang]);

  // Handle language switch
  const handleSwitchLanguage = (newLang) => {
    setLang(newLang);
    const url = new URL(window.location.href);
    if (newLang === 'en') {
      url.searchParams.set('lang', 'en');
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', url);
  };

  const activeChapter = useMemo(() => {
    return chapters.find((c) => c.id === activeChapterId) || chapters[0];
  }, [chapters, activeChapterId]);

  const activeIndex = useMemo(() => {
    return chapters.findIndex((c) => c.id === activeChapter.id);
  }, [chapters, activeChapter]);

  const prevChapter = activeIndex > 0 ? chapters[activeIndex - 1] : null;
  const nextChapter = activeIndex < chapters.length - 1 ? chapters[activeIndex + 1] : null;

  // Filtered chapters for search
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters;
    const q = searchQuery.toLowerCase();
    return chapters.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.content.toLowerCase().includes(q)
    );
  }, [chapters, searchQuery]);

  // Icon resolver
  const getIcon = (name) => {
    const props = { size: 16 };
    switch (name) {
      case 'Zap': return <Zap {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Camera': return <Camera {...props} />;
      case 'MapPin': return <MapPin {...props} />;
      case 'ClipboardCheck': return <ClipboardCheck {...props} />;
      case 'Download': return <Download {...props} />;
      case 'HelpCircle': return <HelpCircle {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  // Helper parser for markdown content
  const renderFormattedContent = (text) => {
    const lines = text.trim().split('\n');
    const elements = [];
    let tableBuffer = [];
    let inTable = false;

    lines.forEach((line, index) => {
      // Table detection
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        tableBuffer.push(line.trim());
        return;
      } else if (inTable) {
        elements.push(renderTable(tableBuffer, `table-${index}`));
        tableBuffer = [];
        inTable = false;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="content-h3">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={index} className="content-h4">
            {line.replace('#### ', '')}
          </h4>
        );
      } else if (line.startsWith('> [!IMPORTANT]')) {
        elements.push(
          <div key={index} className="alert-box alert-important">
            <strong style={{ display: 'block', marginBottom: '4px' }}>📌 {lang === 'en' ? 'IMPORTANT NOTICE' : 'PENTING / PERHATIAN'}</strong>
          </div>
        );
      } else if (line.startsWith('> [!CAUTION]')) {
        elements.push(
          <div key={index} className="alert-box alert-caution">
            <strong style={{ display: 'block', marginBottom: '4px' }}>⚠️ {lang === 'en' ? 'AUDIT & SECURITY WARNING' : 'PERINGATAN AUDIT & KEAMANAN'}</strong>
          </div>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <div key={index} style={{ padding: '8px 14px', borderLeft: '3px solid #cbd5e1', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '8px 0', fontSize: '13.5px' }}>
            {line.replace('> ', '')}
          </div>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={index}>
            {parseInlineStyles(line.substring(2))}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={index}>
            {parseInlineStyles(line.replace(/^\d+\.\s/, ''))}
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={index} style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '24px 0' }} />);
      } else if (line.trim() !== '') {
        elements.push(
          <p key={index}>
            {parseInlineStyles(line)}
          </p>
        );
      }
    });

    if (inTable && tableBuffer.length > 0) {
      elements.push(renderTable(tableBuffer, `table-last`));
    }

    return elements;
  };

  const renderTable = (rows, key) => {
    if (rows.length < 2) return null;
    const headerRow = rows[0].split('|').map((c) => c.trim()).filter(Boolean);
    const dataRows = rows.slice(2);

    return (
      <div key={key} className="table-responsive-wrapper">
        <div className="table-scroll-hint">
          <span>👉 {lang === 'en' ? 'Swipe horizontally to view full table' : 'Geser tabel ke samping untuk melihat kolom lengkap'}</span>
        </div>
        <table className="docs-table">
          <thead>
            <tr>
              {headerRow.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((r, ri) => {
              const cells = r.split('|').map((c) => c.trim()).filter(Boolean);
              return (
                <tr key={ri}>
                  {cells.map((c, ci) => (
                    <td key={ci}>{parseInlineStyles(c)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const parseInlineStyles = (str) => {
    // Parse **bold**, *italic*, and `code`
    const parts = str.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-main)', fontWeight: '700' }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return <em key={i} style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const appUrl = lang === 'en' ? 'https://global.prolog.web.id' : 'https://prolog.web.id';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)', width: '100%', overflowX: 'hidden' }}>
      
      {/* 1. TOP HEADER NAVBAR (REDESIGNED) */}
      <header className="docs-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              backgroundColor: '#f8fafc',
              cursor: 'pointer',
              color: 'var(--text-main)',
              padding: 0
            }}
            className="mobile-only-btn"
          >
            <Menu size={18} />
          </button>

          {/* Logo & Brand */}
          <a href={appUrl} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src={logoImg} alt="PROLOG Logo" style={{ width: '30px', height: '30px', objectFit: 'contain', borderRadius: '7px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '17px', fontWeight: '850', letterSpacing: '-0.5px', color: 'var(--text-main)' }}>PROLOG</span>
              <span style={{ fontSize: '9.5px', fontWeight: '800', padding: '2px 6px', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '5px', letterSpacing: '0.5px' }}>
                DOCS
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Search Box */}
        <div style={{ position: 'relative', width: '260px' }} className="desktop-search-container">
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search manual & SOP...' : 'Cari bab & topik...'}
            style={{
              width: '100%',
              padding: '6px 12px 6px 32px',
              fontSize: '12px',
              borderRadius: '100px',
              border: '1px solid var(--border-light)',
              backgroundColor: '#f8fafc',
              color: 'var(--text-main)',
              outline: 'none'
            }}
          />
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Language Switcher Pill */}
          <div className="lang-switcher">
            <button
              onClick={() => handleSwitchLanguage('id')}
              className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
              title="Bahasa Indonesia (Domestik)"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => handleSwitchLanguage('en')}
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              title="English (Global Edition)"
            >
              <span>🌐</span>
              <span>EN</span>
            </button>
          </div>

          {/* Launch App Button Desktop */}
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-app-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 13px',
              fontSize: '11.5px',
              fontWeight: '700',
              borderRadius: '100px',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{lang === 'en' ? 'App' : 'Aplikasi'}</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </header>

      {/* 2. MOBILE DRAWER OVERLAY (SLIDE-OVER MENU) */}
      <div 
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={logoImg} alt="PROLOG Logo" style={{ width: '26px', height: '26px', objectFit: 'contain', borderRadius: '6px' }} />
            <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
              {lang === 'en' ? 'Field Manual & SOP' : 'Buku Panduan & SOP'}
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Search */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search manual...' : 'Cari panduan...'}
              style={{
                width: '100%',
                padding: '7px 10px 7px 30px',
                fontSize: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)',
                backgroundColor: '#f8fafc',
                color: 'var(--text-main)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Drawer Chapter Navigation */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: '800', letterSpacing: '0.6px', color: 'var(--text-muted)', marginBottom: '8px', paddingLeft: '6px' }}>
            {lang === 'en' ? 'CHAPTERS (SOP)' : 'DAFTAR BAB & MATERI'}
          </div>

          <nav>
            {filteredChapters.map((chapter) => {
              const isActive = chapter.id === activeChapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setActiveChapterId(chapter.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  style={{ width: '100%', textAlign: 'left', border: 'none', padding: '10px 12px' }}
                >
                  <span style={{ color: isActive ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                    {getIcon(chapter.icon)}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px' }}>
                      {chapter.number}. {chapter.shortTitle}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: '700',
                      padding: '2px 5px',
                      borderRadius: '4px',
                      backgroundColor: isActive ? '#bae6fd' : '#f1f5f9',
                      color: isActive ? '#0369a1' : '#64748b'
                    }}
                  >
                    {chapter.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer CTA */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border-light)', backgroundColor: '#f8fafc' }}>
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              fontSize: '12.5px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)'
            }}
          >
            <span>{lang === 'en' ? 'Open PROLOG App' : 'Buka Aplikasi PROLOG'}</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* 3. MAIN BODY LAYOUT (DESKTOP SIDEBAR + CONTENT) */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Desktop Sidebar */}
        <aside className="docs-sidebar">
          <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.8px', color: 'var(--text-muted)', marginBottom: '14px', paddingLeft: '8px' }}>
            {lang === 'en' ? 'TABLE OF CONTENTS' : 'DAFTAR ISI & BAB'}
          </div>

          <nav>
            {filteredChapters.map((chapter) => {
              const isActive = chapter.id === activeChapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setActiveChapterId(chapter.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  style={{ width: '100%', textAlign: 'left', border: 'none' }}
                >
                  <span style={{ color: isActive ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                    {getIcon(chapter.icon)}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {chapter.number}. {chapter.shortTitle}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '9.5px',
                      fontWeight: '700',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: isActive ? '#bae6fd' : '#f1f5f9',
                      color: isActive ? '#0369a1' : '#64748b'
                    }}
                  >
                    {chapter.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Article */}
        <main className="docs-main">
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span>{lang === 'en' ? 'Documentation' : 'Buku Panduan'}</span>
            <ChevronRight size={11} />
            <span>Bab {activeChapter.number}</span>
            <ChevronRight size={11} />
            <span style={{ color: 'var(--color-primary-dark)', fontWeight: '700' }}>{activeChapter.shortTitle}</span>
          </div>

          {/* Quick Mobile Chapter Switcher Bar */}
          <div className="mobile-chapter-selector">
            <button onClick={() => setMobileMenuOpen(true)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} color="var(--color-primary)" />
                Bab {activeChapter.number}: {activeChapter.shortTitle}
              </span>
              <span className="selector-change">
                {lang === 'en' ? 'Switch Chapter ▾' : 'Ganti Bab ▾'}
              </span>
            </button>
          </div>

          {/* Chapter Title Header Banner */}
          <div className="banner-card" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px 28px', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '2px 9px', borderRadius: '100px' }}>
                BAB {activeChapter.number}
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                {lang === 'en' ? 'Standard Operating Procedure' : 'Pedoman Standar Proyek'}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px', letterSpacing: '-0.5px', lineHeight: '1.3' }}>
              {activeChapter.title}
            </h1>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
              {activeChapter.summary}
            </p>
          </div>

          {/* Article Body Content */}
          <article className="content-body article-card" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '32px 36px', boxShadow: 'var(--shadow-sm)' }}>
            {renderFormattedContent(activeChapter.content)}
          </article>

          {/* Bottom Pagination (Prev / Next Chapter) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
            {prevChapter ? (
              <button
                onClick={() => {
                  setActiveChapterId(prevChapter.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  flex: '1',
                  minWidth: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 16px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <ChevronLeft size={18} color="var(--color-primary)" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700' }}>
                    {lang === 'en' ? 'PREVIOUS' : 'SEBELUMNYA'}
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {prevChapter.number}. {prevChapter.shortTitle}
                  </div>
                </div>
              </button>
            ) : <div style={{ flex: 1 }} />}

            {nextChapter && (
              <button
                onClick={() => {
                  setActiveChapterId(nextChapter.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  flex: '1',
                  minWidth: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  padding: '14px 16px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'right',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700' }}>
                    {lang === 'en' ? 'NEXT CHAPTER' : 'BAB BERIKUTNYA'}
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {nextChapter.number}. {nextChapter.shortTitle}
                  </div>
                </div>
                <ChevronRight size={18} color="var(--color-primary)" />
              </button>
            )}
          </div>
        </main>
      </div>

      {/* 4. FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border-light)', backgroundColor: '#ffffff', padding: '24px 20px', textAlign: 'center', fontSize: '11.5px', color: 'var(--text-muted)' }}>
        <p style={{ margin: '0 0 4px 0', fontWeight: '600', color: 'var(--text-secondary)' }}>
          PROLOG Construction Field Operating System &copy; 2026. All rights reserved.
        </p>
        <p style={{ margin: 0 }}>
          {lang === 'en'
            ? 'Official Standard Operating Procedures for On-Site Quality, Safety, and Commercial Operations.'
            : 'Pusat Dokumentasi dan Prosedur Operasional Lapangan Resmi Kontraktor Modern.'}
        </p>
      </footer>
    </div>
  );
}
