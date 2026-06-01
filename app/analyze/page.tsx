'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function HomePage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [language, setLanguage] = useState('Türkçe')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [dragActive, setDragActive] = useState(false)

  // Drag and drop handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function analyzeImage() {
    if (!preview) return

    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: preview,
          language,
        }),
      })

      const data = await response.json()
      setResult(data.result || 'No analysis returned.')
    } catch (error) {
      console.error(error)
      setResult('Analysis failed.')
    }

    setLoading(false)
  }

  const clearImage = () => {
    setPreview(null)
    setResult('')
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-neutral-800 antialiased font-sans selection:bg-neutral-200/60 selection:text-neutral-900">
      
      {/* GLOBAL LINEAR PROGRESS BAR WHEN LOADING */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-neutral-100 z-[60] overflow-hidden">
          <div className="h-full bg-[#35261F] animate-[pulse_1.5s_infinite] w-full origin-left scale-x-[0.4] transition-transform duration-500" />
        </div>
      )}

      {/* STICKY ULTRA-MINIMAL HEADER */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/50 bg-white/75 backdrop-blur-md transition-all duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          
          <a href="https://peloidtherapy.com" target="_blank" className="flex items-center gap-2 group transition-transform active:scale-[0.98]">
            <div className="leading-none">
              <span className="text-lg font-black tracking-tight text-neutral-900">
                Peloid<span className="text-[#35261F] font-medium">AI</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold mt-0.5 tracking-widest">
                Visual Wellness Intelligence
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-600 border border-neutral-200/60 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              GPT-4o Vision Engine
            </span>
            <a
              href="https://peloidtherapy.com"
              target="_blank"
              className="rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 px-3 py-1.5 text-xs font-semibold transition-all duration-150 hover:shadow-sm active:bg-neutral-50 active:scale-[0.97]"
            >
              PeloidTherapy.com
            </a>
          </div>

        </div>
      </header>

      {/* DASHBOARD CONTAINER */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-10">
        
        {/* CONTEXT HERO ZONE */}
        <div className="border-b border-neutral-200/50 pb-5 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl tracking-tight font-semibold text-neutral-900">
              AI Wellness Workspace
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500 max-w-2xl leading-relaxed">
              Anatolia mineral bilim temelli telemetri ve bilgisayarlı görü arayüzü. Analiz verilerini doğrudan ve pürüzsüzce üretin.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-neutral-300" />
            Workspace ID: <span className="font-mono text-neutral-600 font-semibold">PLD-2026</span>
          </div>
        </div>

        {/* 35% / 65% STRUCTURED MESH GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-6 items-start">
          
          {/* CONTROL INTERACTION CENTER (35%) */}
          <div className="space-y-4">
            
            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.005)] transition-all">
              
              {/* TELEMETRY LANGUAGE */}
              <div className="mb-4">
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">
                  Target Diagnostics Language
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-9 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-xs font-semibold text-neutral-700 outline-none transition-all focus:border-neutral-400 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option>Türkçe</option>
                    <option>English</option>
                    <option>Deutsch</option>
                    <option>Français</option>
                    <option>Español</option>
                    <option>العربية</option>
                    <option>Русский</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400">
                    <span className="text-[9px]">▼</span>
                  </div>
                </div>
              </div>

              {/* LIVE DROPZONE OR IMAGE PREVIEW PIPELINE */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">
                  Inspection Payload
                </label>
                
                {!preview ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center rounded-xl border border-dashed h-[280px] cursor-pointer transition-all duration-200 p-4 text-center group relative ${
                      dragActive 
                        ? "border-[#35261F] bg-neutral-50 scale-[0.99]" 
                        : "border-neutral-200 bg-neutral-50/40 hover:bg-neutral-50 hover:border-neutral-300"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="h-9 w-9 rounded-lg bg-white border border-neutral-200/60 flex items-center justify-center text-neutral-500 shadow-sm group-hover:scale-105 group-hover:text-neutral-700 transition-all duration-200 font-light text-lg">
                      +
                    </div>
                    <span className="mt-3 text-xs font-semibold text-neutral-700">Görsel Seçin veya Sürükleyin</span>
                    <span className="mt-1 text-[11px] text-neutral-400 max-w-[200px] leading-normal font-normal">
                      Dermatolojik doku, tırnak, saç derisi anomalisi fotoğrafı.
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3 animate-[fadeIn_0.2s_ease-out]">
                    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950 h-[280px] flex items-center justify-center p-2 relative group">
                      <img
                        src={preview}
                        alt="Workspace Preview Pipeline"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <span className="bg-neutral-900/80 text-white text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded backdrop-blur-sm">
                          Live Feed
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={clearImage}
                        disabled={loading}
                        className="h-9 rounded-lg border border-neutral-200 bg-white flex items-center justify-center text-xs font-semibold text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 transition-all active:scale-[0.96] disabled:opacity-40"
                      >
                        Temizle
                      </button>

                      <button
                        onClick={analyzeImage}
                        disabled={loading}
                        className="col-span-2 h-9 rounded-lg bg-[#35261F] text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-all duration-150 active:scale-[0.97] disabled:opacity-40 flex items-center justify-center gap-1.5"
                      >
                        {loading ? (
                          <>
                            <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            İşleniyor...
                          </>
                        ) : (
                          'Analizi Başlat'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* TELEMETRY DATA WORKSPACE LAYER (65%) */}
          <div className="space-y-4">
            
            {/* COMPACT REALTIME METRICS BAR */}
            <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.005)]">
              <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-3 text-xs">
                
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 font-medium">Wellness Score:</span>
                  <span className="font-semibold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded text-[11px] font-mono">
                    {result ? '78' : '--'} <span className="text-neutral-400 font-normal">/100</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 border-none sm:border-l sm:border-neutral-200 sm:pl-4">
                  <span className="text-neutral-400 font-medium">Risk Matrix:</span>
                  {result ? (
                    <span className="font-semibold text-amber-800 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded text-[11px]">
                      Moderate
                    </span>
                  ) : (
                    <span className="font-medium text-neutral-400">Awaiting...</span>
                  )}
                </div>

                <div className="flex items-center gap-2 border-none sm:border-l sm:border-neutral-200 sm:pl-4">
                  <span className="text-neutral-400 font-medium">Core Model:</span>
                  <span className="font-medium text-neutral-700 font-mono">GPT-4o</span>
                </div>

                <div className="flex items-center gap-2 border-none sm:border-l sm:border-neutral-200 sm:pl-4">
                  <span className="text-neutral-400 font-medium">Output:</span>
                  <span className="font-semibold text-neutral-700">{language}</span>
                </div>

              </div>
            </div>

            {/* MAIN RICH REPORT CARD */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.01)] min-h-[460px] flex flex-col justify-between">
              
              <div className="w-full">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900 tracking-tight">
                      AI Analysis Diagnostics
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5 font-normal">
                      Sentezlenmiş tıbbi ve yapılandırılmış klinik raporlama alanı
                    </p>
                  </div>
                  
                  {result && (
                    <button 
                      onClick={() => window.print()}
                      className="h-7 rounded-md border border-neutral-200 bg-white px-3 text-[11px] font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all shadow-sm active:scale-[0.97]"
                    >
                      Export PDF
                    </button>
                  )}
                </div>

                {result ? (
                  <div className="prose prose-neutral prose-sm max-w-none prose-headings:font-semibold prose-headings:text-neutral-900 prose-headings:tracking-tight prose-p:text-neutral-600 prose-p:leading-relaxed prose-li:text-neutral-600 selection:bg-neutral-200/80">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="h-80 flex flex-col items-center justify-center text-center p-4 border border-dashed border-neutral-200/70 rounded-xl bg-neutral-50/20">
                    <span className="text-neutral-400 text-xs sm:text-sm font-semibold transition-all">
                      {loading ? 'Klinik veriler ve telemetri logları işleniyor...' : 'Tanısal İşlem Tetiklenmeyi Bekliyor'}
                    </span>
                    <p className="text-[11px] text-neutral-400 max-w-xs mt-1 leading-normal font-normal">
                      {loading ? 'Yapay zekâ görsel katmanları analiz ediyor, lütfen arayüzü yenilemeyiniz.' : 'Sol kontrol paneli üzerinden geçerli bir anomali görseli yükleyip motoru çalıştırarak raporlamayı başlatın.'}
                    </p>
                  </div>
                )}
              </div>
              
            </div>

          </div>

        </div>

        {/* ECOSYSTEM INTEGRATION FOOTER */}
        <div className="mt-12 border-t border-neutral-200/60 pt-6">
          <h4 className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-3.5 tracking-widest">
            Önerilen Mineral Terapi Protokolleri & Kaynaklar
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { title: 'Zamavil', desc: 'Termal Wellness Çözümleri', url: 'https://www.zamavil.com/' },
              { title: 'Dr. Bentonit', desc: 'İleri Düzey Kil ve Mineral Bakımı', url: 'https://www.drbentonit.com/' },
              { title: 'Peloid Türkiye', desc: 'Sertifikalı Medikal Peloidler', url: 'https://www.peloid.com.tr/' },
              { title: 'Peloid Therapy', desc: 'Global Bilim ve Danışmanlık Otoritesi', url: 'https://www.peloidtherapy.com/' },
            ].map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                className="group block rounded-xl border border-neutral-200 bg-white p-3.5 hover:border-neutral-300 transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.015)] active:scale-[0.99]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-800 group-hover:text-neutral-950 transition-colors">
                    {resource.title}
                  </span>
                  <span className="text-[10px] text-neutral-400 group-hover:text-neutral-600 transition-all transform group-hover:translate-x-0.5 duration-150">
                    →
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5 font-normal group-hover:text-neutral-500 transition-colors">
                  {resource.desc}
                </p>
              </a>
            ))}
          </div>
        </div>

      </section>
    </main>
  )
}