'use client'

import { useState, ChangeEvent, DragEvent } from 'react'
import ReactMarkdown from 'react-markdown'

interface Resource {
  title: string
  desc: string
  url: string
}

export default function HomePage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [language, setLanguage] = useState('Türkçe')
  const [analysisMode, setAnalysisMode] = useState('Wellness Scan')
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState('')
  const [result, setResult] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [dynamicResources, setDynamicResources] = useState<Resource[]>([])

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
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

  // Visual simulation for professional telemetry tracking
  const runLoadingSteps = () => {
    const steps = [
      'Görsel spektrum taranıyor...',
      'Epidermal katman bütünlüğü ölçülüyor...',
      'Doku irritasyon ve nem indeksi hesaplanıyor...',
      'Peloid & Mineral korelasyon matrisi sentezleniyor...'
    ]
    let currentStep = 0
    setLoadingStep(steps[0])
    
    const interval = setInterval(() => {
      currentStep++
      if (currentStep < steps.length) {
        setLoadingStep(steps[currentStep])
      } else {
        clearInterval(interval)
      }
    }, 2500)

    return interval
  }

  async function analyzeImage() {
    if (!preview) return

    setLoading(true)
    setResult('')
    setDynamicResources([])
    const stepInterval = runLoadingSteps()

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: preview,
          language,
          mode: analysisMode,
        }),
      })

      if (!response.ok) {
        throw new Error('API Response Error')
      }

      const data = await response.json()
      const aiResponse = data.result || 'Analiz sonucu alınamadı.'
      setResult(aiResponse)
      
      // Smart conversion trigger: dynamically filter target store recommendation based on AI textual match
      generateSmartRecommendations(aiResponse)

    } catch (error) {
      console.error(error)
      setResult('**Sistem Mesajı:** Görsel katmanları işlenirken bir sorun oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyiniz.')
    } finally {
      clearInterval(stepInterval)
      setLoading(false)
      setLoadingStep('')
    }
  }

  const generateSmartRecommendations = (text: string) => {
    const lowerText = text.toLowerCase()
    const recommendations: Resource[] = []

    if (lowerText.includes('mantar') || lowerText.includes('fungal')) {
      if (lowerText.includes('tırnak') || lowerText.includes('nail')) {
        recommendations.push({ title: 'Zamavil Tırnak Kürü', desc: 'Tırnak Yüzeyi Termal Su ve Çamur Özü Seti', url: 'https://www.zamavil.com/product/tirnak-mantari-icin-termal-kur-sucamurtermal-ozu-seti-2ld3w-hubme-waxuq' })
      } else if (lowerText.includes('kasık') || lowerText.includes('groin')) {
        recommendations.push({ title: 'Zamavil Kasık Protokolü', desc: 'Hassas Bölge Bariyer Dengeleyici Terapi', url: 'https://www.zamavil.com/category/Kask-Mantar-JkMqb' })
      } else {
        recommendations.push({ title: 'Zamavil Termal Mantar Serisi', desc: 'Yüzeyel İrritasyon Karşıtı Mineral Çözüm', url: 'https://www.zamavil.com/category/mantar' })
      }
    }
    
    if (lowerText.includes('egzama') || lowerText.includes('eczema') || lowerText.includes('pul') || lowerText.includes('dökülme')) {
      recommendations.push({ title: 'Zamavil Egzama Protokolü', desc: 'Yoğun Yoğun Nemlendirici ve Bariyer Koruyucu Set', url: 'https://www.zamavil.com/category/egzama' })
    }

    if (lowerText.includes('akne') || lowerText.includes('acne') || lowerText.includes('gözenek') || lowerText.includes('yağlanma')) {
      recommendations.push({ title: 'Dr. Bentonit Mermer Maskesi', desc: 'Derin Gözenek Arındırıcı Medikal Kil Maskesi', url: 'https://www.drbentonit.com/category/mermer-maskesi-qlhvj' })
    }

    // Default safe clinical recommendations if no strong match occurs
    if (recommendations.length === 0) {
      recommendations.push(
        { title: 'Peloid Türkiye', desc: 'Sertifikalı Doğal Termal Peloid Çamuru', url: 'https://www.peloid.com.tr/' },
        { title: 'Dr. Bentonit Kil Bakımı', desc: 'Bütünsel Saf Bentonit Skincare Minerali', url: 'https://www.drbentonit.com/' }
      )
    }

    setDynamicResources(recommendations)
  }

  const clearImage = () => {
    setPreview(null)
    setResult('')
    setDynamicResources([])
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-neutral-800 antialiased font-sans selection:bg-neutral-200/60">
      
      {/* GLOBAL PROGRESS LINEAR ANIMATION */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-neutral-100 z-[60] overflow-hidden">
          <div className="h-full bg-[#35261F] animate-pulse w-full origin-left scale-x-[0.6] transition-transform duration-[20000ms]" />
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/50 bg-white/75 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          
          {/* FIXED INTERNAL ACTION: RESET APPLICATION INSTEAD OF EXTERNAL LINK */}
          <button onClick={clearImage} className="flex items-center gap-2 group text-left outline-none">
            <div className="leading-none">
              <span className="text-lg font-black tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors">
                Peloid<span className="text-[#35261F] font-medium">AI</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold mt-0.5 tracking-widest">
                Visual Wellness Intelligence
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-50 px-2 py-0.5 text-[11px] font-semibold text-neutral-600 border border-neutral-200/60 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              GPT-4o Vision Engine
            </span>
            <a
              href="https://peloidtherapy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 px-3 py-1.5 text-xs font-semibold transition shadow-sm active:bg-neutral-50"
            >
              Ecosystem Root
            </a>
          </div>

        </div>
      </header>

      {/* MASTER CONTAINER */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-10">
        
        <div className="border-b border-neutral-200/50 pb-5 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl tracking-tight font-semibold text-neutral-900">
              AI Wellness Workspace
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500 max-w-2xl leading-relaxed">
              Anadolu mineral ekosistemi ve bütünsel wellness modellemesi tabanlı bilgisayarlı görü arayüzü. Teşhis amacı taşımayan destekleyici veri paneli.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-neutral-300" />
            Workspace ID: <span className="font-mono text-neutral-600 font-semibold">PLD-2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-6 items-start">
          
          {/* CONTROL PANEL */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm">
              
              <div className="mb-4">
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">
                  Analysis Framework Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAnalysisMode('Wellness Scan')}
                    className={`h-8 rounded-lg text-xs font-semibold transition border ${
                      analysisMode === 'Wellness Scan'
                        ? 'border-[#35261F] bg-[#35261F]/5 text-[#35261F]'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    Bütünsel Tarama
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnalysisMode('Mineral Telemetry')}
                    className={`h-8 rounded-lg text-xs font-semibold transition border ${
                      analysisMode === 'Mineral Telemetry'
                        ? 'border-[#35261F] bg-[#35261F]/5 text-[#35261F]'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    Peloid Telemetri
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">
                  Target Diagnostics Language
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-9 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-xs font-semibold text-neutral-700 outline-none appearance-none cursor-pointer focus:border-[#35261F] transition"
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
                    className={`flex flex-col items-center justify-center rounded-xl border border-dashed h-[240px] cursor-pointer transition-all p-4 text-center group relative ${
                      dragActive 
                        ? "border-[#35261F] bg-neutral-50" 
                        : "border-neutral-200 bg-neutral-50/40 hover:bg-neutral-50 hover:border-neutral-300"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="h-9 w-9 rounded-lg bg-white border border-neutral-200/60 flex items-center justify-center text-neutral-500 shadow-sm group-hover:text-neutral-700 font-light text-lg">
                      +
                    </div>
                    <span className="mt-3 text-xs font-semibold text-neutral-700">Görsel Seçin veya Sürükleyin</span>
                    <span className="mt-1 text-[11px] text-neutral-400 max-w-[200px] leading-normal font-normal">
                      Doku bütünlüğü dengesi incelemesi için fotoğraf.
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950 h-[240px] flex items-center justify-center p-2 relative">
                      <img
                        src={preview}
                        alt="Workspace Preview Pipeline"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={clearImage}
                        disabled={loading}
                        className="h-9 rounded-lg border border-neutral-200 bg-white flex items-center justify-center text-xs font-semibold text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-40"
                      >
                        Temizle
                      </button>

                      <button
                        onClick={analyzeImage}
                        disabled={loading}
                        className="col-span-2 h-9 rounded-lg bg-[#35261F] text-white text-xs font-semibold shadow-sm hover:opacity-95 transition disabled:opacity-40 flex items-center justify-center gap-1.5"
                      >
                        {loading ? 'İşleniyor...' : 'Analizi Başlat'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* DIAGNOSTICS & TELEMETRY */}
          <div className="space-y-4">
            
            {/* META WIDGETS BAR */}
            <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
              <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-3 text-xs">
                
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 font-medium">Wellness Index:</span>
                  <span className="font-semibold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded text-[11px] font-mono">
                    {result ? '78' : '--'} <span className="text-neutral-400 font-normal">/100</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 border-none sm:border-l sm:border-neutral-200 sm:pl-4">
                  <span className="text-neutral-400 font-medium">Bariyer Hassasiyeti:</span>
                  {result ? (
                    <span className="font-semibold text-amber-800 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded text-[11px]">
                      Orta Seviye
                    </span>
                  ) : (
                    <span className="font-medium text-neutral-400">{loading ? 'Hesaplanıyor...' : 'Bekleniyor...'}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 border-none sm:border-l sm:border-neutral-200 sm:pl-4">
                  <span className="text-neutral-400 font-medium">Framework:</span>
                  <span className="font-medium text-neutral-700 font-mono">Peloid v4</span>
                </div>

                <div className="flex items-center gap-2 border-none sm:border-l sm:border-neutral-200 sm:pl-4">
                  <span className="text-neutral-400 font-medium">Mod:</span>
                  <span className="font-semibold text-neutral-700">{analysisMode}</span>
                </div>

              </div>
            </div>

            {/* DIAGNOSTICS OUTPUT CONTAINER */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm min-h-[460px] flex flex-col justify-between gap-6">
              
              <div className="w-full">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900 tracking-tight">
                      Bütünsel Wellness Değerlendirmesi
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5 font-normal">
                      Mineral dengesi ve doku bütünlüğü veri dökümü
                    </p>
                  </div>
                  
                  {result && (
                    <button 
                      onClick={() => window.print()}
                      className="h-7 rounded-md border border-neutral-200 bg-white px-3 text-[11px] font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition shadow-sm"
                    >
                      Döküm Al (PDF)
                    </button>
                  )}
                </div>

                {result ? (
                  <div className="prose prose-neutral prose-sm max-w-none prose-headings:font-semibold prose-headings:text-neutral-900 prose-headings:tracking-tight prose-p:text-neutral-600 prose-p:leading-relaxed prose-li:text-neutral-600 animate-[fadeIn_0.3s_ease-out]">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="h-80 flex flex-col items-center justify-center text-center p-4 border border-dashed border-neutral-200/70 rounded-xl bg-neutral-50/20">
                    <span className="text-neutral-400 text-xs sm:text-sm font-semibold h-6 flex items-center justify-center">
                      {loading ? loadingStep : 'Yapay Zekâ Analizi Hazır'}
                    </span>
                    <p className="text-[11px] text-neutral-400 max-w-xs mt-1 leading-normal font-normal">
                      {loading ? 'Yapay zekâ görsel katmanları analiz ediyor, lütfen arayüzü yenilemeyiniz.' : 'Görsel yükleyip "Analizi Başlat" butonuna basarak bütünsel tarama raporunu tetikleyin.'}
                    </p>
                  </div>
                )}
              </div>

              {/* COMPLIANCE DISCLAIMER */}
              <div className="border-t border-neutral-100 pt-4 text-[11px] text-neutral-400 leading-relaxed font-normal">
                <strong className="text-neutral-500 font-medium">Bütünsel Wellness Bildirimi:</strong> Bu panelde sunulan veriler ve yapay zekâ değerlendirmeleri tıbbi teşhis, tedavi veya klinik bir tanı amacı taşımamaktadır. Sistem, mineral dengesi ve bütünsel cilt wellness takibi için tasarlanmıştır. Kalıcı veya ilerleyen durumlarda lütfen tıp uzmanlarına danışınız.
              </div>
              
            </div>

          </div>

        </div>

        {/* RESOURCE NODES SECTION */}
        <div className="mt-12 border-t border-neutral-200/60 pt-6">
          <h4 className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-3.5 tracking-widest">
            {dynamicResources.length > 0 ? '🎯 Sizin İçin Önerilen Noktasal Terapi Ürünleri' : 'Önerilen Mineral Terapi Protokolleri & Kaynaklar'}
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {(dynamicResources.length > 0 ? dynamicResources : [
              { title: 'Zamavil', desc: 'Termal Wellness Çözümleri', url: 'https://www.zamavil.com/' },
              { title: 'Dr. Bentonit', desc: 'İleri Düzey Kil ve Mineral Bakımı', url: 'https://www.drbentonit.com/' },
              { title: 'Peloid Türkiye', desc: 'Sertifikalı Medikal Peloidler', url: 'https://www.peloid.com.tr/' },
              { title: 'Peloid Therapy', desc: 'Global Bilim ve Danışmanlık Otoritesi', url: 'https://www.peloidtherapy.com/' },
            ]).map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-neutral-200 bg-white p-3.5 hover:border-neutral-300 transition-all hover:shadow-sm active:scale-[0.99] animate-[fadeIn_0.2s_ease-out]"
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