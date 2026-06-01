import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600">
          AI Thermal Wellness Platform
        </div>

        <h1 className="mt-8 text-6xl font-semibold leading-tight tracking-tight">
          AI Skin & Thermal Wellness Analysis
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-neutral-600 leading-relaxed">
          Advanced AI-powered skin wellness insights inspired by Anatolian
          thermal therapy, mineral care and peloid science.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/analyze"
            className="rounded-2xl bg-black text-white px-8 py-4 text-lg hover:opacity-90 transition"
          >
            Start AI Analysis
          </Link>

          <a
            href="https://peloidtherapy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-neutral-300 px-8 py-4 text-lg hover:bg-neutral-100 transition"
          >
            Learn More
          </a>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-neutral-200 p-8">
            <h3 className="text-2xl font-semibold">
              AI Skin Analysis
            </h3>

            <p className="mt-4 text-neutral-600">
              Appearance-based skin wellness analysis using advanced AI vision models.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-8">
            <h3 className="text-2xl font-semibold">
              Thermal Mineral Recommendations
            </h3>

            <p className="mt-4 text-neutral-600">
              Personalized thermal mineral, peloid and wellness care suggestions.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-8">
            <h3 className="text-2xl font-semibold">
              Multi-Language Reports
            </h3>

            <p className="mt-4 text-neutral-600">
              AI reports available in English, Turkish, German, French, Arabic and more.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}