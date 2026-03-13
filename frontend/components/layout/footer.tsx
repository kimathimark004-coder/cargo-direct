"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const companies = [
  {
    name: "LogiTrans Ltd",
    quote:
      "Cargo Direct has transformed how we manage deliveries across Kenya. Real-time tracking and driver verification have improved our logistics efficiency dramatically.",
  },
  {
    name: "East Africa Freight",
    quote:
      "Our dispatch team ships faster with a single view of bookings, drivers, and live locations.",
  },
  {
    name: "Nairobi Cargo Movers",
    quote:
      "Driver verification reduced fraud risk and made our operations more reliable.",
  },
  {
    name: "SwiftRoute Logistics",
    quote:
      "Tracking visibility improved customer trust and cut down on follow-up calls.",
  },
  {
    name: "Prime Supply Chain",
    quote:
      "A professional dashboard that keeps all stakeholders aligned in real time.",
  },
  {
    name: "Kenya Industrial Transport",
    quote:
      "We standardized dispatch workflows and improved on-time performance across routes.",
  },
];

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Shipments", href: "/shipments" },
  { label: "Drivers", href: "/drivers" },
  { label: "Tracking", href: "/tracking" },
  { label: "Support", href: "/settings" },
];

export function Footer() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % companies.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/60">
                <Image
                  src="/logo.png"
                  alt="Cargo Direct"
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Cargo Direct
                </p>
                <p className="text-xs text-muted-foreground">
                  Smart Logistics Platform
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Modern logistics operations for booking, dispatching, verification,
              and real-time shipment tracking across Africa.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Quick links</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Trusted by operators
            </p>
            <Card className="border-border/70 bg-card/70 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="flex items-stretch">
                    {companies.map((c, i) => {
                      const active = i === index;
                      return (
                        <div
                          key={c.name}
                          className={cn(
                            "w-full shrink-0 p-5 transition-opacity duration-500",
                            active ? "opacity-100" : "opacity-0 absolute inset-0"
                          )}
                          aria-hidden={!active}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/50">
                              <span className="text-sm font-semibold text-foreground">
                                {c.name
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((w) => w[0])
                                  .join("")
                                  .toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {c.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Client testimonial
                              </p>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground">
                            “{c.quote}”
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-1.5">
              {companies.map((c, i) => (
                <button
                  key={c.name}
                  className={cn(
                    "h-1.5 w-8 rounded-full transition-colors",
                    i === index ? "bg-primary" : "bg-border"
                  )}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial: ${c.name}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Cargo Direct — Smart Logistics Platform</span>
          <span className="text-muted-foreground/80">
            Built for modern operations teams
          </span>
        </div>
      </div>
    </footer>
  );
}

