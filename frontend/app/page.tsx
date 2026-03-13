"use client";

import { useEffect } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cargo Direct CLI – Rust Cargo Dependency Tool",
  description:
    "Cargo Direct is a Rust CLI tool that helps developers manage Cargo dependencies faster from the terminal.",
  keywords: [
    "Cargo Direct",
    "Rust",
    "Cargo",
    "CLI",
    "dependencies",
    "developer tools",
  ],
  openGraph: {
    title: "Cargo Direct CLI",
    description:
      "Manage Rust Cargo dependencies faster from the terminal with Cargo Direct.",
    images: ["/logo.png"],
  },
};

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default function CliPage() {
  useRevealOnScroll();

  return (
    <main className="relative min-h-screen bg-linear-to-b from-slate-950 via-slate-950/95 to-slate-950 text-slate-100">
      {/* Hero background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_55%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom,rgba(148,163,184,0.20),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-16 pt-10 sm:px-6 lg:pt-14">
        {/* Hero */}
        <section className="reveal rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl shadow-emerald-500/5 backdrop-blur">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.35)]" />
                Rust CLI · Developer tool
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80">
                  <Image
                    src="/logo.png"
                    alt="Cargo Direct"
                    width={40}
                    height={40}
                    className="h-8 w-8 rounded-lg object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                    Cargo Direct
                  </h1>
                  <p className="text-sm text-slate-400">
                    Manage Rust Cargo dependencies faster from the terminal.
                  </p>
                </div>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-slate-300">
                Cargo Direct is a focused Rust CLI that streamlines day-to-day
                dependency management. Add crates, keep manifests clean, and stay
                in your terminal without breaking your flow.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://github.com/kimathimark004-coder/cargo-direct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 px-7 py-4 text-sm font-bold text-black shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 active:scale-95 rounded-xl flex items-center gap-2"
                >
                  View on GitHub
                  <span aria-hidden="true">↗</span>
                </Link>
                <a
                  href="#install"
                  className="rounded-xl border border-slate-700 px-7 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-slate-500 hover:-translate-y-1 hover:shadow-xl active:scale-95 flex items-center gap-2"
                >
                  Install with Cargo
                </a>
              </div>
            </div>

            {/* Terminal-style demo */}
            <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950/70 shadow-xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <span className="font-mono text-[10px] text-slate-500">
                  cargo-direct demo
                </span>
              </div>
              <div className="space-y-1 px-3 pb-3 pt-2 font-mono text-[12px] text-slate-200">
                <p className="text-slate-400">
                  $ <span className="text-slate-200">cargo install cargo-direct</span>
                </p>
                <p className="text-emerald-400">
                  Installing <span className="font-semibold">cargo-direct</span>...
                </p>
                <p className="text-emerald-400">
                  Downloaded <span className="font-semibold">cargo-direct</span> v0.1.0
                </p>
                <p className="pt-2 text-slate-400">
                  $ <span className="text-slate-200">cargo direct add serde</span>
                </p>
                <p className="text-emerald-400">
                  Added <span className="font-semibold">serde</span> to Cargo.toml
                </p>
                <p className="pt-2 text-slate-400">
                  $ <span className="text-slate-200">cargo direct list</span>
                </p>
                <p className="text-slate-300">
                  ● serde 1.0.0 <span className="text-slate-500">— serialization</span>
                </p>
                <p className="text-slate-500">
                  ▏
                  <span className="ml-1 inline-block h-3 w-1 bg-emerald-400 animate-pulse align-middle" />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="reveal rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-slate-50">
                Features
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Everything you need to move faster with Cargo without changing how you build.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Fast dependency installation",
                body: "Add and update crates quickly, right from your terminal.",
                emoji: "⚡",
              },
              {
                title: "Simple CLI commands",
                body: "Intuitive commands for everyday Rust workflows.",
                emoji: "⌘",
              },
              {
                title: "Lightweight Rust tool",
                body: "Compiled native binary with minimal overhead.",
                emoji: "🦀",
              },
              {
                title: "Improves workflow",
                body: "Stay in the terminal and keep your focus on code.",
                emoji: "🧠",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/10 active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 text-lg">
                    <span aria-hidden="true">{feature.emoji}</span>
                  </div>
                  <h3 className="font-display text-sm font-semibold text-slate-50">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs text-slate-400">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Installation */}
        <section
          id="install"
          className="reveal rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur"
        >
          <h2 className="font-display text-xl font-semibold text-slate-50">
            Installation
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Install Cargo Direct from crates.io with one command.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80">
            <pre className="m-0 px-4 py-3 font-mono text-sm text-emerald-200">
              <code>cargo install cargo-direct</code>
            </pre>
          </div>
        </section>

        {/* Usage */}
        <section
          id="usage"
          className="reveal rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur"
        >
          <h2 className="font-display text-xl font-semibold text-slate-50">
            Usage
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Add a dependency directly from the terminal.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80">
            <pre className="m-0 px-4 py-3 font-mono text-sm text-emerald-200">
              <code>cargo direct add serde</code>
            </pre>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Designed to be predictable: common actions have short, readable commands.
          </p>
        </section>

        {/* About */}
        <section
          id="about"
          className="reveal rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 backdrop-blur"
        >
          <h2 className="font-display text-xl font-semibold text-slate-50">
            About Cargo Direct
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                Cargo Direct is an open-source project built using Rust to simplify
                dependency management for Cargo-based projects. It’s designed to feel
                like a natural extension of Cargo—fast, focused, and terminal-first.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                Want to contribute? Open an issue, suggest features, or submit a PR on
                GitHub. Your feedback helps shape the tool for the wider Rust community.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="https://github.com/kimathimark004-coder/cargo-direct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:border-slate-500 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                >
                  GitHub repository
                </Link>
                <a
                  href="#install"
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:border-slate-500 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

