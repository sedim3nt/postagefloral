import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-4xl text-bark">
        This page never took root.
      </h1>
      <p className="mt-3 max-w-sm text-bark/70">
        The page you&apos;re looking for has wandered off. Let&apos;s get you back
        to the collection.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
