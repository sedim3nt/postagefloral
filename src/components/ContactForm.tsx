"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-moss/40 bg-moss/10 p-8 text-center">
        <p className="font-serif text-xl text-bark">Thanks for reaching out.</p>
        <p className="mt-2 text-sm text-bark/70">
          We&apos;ll reply within two business days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-bark/70">Name</span>
          <input
            type="text"
            name="name"
            required
            className="mt-1 w-full rounded-xl border border-bark/20 bg-linen px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="text-bark/70">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-xl border border-bark/20 bg-linen px-4 py-2.5 focus:border-moss focus:outline-none"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-bark/70">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-xl border border-bark/20 bg-linen px-4 py-2.5 focus:border-moss focus:outline-none"
        />
      </label>
      <button type="submit" className="btn-primary">
        Send message
      </button>
    </form>
  );
}
