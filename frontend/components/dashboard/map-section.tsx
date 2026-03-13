"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Truck, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { kenyaLatLonToPercent } from "@/lib/driverLocation";

type LiveDriverMarker = {
  id: string;
  driver_id: string;
  latitude: number;
  longitude: number;
  updated_at: string;
};

const routes = [
  { from: { x: 50, y: 35 }, to: { x: 75, y: 55 }, color: "stroke-chart-1" },
  { from: { x: 25, y: 30 }, to: { x: 40, y: 32 }, color: "stroke-chart-3" },
  { from: { x: 30, y: 22 }, to: { x: 50, y: 35 }, color: "stroke-chart-2" },
  { from: { x: 75, y: 55 }, to: { x: 82, y: 48 }, color: "stroke-chart-5" },
];

export function MapSection() {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [driverMarkers, setDriverMarkers] = useState<LiveDriverMarker[]>([]);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      const { data } = await supabase
        .from("driver_locations")
        .select("id, driver_id, latitude, longitude, updated_at")
        .order("updated_at", { ascending: false })
        .limit(25);

      if (!ignore) setDriverMarkers((data as LiveDriverMarker[]) ?? []);
    };

    void load();

    const channel = supabase
      .channel("driver_locations_live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "driver_locations" },
        () => {
          void load();
        }
      )
      .subscribe();

    return () => {
      ignore = true;
      void supabase.removeChannel(channel);
    };
  }, []);

  const liveMarkers = useMemo(() => {
    // Display unique driver_id markers (latest record wins).
    const byDriver = new Map<string, LiveDriverMarker>();
    for (const m of driverMarkers) {
      if (!byDriver.has(m.driver_id)) byDriver.set(m.driver_id, m);
    }
    return Array.from(byDriver.values()).map((m, idx) => {
      const pos = kenyaLatLonToPercent(m.latitude, m.longitude);
      return {
        idx,
        id: m.id,
        x: pos.x,
        y: pos.y,
        label: "Driver",
        shipmentId: m.driver_id,
      };
    });
  }, [driverMarkers]);

  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
          <Navigation className="h-5 w-5 text-primary" />
          Live Tracking Map
        </CardTitle>
        <p className="text-sm text-muted-foreground">Real-time shipment locations</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-b-lg bg-secondary/50">
          {/* Map Grid Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--border) 1px, transparent 1px),
                linear-gradient(to bottom, var(--border) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Stylized Map Shape (US outline approximation) */}
          <svg
            viewBox="0 0 100 70"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Routes */}
            {routes.map((route, index) => (
              <line
                key={index}
                x1={`${route.from.x}%`}
                y1={`${route.from.y}%`}
                x2={`${route.to.x}%`}
                y2={`${route.to.y}%`}
                className={`${route.color} opacity-60`}
                strokeWidth="2"
                strokeDasharray="4 2"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            ))}
          </svg>

          {/* Markers */}
          {liveMarkers.map((marker) => (
            <div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              onMouseEnter={() => setHoveredMarker(marker.idx)}
              onMouseLeave={() => setHoveredMarker(null)}
            >
              {/* Marker */}
              <div
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-chart-2 shadow-lg shadow-chart-2/30"
              >
                <Truck className="h-4 w-4 text-foreground" />

                {/* Pulse effect for trucks */}
                <span className="absolute inset-0 rounded-full bg-chart-2 animate-ping opacity-40" />
              </div>

              {/* Tooltip */}
              {hoveredMarker === marker.idx && (
                <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-popover px-3 py-2 text-sm shadow-xl border border-border">
                  <p className="font-medium text-popover-foreground">{marker.label}</p>
                  <p className="text-xs text-muted-foreground">{marker.shipmentId}</p>
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover" />
                </div>
              )}
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 flex gap-4 rounded-lg bg-card/90 px-4 py-2 backdrop-blur-sm border border-border">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="h-3 w-3 rounded-full bg-chart-1" />
              <span className="text-muted-foreground">Origin</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="h-3 w-3 rounded-full bg-chart-2" />
              <span className="text-muted-foreground">In Transit</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="h-3 w-3 rounded-full bg-chart-3" />
              <span className="text-muted-foreground">Destination</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
