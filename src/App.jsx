import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, Shield, FileText, Camera, MapPin, ClipboardCheck, 
  Download, HelpCircle, Search, Menu, X, ExternalLink, 
  ChevronRight, ChevronLeft, Globe, Printer, BookOpen
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

  // Active chapters based on chosen language
  const chapters = useMemo(() => {
    return lang === 'en' ? chaptersEn : chaptersId;
  }, [lang]);

  // Handle language switch
  const handleSwitchLanguage = (newLang) => {
    setLang(newLang);
    // Update URL query string without reloading page
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
        // Flush table
        elements.push(renderTable(tableBuffer, `table-${index}`));
        tableBuffer = [];
        inTable = false;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginTop: '28px', marginBottom: '12px' }}>
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={index} style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-secondary)', marginTop: '20px', marginBottom: '8px' }}>
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
          <div key={index} style={{ padding: '8px 16px', borderLeft: '3px solid #cbd5e1', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '8px 0', fontSize: '14px' }}>
            {line.replace('> ', '')}
          </div>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={index} style={{ marginLeft: '24px', marginBottom: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            {parseInlineStyles(line.substring(2))}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={index} style={{ marginLeft: '24px', marginBottom: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            {parseInlineStyles(line.replace(/^\d+\.\s/, ''))}
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={index} style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '24px 0' }} />);
      } else if (line.trim() !== '') {
        elements.push(
          <p key={index} style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.7' }}>
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
    const dataRows = rows.slice(2); // Skip separator row

    return (
      <div key={key} style={{ overflowX: 'auto', margin: '20px 0' }}>
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
    // Replace **bold** with <strong>
    const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-main)', fontWeight: '700' }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
      {/* 1. TOP HEADER */}
      <header className="docs-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-main)',
              padding: '6px'
            }}
            className="mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a href="https://prolog.web.id" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src={logoImg} alt="PROLOG Logo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '8px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--text-main)' }}>PROLOG</span>
              <span style={{ fontSize: '10px', fontWeight: '800', padding: '2px 7px', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '6px', letterSpacing: '0.5px' }}>
                DOCS
              </span>
            </div>
          </a>
        </div>

        {/* Global Search Box (Desktop) */}
        <div style={{ position: 'relative', width: '280px', display: 'none' }} className="desktop-search">
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search docs & SOP...' : 'Cari panduan & SOP...'}
            style={{
              width: '100%',
              padding: '7px 12px 7px 34px',
              fontSize: '12.5px',
              borderRadius: '100px',
              border: '1px solid var(--border-light)',
              backgroundColor: '#f8fafc',
              color: 'var(--text-main)',
              outline: 'none'
            }}
          />
        </div>

        {/* Actions & Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Smart Language Switcher */}
          <div className="lang-switcher">
            <button
              onClick={() => handleSwitchLanguage('id')}
              className={`lang-btn ${lang === 'id' ? 'active' : ''}`}
              title="Panduan Bahasa Indonesia (Edisi Domestik)"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => handleSwitchLanguage('en')}
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              title="English Field Manual (Global Edition)"
            >
              <span>🌐</span>
              <span>EN</span>
            </button>
          </div>

          {/* Launch App Button */}
          <a
            href={lang === 'en' ? 'https://global.prolog.web.id' : 'https://prolog.web.id'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: '700',
              borderRadius: '100px',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)'
            }}
          >
            <span>{lang === 'en' ? 'Open App' : 'Buka Aplikasi'}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </header>

      {/* 2. BODY LAYOUT (SIDEBAR + CONTENT) */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside className={`docs-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
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
                    setMobileMenuOpen(false);
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

        {/* Main Content Area */}
        <main className="docs-main">
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <span>{lang === 'en' ? 'Documentation' : 'Buku Panduan'}</span>
            <ChevronRight size={12} />
            <span>Bab {activeChapter.number}</span>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--color-primary-dark)', fontWeight: '700' }}>{activeChapter.title}</span>
          </div>

          {/* Chapter Title Header Banner */}
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '24px 28px', marginBottom: '28px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '3px 10px', borderRadius: '100px' }}>
                BAB {activeChapter.number}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {lang === 'en' ? 'Standard Operating Procedure' : 'Pedoman Standar Proyek'}
              </span>
            </div>

            <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px', letterSpacing: '-0.5px' }}>
              {activeChapter.title}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
              {activeChapter.summary}
            </p>
          </div>

          {/* Article Body */}
          <article className="content-body" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '16px', padding: '32px 36px', boxShadow: 'var(--shadow-sm)' }}>
            {renderFormattedContent(activeChapter.content)}
          </article>

          {/* Bottom Pagination (Prev / Next Chapter) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '36px', flexWrap: 'wrap' }}>
            {prevChapter ? (
              <button
                onClick={() => {
                  setActiveChapterId(prevChapter.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  flex: '1',
                  minWidth: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <ChevronLeft size={20} color="var(--color-primary)" />
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>
                    {lang === 'en' ? 'PREVIOUS' : 'SEBELUMNYA'}
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-main)' }}>
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
                  minWidth: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  padding: '16px 20px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  textAlign: 'right',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>
                    {lang === 'en' ? 'NEXT CHAPTER' : 'BAB BERIKUTNYA'}
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-main)' }}>
                    {nextChapter.number}. {nextChapter.shortTitle}
                  </div>
                </div>
                <ChevronRight size={20} color="var(--color-primary)" />
              </button>
            )}
          </div>
        </main>
      </div>

      {/* 3. FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border-light)', backgroundColor: '#ffffff', padding: '24px 32px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
        <p style={{ margin: '0 0 6px 0', fontWeight: '600', color: 'var(--text-secondary)' }}>
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
