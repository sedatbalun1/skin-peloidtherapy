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
    <main className="min-h-screen bg-[#F6F3F1] text-[#1E1713]">

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-[#e7ddd7] bg-white/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

          <a
            href="https://peloidtherapy.com"
            target="_blank"
            className="group"
          >

            <h1 className="text-3xl md:text-5xl font-black tracking-[-0.07em] leading-none">

              Skin<span className="text-[#7B5B4B]">PeloidAI</span>

            </h1>

            <p className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.32em] text-neutral-500 font-bold group-hover:text-[#7B5B4B] transition">
              GLOBAL PELOID WELLNESS INTELLIGENCE
            </p>

          </a>

          <div className="hidden md:flex items-center gap-3">

            <div className="rounded-2xl bg-[#35261F] text-white px-5 py-3 text-xs font-black tracking-wide shadow-xl">
              GPT-4o VISION
            </div>

            <a
              href="https://peloidtherapy.com"
              target="_blank"
              className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-xs font-black tracking-wide hover:bg-[#35261F] hover:text-white transition"
            >
              PELOIDTHERAPY.COM
            </a>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* HERO */}

        <div className="mb-10 md:mb-14">

          <div className="inline-flex items-center rounded-full bg-[#35261F] text-white px-5 py-3 text-xs md:text-sm font-black tracking-wide shadow-lg">
            GLOBAL AI PELOID & SKIN ANALYSIS PLATFORM
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-[-0.06em] leading-[0.95] max-w-5xl">
            Professional AI Skin &
            Peloid Wellness Intelligence
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-neutral-600 max-w-4xl leading-relaxed font-medium">
            Advanced AI-powered visual wellness analysis platform
            inspired by Anatolian peloid therapy, mineral skincare
            science and thermal wellness traditions.
          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* LEFT */}

          <div className="rounded-[32px] border border-white/40 bg-white/80 backdrop-blur-xl p-5 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">

            <div className="flex items-start justify-between gap-4">

              <div>

                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  Upload Analysis Image
                </h2>

                <p className="text-neutral-500 mt-3 text-base md:text-lg">
                  Skin, scalp, nail or body image
                </p>

              </div>

              <div className="h-14 w-14 md:h-16 md:w-16 rounded-3xl bg-[#35261F] text-white flex items-center justify-center text-2xl font-black shadow-xl shrink-0">
                AI
              </div>

            </div>

            {/* LANGUAGE */}

            <div className="mt-8">

              <label className="block text-xs md:text-sm font-black tracking-wide text-neutral-500 mb-4 uppercase">
                Report Language
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-3xl border border-neutral-200 bg-white px-5 py-4 text-base md:text-lg font-bold outline-none shadow-sm"
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

            <div className="mt-8 rounded-[32px] border-2 border-dashed border-[#d7cbc4] bg-gradient-to-br from-white to-[#f8f5f3] p-4 md:p-6">

              {!preview && (

                <label className="flex flex-col items-center justify-center min-h-[380px] md:min-h-[500px] rounded-[28px] border border-neutral-200 bg-white cursor-pointer hover:scale-[1.01] transition-all shadow-sm p-6 text-center">

                  <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-[#35261F] text-white flex items-center justify-center text-5xl font-black shadow-2xl">
                    +
                  </div>

                  <h3 className="mt-8 text-3xl md:text-5xl font-black tracking-tight leading-tight">
                    Upload Image
                  </h3>

                  <p className="mt-5 text-neutral-500 max-w-lg text-base md:text-lg leading-relaxed">
                    Upload a skin, scalp, nail or body image for advanced AI-powered peloid wellness analysis.
                  </p>

                  <div className="mt-8 rounded-2xl bg-[#35261F] text-white px-8 py-4 text-base md:text-lg font-black shadow-xl">
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

                  <div className="rounded-[28px] overflow-hidden border border-neutral-200 bg-black shadow-2xl">

                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-[340px] md:h-[520px] object-cover"
                    />

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                    <label className="rounded-2xl border border-neutral-200 bg-white px-6 py-5 text-center font-black cursor-pointer hover:bg-neutral-50 transition">
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
                      className="rounded-2xl bg-[#35261F] text-white px-6 py-5 text-lg font-black hover:opacity-90 transition-all shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                    >
                      {loading
                        ? 'Analyzing...'
                        : 'Analyze with AI'}
                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-6">

            {/* STATS */}

            <div className="grid grid-cols-2 gap-4 md:gap-6">

              {/* SCORE */}

              <div className="rounded-[32px] bg-white border border-neutral-200 p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                <div className="flex items-center justify-center">

                  <div className="relative h-36 w-36 md:h-44 md:w-44">

                    <svg className="h-36 w-36 md:h-44 md:w-44 rotate-[-90deg]">

                      <circle
                        cx="88"
                        cy="88"
                        r="74"
                        stroke="#e5e5e5"
                        strokeWidth="12"
                        fill="none"
                      />

                      <circle
                        cx="88"
                        cy="88"
                        r="74"
                        stroke="#7B5B4B"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray="465"
                        strokeDashoffset="110"
                        strokeLinecap="round"
                      />

                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                      <span className="text-4xl md:text-6xl font-black">
                        78
                      </span>

                      <span className="text-[10px] md:text-sm text-neutral-500 uppercase tracking-wide font-bold">
                        Score
                      </span>

                    </div>

                  </div>

                </div>

                <div className="mt-5 text-center">

                  <h3 className="text-2xl md:text-4xl font-black leading-tight">
                    Wellness Score
                  </h3>

                </div>

              </div>

              {/* RISK */}

              <div className="rounded-[32px] bg-white border border-neutral-200 p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                <div className="text-[10px] md:text-sm font-black tracking-wide text-neutral-500 uppercase">
                  Risk Level
                </div>

                <h3 className="mt-4 text-3xl md:text-6xl font-black tracking-tight leading-none">
                  Moderate
                </h3>

                <div className="mt-6 h-3 rounded-full bg-neutral-200 overflow-hidden">

                  <div className="h-full w-[68%] rounded-full bg-[#7B5B4B]"></div>

                </div>

                <p className="mt-5 text-neutral-600 text-sm md:text-lg leading-relaxed">
                  Moderate visible irritation and texture irregularities detected.
                </p>

              </div>

            </div>

            {/* INFO */}

            <div className="grid grid-cols-2 gap-4 md:gap-6">

              <div className="rounded-[32px] bg-white border border-neutral-200 p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                <div className="text-[10px] md:text-sm font-black tracking-wide text-neutral-500 uppercase">
                  AI Engine
                </div>

                <h3 className="mt-4 text-xl md:text-3xl font-black tracking-tight">
                  GPT-4o Vision
                </h3>

              </div>

              <div className="rounded-[32px] bg-white border border-neutral-200 p-5 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                <div className="text-[10px] md:text-sm font-black tracking-wide text-neutral-500 uppercase">
                  Language
                </div>

                <h3 className="mt-4 text-xl md:text-3xl font-black tracking-tight">
                  {language}
                </h3>

              </div>

            </div>

            {/* ECOSYSTEM */}

            <div className="rounded-[32px] bg-[#35261F] text-white p-6 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">

              <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Peloid Wellness Ecosystem
              </h3>

              <p className="mt-4 text-neutral-300 text-base md:text-lg leading-relaxed">
                Integrated mineral skincare, thermal wellness and peloid intelligence ecosystem.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                <a
                  href="https://www.zamavil.com/"
                  target="_blank"
                  className="rounded-3xl bg-[#4A372D] border border-white/10 p-6 hover:bg-[#5B4438] transition"
                >
                  <div className="text-2xl font-black">
                    Zamavil
                  </div>

                  <div className="mt-2 text-neutral-300">
                    Thermal wellness solutions
                  </div>
                </a>

                <a
                  href="https://www.drbentonit.com/"
                  target="_blank"
                  className="rounded-3xl bg-[#4A372D] border border-white/10 p-6 hover:bg-[#5B4438] transition"
                >
                  <div className="text-2xl font-black">
                    Dr. Bentonit
                  </div>

                  <div className="mt-2 text-neutral-300">
                    Mineral skincare support
                  </div>
                </a>

                <a
                  href="https://www.peloid.com.tr/"
                  target="_blank"
                  className="rounded-3xl bg-[#4A372D] border border-white/10 p-6 hover:bg-[#5B4438] transition"
                >
                  <div className="text-2xl font-black">
                    Peloid Türkiye
                  </div>

                  <div className="mt-2 text-neutral-300">
                    Thermal peloid wellness
                  </div>
                </a>

                <a
                  href="https://www.peloidtherapy.com/"
                  target="_blank"
                  className="rounded-3xl bg-[#4A372D] border border-white/10 p-6 hover:bg-[#5B4438] transition"
                >
                  <div className="text-2xl font-black">
                    Peloid Therapy
                  </div>

                  <div className="mt-2 text-neutral-300">
                    Global wellness authority
                  </div>
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* REPORT */}

        {result && (

          <div className="mt-12 md:mt-16 rounded-[36px] md:rounded-[44px] border border-neutral-200 bg-white p-6 md:p-14 shadow-[0_25px_90px_rgba(0,0,0,0.06)]">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

              <div>

                <h2 className="text-4xl md:text-5xl font-black tracking-[-0.05em] leading-tight">
                  AI Analysis Report
                </h2>

                <p className="mt-3 text-base md:text-xl text-neutral-500">
                  Powered by GPT-4o Vision Intelligence
                </p>

              </div>

              <button className="rounded-3xl border-2 border-[#35261F] px-8 py-4 text-base md:text-lg font-black hover:bg-[#35261F] hover:text-white transition-all">
                Download PDF
              </button>

            </div>

            <div className="mt-10 rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-[#faf7f5] to-white border border-neutral-200 p-6 md:p-10">

              <div className="prose prose-neutral max-w-none text-base md:text-xl leading-8 md:leading-10 whitespace-pre-wrap">
                {result}
              </div>

            </div>

          </div>

        )}

      </section>

    </main>
  )
}