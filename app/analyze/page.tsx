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
    <main className="min-h-screen bg-[#f5f5f7] text-black">

      {/* TOP BAR */}

      <div className="border-b border-neutral-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-black tracking-tight">
              THERMAL AI
            </h1>

            <p className="text-sm text-neutral-500 mt-1">
              Advanced Thermal Wellness Intelligence
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">

            <div className="px-4 py-2 rounded-2xl bg-neutral-100 text-sm font-medium">
              GPT-4o Vision
            </div>

            <div className="px-4 py-2 rounded-2xl bg-black text-white text-sm font-semibold">
              AI Powered
            </div>

          </div>

        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-14">

        {/* HERO */}

        <div className="mb-14">

          <div className="inline-flex items-center rounded-full bg-black text-white px-5 py-2 text-sm font-medium">
            AI Thermal Wellness Platform
          </div>

          <h1 className="mt-8 text-6xl font-black tracking-tight leading-tight max-w-4xl">
            Professional AI Skin &
            Thermal Wellness Analysis
          </h1>

          <p className="mt-6 text-xl text-neutral-600 max-w-3xl leading-relaxed">
            Advanced visual wellness intelligence inspired by
            Anatolian thermal therapy, peloid science and mineral wellness systems.
          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT */}

          <div className="rounded-[32px] border border-neutral-200 bg-white p-10 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-3xl font-black">
                  Upload Image
                </h2>

                <p className="text-neutral-500 mt-2">
                  Skin, scalp, nail or body image
                </p>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-black text-white flex items-center justify-center text-xl font-bold">
                AI
              </div>

            </div>

            {/* LANGUAGE */}

            <div className="mt-8">

              <label className="block text-sm font-bold mb-3">
                REPORT LANGUAGE
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-2xl border border-neutral-300 bg-neutral-50 px-5 py-4 text-lg font-medium outline-none"
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

            <div className="mt-8 rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-8">

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="block w-full text-lg"
              />

              {preview && (

                <div className="mt-8">

                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full rounded-3xl max-h-[520px] object-cover shadow-lg"
                  />

                  <button
                    onClick={analyzeImage}
                    disabled={loading}
                    className="mt-8 w-full rounded-3xl bg-black text-white px-8 py-5 text-xl font-bold hover:opacity-90 transition-all"
                  >
                    {loading ? 'Analyzing with GPT-4o...' : 'Analyze with AI'}
                  </button>

                </div>

              )}

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-6">

            {/* SCORE CARDS */}

            <div className="grid grid-cols-2 gap-6">

              <div className="rounded-[32px] bg-white border border-neutral-200 p-8 shadow-sm">

                <div className="flex items-center justify-center">

                  <div className="relative h-40 w-40">

                    <svg className="h-40 w-40 rotate-[-90deg]">
                      <circle
                        cx="80"
                        cy="80"
                        r="68"
                        stroke="#e5e5e5"
                        strokeWidth="10"
                        fill="none"
                      />

                      <circle
                        cx="80"
                        cy="80"
                        r="68"
                        stroke="#0ea5e9"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="427"
                        strokeDashoffset="90"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-5xl font-black">
                        78
                      </span>

                      <span className="text-sm text-neutral-500 font-medium">
                        Score
                      </span>
                    </div>

                  </div>

                </div>

                <div className="mt-5 text-center">
                  <h3 className="text-2xl font-black">
                    Wellness Score
                  </h3>

                  <p className="mt-2 text-neutral-500">
                    AI generated skin wellness metric
                  </p>
                </div>

              </div>

              <div className="rounded-[32px] bg-white border border-neutral-200 p-8 shadow-sm">

                <div className="text-sm font-bold text-neutral-500">
                  RISK LEVEL
                </div>

                <h3 className="mt-4 text-5xl font-black">
                  Moderate
                </h3>

                <div className="mt-6 h-3 rounded-full bg-neutral-200 overflow-hidden">
                  <div className="h-full w-[68%] bg-orange-400 rounded-full"></div>
                </div>

                <p className="mt-4 text-neutral-600 leading-relaxed">
                  Moderate visible irritation and texture irregularities detected.
                </p>

              </div>

            </div>

            {/* INFO CARDS */}

            <div className="grid grid-cols-2 gap-6">

              <div className="rounded-[32px] bg-white border border-neutral-200 p-8 shadow-sm">

                <div className="text-sm font-bold text-neutral-500">
                  AI ENGINE
                </div>

                <h3 className="mt-4 text-4xl font-black">
                  GPT-4o Vision
                </h3>

              </div>

              <div className="rounded-[32px] bg-white border border-neutral-200 p-8 shadow-sm">

                <div className="text-sm font-bold text-neutral-500">
                  REPORT LANGUAGE
                </div>

                <h3 className="mt-4 text-4xl font-black">
                  {language}
                </h3>

              </div>

            </div>

            {/* BRANDS */}

            <div className="rounded-[32px] bg-black text-white p-10 shadow-xl">

              <h3 className="text-3xl font-black">
                Thermal Wellness Brands
              </h3>

              <p className="mt-3 text-neutral-300 leading-relaxed">
                Integrated Anatolian thermal wellness ecosystem.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <a
                  href="https://www.zamavil.com/"
                  target="_blank"
                  className="rounded-2xl bg-white/10 border border-white/10 p-5 hover:bg-white/20 transition"
                >
                  <div className="text-xl font-black">
                    Zamavil
                  </div>

                  <div className="mt-2 text-sm text-neutral-300">
                    Thermal wellness care
                  </div>
                </a>

                <a
                  href="https://www.drbentonit.com/"
                  target="_blank"
                  className="rounded-2xl bg-white/10 border border-white/10 p-5 hover:bg-white/20 transition"
                >
                  <div className="text-xl font-black">
                    Dr. Bentonit
                  </div>

                  <div className="mt-2 text-sm text-neutral-300">
                    Mineral skincare support
                  </div>
                </a>

                <a
                  href="https://www.peloid.com.tr/"
                  target="_blank"
                  className="rounded-2xl bg-white/10 border border-white/10 p-5 hover:bg-white/20 transition"
                >
                  <div className="text-xl font-black">
                    Peloid Türkiye
                  </div>

                  <div className="mt-2 text-sm text-neutral-300">
                    Thermal peloid wellness
                  </div>
                </a>

                <a
                  href="https://www.peloidtherapy.com/"
                  target="_blank"
                  className="rounded-2xl bg-white/10 border border-white/10 p-5 hover:bg-white/20 transition"
                >
                  <div className="text-xl font-black">
                    Peloid Therapy
                  </div>

                  <div className="mt-2 text-sm text-neutral-300">
                    Global wellness platform
                  </div>
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* REPORT */}

        {result && (

          <div className="mt-14 rounded-[40px] border border-neutral-200 bg-white p-12 shadow-sm">

            <div className="flex items-center justify-between flex-wrap gap-4">

              <div>

                <h2 className="text-6xl font-black tracking-tight">
                  AI Analysis Report
                </h2>

                <p className="mt-3 text-xl text-neutral-500">
                  Powered by GPT-4o Vision Intelligence
                </p>

              </div>

              <button className="rounded-2xl border-2 border-black px-8 py-4 text-lg font-bold hover:bg-black hover:text-white transition">
                Download PDF
              </button>

            </div>

            <div className="mt-12 rounded-3xl bg-neutral-50 border border-neutral-200 p-10">

              <div className="prose prose-neutral max-w-none text-lg leading-9 whitespace-pre-wrap">
                {result}
              </div>

            </div>

          </div>

        )}

      </section>

    </main>
  )
}