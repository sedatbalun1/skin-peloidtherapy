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
    <main className="min-h-screen bg-[#f3f4f6] text-black">

      {/* TOP BAR */}

      <div className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-2xl">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black tracking-[-0.08em] leading-none">
              Thermal<span className="text-neutral-400">AI</span>
            </h1>

            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-neutral-500 font-semibold">
              Global Skin Intelligence Platform
            </p>

          </div>

          <div className="hidden md:flex items-center gap-3">

            <div className="rounded-2xl bg-black text-white px-5 py-3 text-sm font-bold shadow-xl">
              GPT-4o Vision
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-bold">
              AI Powered
            </div>

          </div>

        </div>

      </div>

      <section className="max-w-7xl mx-auto px-6 py-14">

        {/* HERO */}

        <div className="mb-16">

          <div className="inline-flex items-center rounded-full bg-black text-white px-6 py-3 text-sm font-bold tracking-wide shadow-lg">
            ADVANCED THERMAL WELLNESS INTELLIGENCE
          </div>

          <h1 className="mt-8 text-7xl font-black tracking-[-0.06em] leading-[0.95] max-w-5xl">
            Professional AI Skin &
            Thermal Wellness Analysis
          </h1>

          <p className="mt-8 text-2xl text-neutral-600 max-w-4xl leading-relaxed font-medium">
            AI-powered visual wellness intelligence inspired by
            Anatolian thermal therapy, mineral science and advanced
            peloid wellness systems.
          </p>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

          {/* LEFT SIDE */}

          <div className="rounded-[40px] border border-white/40 bg-white/70 backdrop-blur-xl p-10 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-4xl font-black tracking-tight">
                  Upload Analysis Image
                </h2>

                <p className="text-neutral-500 mt-3 text-lg">
                  Skin, scalp, nail or body image
                </p>

              </div>

              <div className="h-16 w-16 rounded-3xl bg-black text-white flex items-center justify-center text-2xl font-black shadow-xl">
                AI
              </div>

            </div>

            {/* LANGUAGE */}

            <div className="mt-10">

              <label className="block text-sm font-black tracking-wide text-neutral-500 mb-4">
                REPORT LANGUAGE
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-3xl border border-neutral-200 bg-white px-6 py-5 text-lg font-bold outline-none shadow-sm"
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

            {/* UPLOAD AREA */}

            <div className="mt-10 rounded-[40px] border-2 border-dashed border-neutral-300 bg-gradient-to-br from-white to-neutral-100 p-8">

              {!preview && (

                <label className="flex flex-col items-center justify-center h-[420px] rounded-[36px] border border-neutral-200 bg-white cursor-pointer hover:scale-[1.01] transition-all shadow-sm">

                  <div className="h-24 w-24 rounded-full bg-black text-white flex items-center justify-center text-5xl font-black shadow-2xl">
                    +
                  </div>

                  <h3 className="mt-8 text-4xl font-black tracking-tight">
                    Upload Image
                  </h3>

                  <p className="mt-5 text-neutral-500 text-center max-w-lg text-lg leading-relaxed px-6">
                    Upload a skin, scalp, nail or body image for
                    advanced AI-powered thermal wellness analysis.
                  </p>

                  <div className="mt-8 rounded-2xl bg-black text-white px-8 py-4 text-lg font-black shadow-xl">
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

                  <div className="rounded-[36px] overflow-hidden border border-neutral-200 bg-black shadow-2xl">

                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-[520px] object-cover"
                    />

                  </div>

                  <button
                    onClick={analyzeImage}
                    disabled={loading}
                    className="mt-8 w-full rounded-[30px] bg-black text-white px-8 py-6 text-2xl font-black tracking-wide hover:scale-[1.01] hover:opacity-90 transition-all shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                  >
                    {loading
                      ? 'Analyzing with GPT-4o Vision...'
                      : 'Analyze with AI'}
                  </button>

                </div>

              )}

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6">

            {/* TOP STATS */}

            <div className="grid grid-cols-2 gap-6">

              {/* SCORE */}

              <div className="rounded-[40px] bg-white border border-neutral-200 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                <div className="flex items-center justify-center">

                  <div className="relative h-44 w-44">

                    <svg className="h-44 w-44 rotate-[-90deg]">

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
                        stroke="#0ea5e9"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray="465"
                        strokeDashoffset="110"
                        strokeLinecap="round"
                      />

                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                      <span className="text-6xl font-black">
                        78
                      </span>

                      <span className="text-sm text-neutral-500 uppercase tracking-wide font-bold">
                        Score
                      </span>

                    </div>

                  </div>

                </div>

                <div className="mt-6 text-center">

                  <h3 className="text-3xl font-black">
                    Wellness Score
                  </h3>

                  <p className="mt-3 text-neutral-500 text-lg">
                    AI generated wellness metric
                  </p>

                </div>

              </div>

              {/* RISK */}

              <div className="rounded-[40px] bg-white border border-neutral-200 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                <div className="text-sm font-black tracking-wide text-neutral-500 uppercase">
                  Risk Level
                </div>

                <h3 className="mt-5 text-6xl font-black tracking-tight">
                  Moderate
                </h3>

                <div className="mt-8 h-4 rounded-full bg-neutral-200 overflow-hidden">

                  <div className="h-full w-[68%] rounded-full bg-orange-400"></div>

                </div>

                <p className="mt-6 text-neutral-600 text-lg leading-relaxed">
                  Moderate visible irritation and texture
                  irregularities detected.
                </p>

              </div>

            </div>

            {/* INFO */}

            <div className="grid grid-cols-2 gap-6">

              <div className="rounded-[40px] bg-white border border-neutral-200 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                <div className="text-sm font-black tracking-wide text-neutral-500 uppercase">
                  AI Engine
                </div>

                <h3 className="mt-5 text-5xl font-black tracking-tight">
                  GPT-4o Vision
                </h3>

              </div>

              <div className="rounded-[40px] bg-white border border-neutral-200 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

                <div className="text-sm font-black tracking-wide text-neutral-500 uppercase">
                  Language
                </div>

                <h3 className="mt-5 text-5xl font-black tracking-tight">
                  {language}
                </h3>

              </div>

            </div>

            {/* BRANDS */}

            <div className="rounded-[40px] bg-black text-white p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">

              <h3 className="text-4xl font-black tracking-tight">
                Thermal Wellness Ecosystem
              </h3>

              <p className="mt-4 text-neutral-300 text-lg leading-relaxed">
                Integrated mineral wellness, thermal care and
                peloid intelligence ecosystem.
              </p>

              <div className="grid grid-cols-2 gap-5 mt-10">

                <a
                  href="https://www.zamavil.com/"
                  target="_blank"
                  className="rounded-3xl bg-white/10 border border-white/10 p-6 hover:bg-white/20 transition"
                >
                  <div className="text-2xl font-black">
                    Zamavil
                  </div>

                  <div className="mt-3 text-neutral-300">
                    Thermal wellness care
                  </div>
                </a>

                <a
                  href="https://www.drbentonit.com/"
                  target="_blank"
                  className="rounded-3xl bg-white/10 border border-white/10 p-6 hover:bg-white/20 transition"
                >
                  <div className="text-2xl font-black">
                    Dr. Bentonit
                  </div>

                  <div className="mt-3 text-neutral-300">
                    Mineral skincare support
                  </div>
                </a>

                <a
                  href="https://www.peloid.com.tr/"
                  target="_blank"
                  className="rounded-3xl bg-white/10 border border-white/10 p-6 hover:bg-white/20 transition"
                >
                  <div className="text-2xl font-black">
                    Peloid Türkiye
                  </div>

                  <div className="mt-3 text-neutral-300">
                    Thermal peloid wellness
                  </div>
                </a>

                <a
                  href="https://www.peloidtherapy.com/"
                  target="_blank"
                  className="rounded-3xl bg-white/10 border border-white/10 p-6 hover:bg-white/20 transition"
                >
                  <div className="text-2xl font-black">
                    Peloid Therapy
                  </div>

                  <div className="mt-3 text-neutral-300">
                    Global wellness platform
                  </div>
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* REPORT */}

        {result && (

          <div className="mt-16 rounded-[44px] border border-neutral-200 bg-white p-14 shadow-[0_25px_90px_rgba(0,0,0,0.06)]">

            <div className="flex items-center justify-between flex-wrap gap-4">

              <div>

                <h2 className="text-7xl font-black tracking-[-0.05em]">
                  AI Analysis Report
                </h2>

                <p className="mt-4 text-2xl text-neutral-500">
                  Powered by GPT-4o Vision Intelligence
                </p>

              </div>

              <button className="rounded-3xl border-2 border-black px-8 py-5 text-lg font-black hover:bg-black hover:text-white transition-all">
                Download PDF
              </button>

            </div>

            <div className="mt-14 rounded-[36px] bg-neutral-50 border border-neutral-200 p-10">

              <div className="prose prose-neutral max-w-none text-xl leading-10 whitespace-pre-wrap">
                {result}
              </div>

            </div>

          </div>

        )}

      </section>

    </main>
  )
}