export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600">
          AI Thermal Wellness Platform
        </div>

        <h1 className="mt-8 text-6xl font-semibold leading-tight tracking-tight">
          AI Thermal Skin Analysis
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-neutral-600 leading-relaxed">
          Advanced mineral wellness insights inspired by Anatolian thermal therapy and peloid science.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-2xl bg-black text-white px-8 py-4 text-lg hover:opacity-90 transition">
            Start AI Analysis
          </button>

          <button className="rounded-2xl border border-neutral-300 px-8 py-4 text-lg hover:bg-neutral-100 transition">
            Learn More
          </button>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-3xl border border-neutral-200 p-8">
            <h3 className="text-2xl font-semibold">
              AI Skin Analysis
            </h3>

            <p className="mt-4 text-neutral-600">
              Advanced appearance-based thermal wellness insights powered by AI.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-8">
            <h3 className="text-2xl font-semibold">
              Mineral Recommendations
            </h3>

            <p className="mt-4 text-neutral-600">
              Personalized thermal mineral and peloid care suggestions.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-8">
            <h3 className="text-2xl font-semibold">
              Thermal Wellness Scores
            </h3>

            <p className="mt-4 text-neutral-600">
              AI-generated wellness and skin balance evaluation metrics.
            </p>
          </div>

        </div>

      </section>
    </main>
  )
}