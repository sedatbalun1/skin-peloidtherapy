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
    <main className="min-h-screen bg-neutral-50">

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-10">
          <div className="inline-flex rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm">
            AI Thermal Wellness Analysis
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            AI Skin Analysis
          </h1>

          <p className="mt-4 text-xl text-neutral-600 max-w-3xl">
            Upload a skin, scalp, nail or body image and receive an AI-powered wellness report.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="rounded-[32px] bg-white border border-neutral-200 p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Upload Image
            </h2>

            <label className="block mb-3 font-medium">
              Report Language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 p-3"
            >
              <option>Türkçe</option>
              <option>English</option>
              <option>Deutsch</option>
              <option>Français</option>
              <option>Español</option>
              <option>العربية</option>
              <option>Русский</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mt-6 block w-full"
            />

            <button
              onClick={analyzeImage}
              disabled={!preview || loading}
              className="mt-8 w-full rounded-2xl bg-black text-white py-4 text-lg font-medium"
            >
              {loading ? 'Analyzing...' : 'Analyze with AI'}
            </button>

          </div>

          <div className="rounded-[32px] bg-white border border-neutral-200 p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Preview
            </h2>

            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="rounded-3xl w-full max-h-[600px] object-cover"
              />
            ) : (
              <div className="h-[400px] rounded-3xl bg-neutral-100 flex items-center justify-center text-neutral-400">
                Image preview will appear here
              </div>
            )}

          </div>

        </div>

        {result && (

          <div className="mt-12">

            <div className="grid md:grid-cols-3 gap-6 mb-8">

              <div className="rounded-3xl bg-white border border-neutral-200 p-6">
                <div className="text-sm text-neutral-500">
                  Analysis Status
                </div>

                <div className="mt-3 text-2xl font-bold">
                  Completed
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-neutral-200 p-6">
                <div className="text-sm text-neutral-500">
                  AI Engine
                </div>

                <div className="mt-3 text-2xl font-bold">
                  GPT-4o Vision
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-neutral-200 p-6">
                <div className="text-sm text-neutral-500">
                  Report Language
                </div>

                <div className="mt-3 text-2xl font-bold">
                  {language}
                </div>
              </div>

            </div>

            <div className="rounded-[32px] bg-white border border-neutral-200 p-10">

              <h2 className="text-4xl font-bold mb-8">
                AI Analysis Report
              </h2>

              <div className="whitespace-pre-wrap leading-8 text-neutral-800">
                {result}
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

              <a
                href="https://www.zamavil.com"
                target="_blank"
                className="rounded-3xl bg-white border border-neutral-200 p-8"
              >
                <h3 className="text-2xl font-semibold">
                  Zamavil
                </h3>

                <p className="mt-3 text-neutral-600">
                  Thermal wellness and supportive skin care products.
                </p>
              </a>

              <a
                href="https://www.drbentonit.com"
                target="_blank"
                className="rounded-3xl bg-white border border-neutral-200 p-8"
              >
                <h3 className="text-2xl font-semibold">
                  Dr Bentonit
                </h3>

                <p className="mt-3 text-neutral-600">
                  Mineral skin care and cleansing products.
                </p>
              </a>

              <a
                href="https://www.peloidtherapy.com"
                target="_blank"
                className="rounded-3xl bg-white border border-neutral-200 p-8"
              >
                <h3 className="text-2xl font-semibold">
                  Peloid Therapy
                </h3>

                <p className="mt-3 text-neutral-600">
                  Global thermal wellness resource platform.
                </p>
              </a>

            </div>

          </div>

        )}

      </section>

    </main>
  )
}