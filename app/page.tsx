import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">

          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-medium shadow-sm">
            AI Thermal Wellness Platform
          </div>

          <h1 className="mt-10 max-w-5xl text-6xl md:text-7xl font-bold tracking-tight leading-tight">
            AI Skin Analysis
            <span className="block text-neutral-400">
              Powered by Thermal Wellness Intelligence
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-xl text-neutral-600 leading-relaxed">
            Advanced AI-powered skin wellness analysis inspired by
            Anatolian thermal therapy, mineral care, peloid science
            and thermal wellness expertise.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">

            <Link
              href="/analyze"
              className="rounded-2xl bg-black text-white px-8 py-5 text-lg font-medium hover:opacity-90 transition"
            >
              Start AI Analysis
            </Link>

            <a
              href="https://www.peloidtherapy.com"
              target="_blank"
              className="rounded-2xl border border-neutral-300 px-8 py-5 text-lg font-medium hover:bg-neutral-100 transition"
            >
              Learn More
            </a>

          </div>

          <div className="mt-20 grid md:grid-cols-4 gap-6">

            <div className="rounded-3xl border border-neutral-200 p-8 bg-white shadow-sm">
              <div className="text-4xl font-bold">AI</div>
              <div className="mt-3 text-neutral-600">
                Vision-based image analysis
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-8 bg-white shadow-sm">
              <div className="text-4xl font-bold">100+</div>
              <div className="mt-3 text-neutral-600">
                Thermal wellness parameters
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-8 bg-white shadow-sm">
              <div className="text-4xl font-bold">7+</div>
              <div className="mt-3 text-neutral-600">
                Report languages
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-8 bg-white shadow-sm">
              <div className="text-4xl font-bold">24/7</div>
              <div className="mt-3 text-neutral-600">
                Instant wellness reports
              </div>
            </div>

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <h2 className="text-5xl font-bold tracking-tight">
            Professional AI Wellness Analysis
          </h2>

          <p className="mt-6 text-xl text-neutral-600 max-w-3xl mx-auto">
            Upload a skin, scalp, nail or body image and receive an
            AI-generated wellness report with thermal and peloid-based
            wellness recommendations.
          </p>

        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">

          <div className="rounded-3xl border border-neutral-200 p-10">
            <h3 className="text-2xl font-semibold">
              Skin Appearance Analysis
            </h3>

            <p className="mt-4 text-neutral-600 leading-7">
              Advanced AI evaluates visible skin characteristics,
              texture changes, redness, irritation and appearance-based
              wellness indicators.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-10">
            <h3 className="text-2xl font-semibold">
              Thermal Wellness Insights
            </h3>

            <p className="mt-4 text-neutral-600 leading-7">
              Receive recommendations inspired by thermal wellness,
              mineral care and Anatolian peloid traditions.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-10">
            <h3 className="text-2xl font-semibold">
              Multi-Language Reports
            </h3>

            <p className="mt-4 text-neutral-600 leading-7">
              Reports available in Turkish, English, German, French,
              Spanish, Arabic and Russian.
            </p>
          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="rounded-[40px] bg-black text-white p-14">

          <h2 className="text-5xl font-bold">
            Ready for AI Skin Analysis?
          </h2>

          <p className="mt-6 text-xl text-neutral-300 max-w-3xl">
            Upload your image and receive a professional AI-generated
            wellness report in seconds.
          </p>

          <Link
            href="/analyze"
            className="inline-block mt-10 rounded-2xl bg-white text-black px-8 py-5 text-lg font-semibold"
          >
            Start Analysis
          </Link>

        </div>

      </section>

    </main>
  );
}