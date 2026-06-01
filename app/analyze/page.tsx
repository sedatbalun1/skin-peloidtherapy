'use client'

import { useState } from 'react'

export default function AnalyzePage() {
  const [preview, setPreview] = useState<string | null>(null)
  const [language, setLanguage] = useState('English')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  async function handleImage(event: any) {
    const file = event.target.files[0]

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
    <main className="min-h-screen bg-neutral-50 text-black">
      <section className="max-w-5xl mx-auto px-6 py-24">

        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600">
          AI Thermal Wellness Analysis
        </div>

        <h1 className="mt-8 text-5xl font-semibold tracking-tight">
          Upload Skin Image
        </h1>

        <p className="mt-6 text-xl text-neutral-600 max-w-3xl">
          Upload a skin, scalp or body image for AI-powered wellness analysis.
        </p>

        <div className="mt-8">
          <label className="block mb-3 font-medium">
            Report Language
          </label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-xl border border-neutral-300 px-4 py-3 bg-white"
          >
            <option>English</option>
            <option>Türkçe</option>
            <option>Deutsch</option>
            <option>Français</option>
            <option>Español</option>
            <option>العربية</option>
            <option>Русский</option>
          </select>
        </div>

        <div className="mt-12 rounded-3xl border border-dashed border-neutral-300 bg-white p-10">

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="block w-full text-lg"
          />

          {preview && (
            <div className="mt-10">

              <img
                src={preview}
                alt="Preview"
                className="rounded-3xl max-h-[500px] object-cover"
              />

              <button
                onClick={analyzeImage}
                disabled={loading}
                className="mt-8 rounded-2xl bg-black text-white px-8 py-4 text-lg hover:opacity-90 transition"
              >
                {loading ? 'Analyzing...' : 'Analyze with AI'}
              </button>

            </div>
          )}
        </div>

        {result && (
          <div className="mt-12 rounded-3xl bg-white border border-neutral-200 p-8">
            <h2 className="text-3xl font-semibold mb-6">
              AI Analysis Report
            </h2>

            <div className="whitespace-pre-wrap leading-8 text-neutral-800">
              {result}
            </div>
          </div>
        )}

      </section>
    </main>
  )
}