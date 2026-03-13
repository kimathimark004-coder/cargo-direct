"use client";

import { useEffect, useState } from "react";
import { MapPin, Filter } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrackingStatus } from "@/components/dashboard/tracking-status";

interface TrackingUpdate {
  id: string;
  shipment_id: string;
  status: string;
  location: string;
  event_time: string;
}

export default function TrackingPage() {
  const [updates, setUpdates] = useState<TrackingUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUpdates = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("tracking_updates")
        .select("id, shipment_id, status, location, event_time")
        .order("event_time", { ascending: false })
        .limit(20);

      if (error) {
        setError(error.message);
        setUpdates([]);
      } else {
        setUpdates((data as TrackingUpdate[]) ?? []);
      }

      setLoading(false);
    };

    void loadUpdates();
  }, []);

  return (
    <main className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Tracking
          </h1>
          <p className="text-muted-foreground">
            Monitor live shipment status and recent location updates.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-card-foreground">
              Recent tracking updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {error ? (
              <p className="text-sm text-destructive">
                Failed to load tracking updates: {error}
              </p>
            ) : loading ? (
              <p className="text-sm text-muted-foreground">
                Loading tracking updates...
              </p>
            ) : updates.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tracking updates yet.
              </p>
            ) : (
              <div className="space-y-2">
                {updates.map((update) => (
                  <div
                    key={update.id}
                    className="flex items-start justify-between gap-3 rounded-lg border border-border/60 bg-background/80 px-3 py-2.5 text-sm"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        Shipment {update.shipment_id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {update.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {update.status}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {update.event_time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <TrackingStatus />
      </section>
    </main>
  );
}

