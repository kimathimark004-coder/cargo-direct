import { AnalyticsWidgets } from "@/components/dashboard/analytics-widgets";
import { MapSection } from "@/components/dashboard/map-section";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ShipmentCards } from "@/components/dashboard/shipment-cards";
import { TrackingStatus } from "@/components/dashboard/tracking-status";
import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const { data: shipments } = await supabase
    .from("shipments")
    .select(
      "id, origin, destination, cargo_type, eta, status, driver"
    )
    .order("created_at", { ascending: false })
    .limit(6);

  const activeShipments =
    shipments?.filter((s) => s.status === "in_transit").length ?? 0;
  const completedDeliveries =
    shipments?.filter((s) => s.status === "delivered").length ?? 0;
  const totalShipments = shipments?.length ?? 0;

  return (
    <main className="p-6 space-y-6">
      <section>
        <AnalyticsWidgets
          values={{
            activeShipments,
            completedDeliveries,
            totalShipments,
            monthlyRevenue: "KES 0",
          }}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <MapSection />
          <ShipmentCards shipments={shipments ?? []} />
        </div>
        <div className="space-y-6">
          <TrackingStatus />
          <ActivityFeed />
        </div>
      </section>
    </main>
  );
}

