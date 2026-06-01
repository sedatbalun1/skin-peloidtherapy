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
    <main className="min-h-screen bg-[#FAFAF8] text-[#1F1713]">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-[#ECE7E3] bg-white/80 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[74px] flex items-center justify-between">

          <a
            href="https://peloidtherapy.com"
            target="_blank"
            className="group"
          >

            <div className="leading-none">

              <h1 className="text-[34px] md:text-[42px] tracking-[-0.08em] font-extrabold">

                Peloid<span className="text-[#7B5B4B]">AI</span>

              </h1>

              <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-neutral-400 font-semibold">
                Global Wellness Intelligence
              </p>

            </div>

          </a>

          <div className="flex items-center gap-2">

            <div className="hidden md:flex items-center rounded-full border border-[#E7DFD8] bg-white px-4 py-2 text-xs font-semibold text-neutral-600">
              GPT-4o Vision
            </div>

            <a
              href="https://peloidtherapy.com"
              target="_blank"
              className="rounded-full bg-[#35261F] text-white px-4 py-2 text-xs font-semibold hover:opacity-90 transition"
            >
              PeloidTherapy.com
            </a>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">

        {/* HERO */}

        <div className="max-w-4xl">

          <div className="inline-flex items-center rounded-full border border-[#E7DFD8] bg-white px-4 py-2 text-[11px] md:text-xs font-semibold tracking-wide text-neutral-500 shadow-sm">
            AI VISUAL WELLNESS ANALYSIS PLATFORM
          </div>

          <h2 className="mt-6 text-[42px] md:text-[72px] leading-[0.92] tracking-[-0.07em] font-extrabold">

            AI Visual Skin &
            Peloid Intelligence

          </h2>

          <p className="mt-6 text-[17px] md:text-[22px] leading-relaxed text-neutral-600 max-w-3xl">
            Advanced AI-powered visual wellness analysis inspired by
            Anatolian mineral therapy, peloid science and modern skin wellness systems.
          </p>

        </div>

        {/* MAIN GRID */}

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">

          {/* LEFT */}

          <div className="rounded-[30px] border border-[#ECE7E3] bg-white p-5 md:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

            <div className="flex items-start justify-between gap-4">

              <div>

                <h3 className="text-[32px] md:text-[44px] leading-[1] tracking-[-0.05em] font-extrabold">
                  Upload Analysis
                </h3>

                <p className="mt-3 text-neutral-500 text-sm md:text-base">
                  Skin, scalp, nail or body image
                </p>

              </div>

              <div className="h-12 w-12 rounded-2xl bg-[#35261F] text-white flex items-center justify-center text-sm font-bold shadow-lg">
                AI
              </div>

            </div>

            {/* LANGUAGE */}

            <div className="mt-8">

              <label className="block text-[11px] uppercase tracking-[0.18em] text-neutral-400 font-semibold mb-3">
                Report Language
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-[58px] rounded-2xl border border-[#E8E1DC] bg-[#FCFCFB] px-5 text-[15px] font-medium outline-none"
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

            {/* UPLOAD */}

            <div className="mt-6">

              {!preview && (

                <label className="flex flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#DDD4CE] bg-[#FCFCFB] min-h-[380px] md:min-h-[500px] cursor-pointer hover:border-[#B59D90] transition p-8 text-center">

                  <div className="h-20 w-20 rounded-full bg-[#35261F] text-white flex items-center justify-center text-4xl font-semibold shadow-xl">
                    +
                  </div>

                  <h3 className="mt-8 text-[32px] md:text-[46px] leading-[1] tracking-[-0.05em] font-extrabold">
                    Upload Image
                  </h3>

                  <p className="mt-5 text-neutral-500 max-w-md leading-relaxed text-sm md:text-base">
                    Upload a visible skin or body image for advanced AI-powered visual wellness analysis.
                  </p>

                  <div className="mt-8 rounded-2xl bg-[#35261F] px-6 py-4 text-white text-sm md:text-base font-semibold shadow-lg">
                    Select Image
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />

                </label>

              )}

              {preview && (

                <div>

                  <div className="overflow-hidden rounded-[28px] border border-[#ECE7E3] bg-black">

                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-[340px] md:h-[560px] object-cover"
                    />

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                    <label className="h-[58px] rounded-2xl border border-[#E8E1DC] bg-white flex items-center justify-center text-sm md:text-base font-semibold cursor-pointer hover:bg-neutral-50 transition">
                      Change Image

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
                      className="h-[58px] rounded-2xl bg-[#35261F] text-white text-sm md:text-base font-semibold shadow-lg hover:opacity-90 transition"
                    >
                      {loading ? 'Analyzing...' : 'Analyze with AI'}
                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-6">

            {/* TOP STATS */}

            <div className="grid grid-cols-2 gap-4">

              {/* SCORE */}

              <div className="rounded-[30px] border border-[#ECE7E3] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

                <div className="flex justify-center">

                  <div className="relative h-[140px] w-[140px]">

                    <svg className="h-[140px] w-[140px] rotate-[-90deg]">

                      <circle
                        cx="70"
                        cy="70"
                        r="58"
                        stroke="#E7E5E4"
                        strokeWidth="10"
                        fill="none"
                      />

                      <circle
                        cx="70"
                        cy="70"
                        r="58"
                        stroke="#7B5B4B"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="365"
                        strokeDashoffset="80"
                        strokeLinecap="round"
                      />

                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                      <span className="text-[42px] font-extrabold tracking-[-0.05em]">
                        78
                      </span>

                      <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 font-semibold">
                        Score
                      </span>

                    </div>

                  </div>

                </div>

                <div className="mt-4 text-center">

                  <h4 className="text-[28px] leading-[1] tracking-[-0.05em] font-extrabold">
                    Wellness
                  </h4>

                </div>

              </div>

              {/* RISK */}

              <div className="rounded-[30px] border border-[#ECE7E3] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

                <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 font-semibold">
                  Risk Level
                </div>

                <h4 className="mt-4 text-[44px] leading-none tracking-[-0.06em] font-extrabold">
                  Moderate
                </h4>

                <div className="mt-5 h-2 rounded-full bg-neutral-200 overflow-hidden">

                  <div className="h-full w-[68%] rounded-full bg-[#7B5B4B]" />

                </div>

                <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                  Moderate visible irritation and texture irregularities detected.
                </p>

              </div>

            </div>

            {/* INFO */}

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-[30px] border border-[#ECE7E3] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

                <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 font-semibold">
                  AI Engine
                </div>

                <h4 className="mt-3 text-[20px] tracking-[-0.03em] font-bold">
                  GPT-4o Vision
                </h4>

              </div>

              <div className="rounded-[30px] border border-[#ECE7E3] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

                <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 font-semibold">
                  Language
                </div>

                <h4 className="mt-3 text-[20px] tracking-[-0.03em] font-bold">
                  {language}
                </h4>

              </div>

            </div>

            {/* BRANDS */}

            <div className="rounded-[30px] bg-[#35261F] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <h4 className="text-[30px] md:text-[40px] leading-[1] tracking-[-0.05em] font-extrabold">
                    Peloid Ecosystem
                  </h4>

                  <p className="mt-3 text-sm md:text-base text-neutral-300 max-w-lg">
                    Integrated mineral skincare, thermal wellness and AI-powered peloid intelligence network.
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">

                {[
                  {
                    title: 'Zamavil',
                    desc: 'Thermal wellness',
                    url: 'https://www.zamavil.com/',
                  },
                  {
                    title: 'Dr. Bentonit',
                    desc: 'Mineral skincare',
                    url: 'https://www.drbentonit.com/',
                  },
                  {
                    title: 'Peloid Türkiye',
                    desc: 'Thermal peloid',
                    url: 'https://www.peloid.com.tr/',
                  },
                  {
                    title: 'Peloid Therapy',
                    desc: 'Global authority',
                    url: 'https://www.peloidtherapy.com/',
                  },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                  >
                    <div className="text-sm md:text-base font-semibold">
                      {item.title}
                    </div>

                    <div className="mt-1 text-xs md:text-sm text-neutral-300">
                      {item.desc}
                    </div>
                  </a>
                ))}

              </div>

            </div>

          </div>

        </div>

        {/* REPORT */}

        {result && (

          <div className="mt-10 rounded-[34px] border border-[#ECE7E3] bg-white p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

              <div>

                <h2 className="text-[36px] md:text-[52px] leading-[0.95] tracking-[-0.06em] font-extrabold">
                  AI Analysis Report
                </h2>

                <p className="mt-3 text-neutral-500 text-sm md:text-base">
                  Powered by GPT-4o Vision Intelligence
                </p>

              </div>

              <button className="h-[54px] rounded-2xl border border-[#D7CEC8] bg-white px-6 text-sm md:text-base font-semibold hover:bg-[#35261F] hover:text-white transition">
                Download PDF
              </button>

            </div>

            <div className="mt-8 rounded-[28px] border border-[#ECE7E3] bg-[#FCFCFB] p-6 md:p-8">

              <div className="whitespace-pre-wrap text-[15px] md:text-[17px] leading-8 text-neutral-700">
                {result}
              </div>

            </div>

          </div>

        )}

      </section>

    </main>
  )
}