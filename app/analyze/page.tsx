'use client'

import { useState } from 'react'

export default function AnalyzePage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [language, setLanguage] = useState('Türkçe')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  async function handleImage(event: any) {
    const file = event.target.files?.[0]
    if (!file) return

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

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-neutral-800 antialiased font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          
          <a href="https://peloidtherapy.com" target="_blank" className="flex items-center gap-2 group">
            <div className="leading-none">
              <span className="text-lg font-black tracking-tight text-neutral-900">
                Peloid<span className="text-[#35261F] font-medium">AI</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.18em] text-neutral-400 font-medium mt-0.5">
                Visual Wellness Intelligence
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600 border border-neutral-200/50">
              GPT-4o Vision
            </span>
            <a
              href="https://peloidtherapy.com"
              target="_blank"
              className="rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 px-3 py-1.5 text-xs font-medium transition shadow-sm active:bg-neutral-50"
            >
              PeloidTherapy.com
            </a>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        
        {/* HERO TITLE */}
        <div className="border-b border-neutral-200/60 pb-6 mb-8">
          <h2 className="text-2xl sm:text-3xl tracking-tight font-semibold text-neutral-900">
            AI Wellness Analysis
          </h2>
          <p className="mt-1 text-sm text-neutral-500 max-w-2xl">
            Clinical-grade visual wellness diagnostics powered by peloid science and advanced computer vision frameworks.
          </p>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-8 items-start">
          
          {/* LEFT COLUMN (35%) */}
          <div className="space-y-5">
            
            {/* CONFIGURATION & UPLOAD CARD */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              
              {/* LANGUAGE SELECT */}
              <div className="mb-4">
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
                  Report Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full h-9 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-xs font-medium text-neutral-700 outline-none transition focus:border-neutral-400 focus:bg-white"
                >
                  <option>Türkçe</option>
                  <option>English</option>
                  <option>Deutsch</option>
                  <option>Français</option>
                  <option>Español</option>
                  <option>العربية</option>
                  <option>Русский</option>
                </select>
              </div>

              {/* UPLOAD INTENT / PREVIEW CONTAINER */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
                  Analysis Subject
                </label>
                
                {!preview ? (
                  <label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 h-[260px] cursor-pointer hover:bg-neutral-50 hover:border-neutral-300 transition p-4 text-center group">
                    <span className="text-xl text-neutral-400 group-hover:text-neutral-600 transition font-light">+</span>
                    <span className="mt-2 text-xs font-medium text-neutral-700">Upload Image</span>
                    <span className="mt-1 text-[11px] text-neutral-400 max-w-[180px] leading-normal">
                      Skin, scalp, nail or body condition photo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-3">
                    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950 h-[260px] flex items-center justify-center p-2">
                      <img
                        src={preview}
                        alt="Analysis Subject Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <label className="h-9 rounded-lg border border-neutral-200 bg-white flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-neutral-50 transition text-neutral-600">
                        Change
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImage}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={analyzeImage}
                        disabled={loading}
                        className="h-9 rounded-lg bg-[#35261F] text-white text-xs font-medium shadow-sm hover:opacity-95 transition disabled:opacity-40 flex items-center justify-center"
                      >
                        {loading ? 'Analyzing...' : 'Run Analysis'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN (65%) */}
          <div className="space-y-6">
            
            {/* HORIZONTAL STATUS BAR */}
            <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="grid grid-cols-2 md:flex md:items-center md:justify-between gap-4 text-xs">
                
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 font-medium">Score:</span>
                  <span className="font-semibold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded text-[11px]">78 / 100</span>
                </div>

                <div className="flex items-center gap-2 border-none md:border-l md:border-neutral-200 md:pl-4">
                  <span className="text-neutral-400 font-medium">Risk Profile:</span>
                  <span className="font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded text-[11px]">Moderate</span>
                </div>

                <div className="flex items-center gap-2 border-none md:border-l md:border-neutral-200 md:pl-4">
                  <span className="text-neutral-400 font-medium">Engine:</span>
                  <span className="font-medium text-neutral-700">GPT-4o Vision</span>
                </div>

                <div className="flex items-center gap-2 border-none md:border-l md:border-neutral-200 md:pl-4">
                  <span className="text-neutral-400 font-medium">Target:</span>
                  <span className="font-medium text-neutral-700">{language}</span>
                </div>

              </div>
            </div>

            {/* AI ANALYSIS REPORT AREA */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] min-h-[420px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
                      AI Analysis Report
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Synthesized clinical telemetry data
                    </p>
                  </div>
                  
                  {result && (
                    <button className="h-7 rounded-md border border-neutral-200 bg-white px-3 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition shadow-sm">
                      Export PDF
                    </button>
                  )}
                </div>

                {result ? (
                  <div className="prose prose-neutral max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-600 font-normal selection:bg-neutral-200/60">
                      {result}
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-4 border border-dashed border-neutral-100 rounded-xl bg-neutral-50/30">
                    <span className="text-neutral-300 text-sm font-medium">
                      {loading ? 'Processing telemetry logs...' : 'Awaiting diagnostic execution.'}
                    </span>
                    <p className="text-[11px] text-neutral-400 max-w-xs mt-1 leading-normal">
                      {loading ? 'Please do not reload the dashboard interface.' : 'Upload an inspection image via the left node to generate structured analysis data.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM RESOURCES SECTION */}
        <div className="mt-12 border-t border-neutral-200/60 pt-8">
          <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-4">
            Recommended Resources
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { title: 'Zamavil', desc: 'Thermal Wellness Solutions', url: 'https://www.zamavil.com/' },
              { title: 'Dr. Bentonit', desc: 'Advanced Mineral Skincare', url: 'https://www.drbentonit.com/' },
              { title: 'Peloid Türkiye', desc: 'Certified Thermal Peloids', url: 'https://www.peloid.com.tr/' },
              { title: 'Peloid Therapy', desc: 'Global Science Authority', url: 'https://www.peloidtherapy.com/' },
            ].map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                className="group block rounded-xl border border-neutral-200 bg-white p-3.5 hover:border-neutral-300 transition shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-800 group-hover:text-neutral-950 transition">
                    {resource.title}
                  </span>
                  <span className="text-[10px] text-neutral-400 group-hover:text-neutral-600 transition transform group-hover:translate-x-0.5 duration-150">
                    →
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 font-normal">
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