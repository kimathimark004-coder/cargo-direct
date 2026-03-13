import {
  MapPin,
  ShieldCheck,
  Route,
  CalendarRange,
  LayoutDashboard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Real-time shipment tracking",
    description:
      "Monitor live locations and status updates across your delivery network.",
    icon: MapPin,
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
  {
    title: "Verified and trusted drivers",
    description:
      "Reduce fraud risk with driver verification workflows and phone checks.",
    icon: ShieldCheck,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    title: "Smart route optimization",
    description:
      "Plan efficient routes to reduce delays and improve on-time delivery rates.",
    icon: Route,
    iconBg: "bg-chart-1/10",
    iconColor: "text-chart-1",
  },
  {
    title: "Secure booking and dispatching",
    description:
      "Create bookings confidently and dispatch shipments with clear audit trails.",
    icon: CalendarRange,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    title: "Centralized logistics dashboard",
    description:
      "Keep teams aligned with a single command center for operations and analytics.",
    icon: LayoutDashboard,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

export function WhyChoose() {
  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-foreground">
          Why Choose Cargo Direct?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cargo Direct is a modern logistics management platform built to
          simplify shipment operations across Africa. Our system enables
          businesses to track shipments in real time, verify drivers securely,
          and optimize delivery routes using smart logistics technology.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          With Cargo Direct you get:
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Card
              key={f.title}
              className="border-border/70 bg-card/70 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${f.iconColor}`} />
                  </span>
                  <span>{f.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Cargo Direct helps companies move goods faster, safer, and more
        efficiently.
      </p>
    </section>
  );
}

