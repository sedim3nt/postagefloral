import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Care Guides",
  description:
    "How to propagate pothos, choose desk plants for low light, and keep an office plant alive. Practical care guides from Rootbound.",
};

const guides = [
  {
    title: "How to propagate pothos in a glass station",
    minutes: "4 min read",
    body: "Snip below a node, drop the cutting into a water-filled tube, and set it somewhere with bright indirect light. Refresh the water weekly. Roots appear in 1–2 weeks; pot it up once they reach two inches.",
  },
  {
    title: "Best desk plants for low light",
    minutes: "5 min read",
    body: "Pothos, ZZ plant, snake plant, and pothos cuttings are nearly unkillable in office light. Pair them with Canopy Light in the windowless corners and they'll thrive instead of merely survive.",
  },
  {
    title: "A minimalist planter setup for the office",
    minutes: "3 min read",
    body: "Start with one self-watering Breath planter so you can leave for a week without worry. Add Understory once you've caught the bug, and stage three to five small plants at staggered heights.",
  },
  {
    title: "Keeping cuttings alive while you're traveling",
    minutes: "3 min read",
    body: "Top off your propagation tubes before a trip and move the station out of direct sun to slow evaporation. Self-watering planters carry roughly five days of reservoir on their own.",
  },
];

export default function GuidesPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Learn</p>
      <h1 className="mt-2 font-serif text-4xl text-bark">Care guides</h1>
      <p className="mt-3 max-w-xl text-bark/70">
        The searches that send people down the plant-parent rabbit hole — answered
        simply, with the objects that make them easier.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {guides.map((g) => (
          <article
            key={g.title}
            className="rounded-2xl border border-bark/10 bg-linen p-6"
          >
            <p className="text-xs uppercase tracking-wide text-moss">{g.minutes}</p>
            <h2 className="mt-2 font-serif text-xl text-bark">{g.title}</h2>
            <p className="mt-3 text-sm text-bark/75">{g.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-moss/10 p-8 text-center">
        <h2 className="font-serif text-2xl text-bark">Ready to start?</h2>
        <p className="mt-2 text-bark/70">
          The Root Watch propagation station is where most people begin.
        </p>
        <Link href="/products/root-watch" className="btn-primary mt-5">
          Shop Root Watch
        </Link>
      </div>
    </div>
  );
}
