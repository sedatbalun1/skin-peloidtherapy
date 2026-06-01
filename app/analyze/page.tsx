'use client'

import { useState } from 'react'

export default function AnalyzePage() {
  const [preview, setPreview] = useState<string | null>(null)

  function handleImage(event: any) {
    const file = event.target.files[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    setPreview(imageUrl)
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-black">

      <section className="max-w-4xl mx-auto px-6 py-24">

        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600">
          AI Skin Upload
        </div>

        <h1 className="mt-8 text-5xl font-semibold tracking-tight">
          Upload Skin Image
        </h1>

        <p className="mt-6 text-xl text-neutral-600 max-w-2xl">
          Upload a skin, scalp, or body image for AI-powered thermal wellness analysis.
        </p>

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

              <button className="mt-8 rounded-2xl bg-black text-white px-8 py-4 text-lg hover:opacity-90 transition">
                Analyze with AI
              </button>

            </div>
          )}

        </div>

      </section>

    </main>
  )
}