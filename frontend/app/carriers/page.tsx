"use client";

import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarrierCard } from "@/components/dashboard/CarrierCard";
import { useRouter } from "next/navigation";

const CARRIERS = [
  {
    name: "Trans-Kenya Hauliers",
    truckType: "40T curtain sider",
    capacity: "28t / 96m³",
    rating: 4.7,
    lanes: "Mombasa ↔ Nairobi, Nairobi ↔ Eldoret",
    contact: "operations@transkenya.co.ke",
    phone: "+254 700 123 456",
    priceEstimate: "KES 68,000 / trip",
  },
  {
    name: "Great Rift Carriers",
    truckType: "28T refrigerated",
    capacity: "22t / 82m³",
    rating: 4.4,
    lanes: "Nairobi ↔ Nakuru, Nakuru ↔ Kisumu",
    contact: "support@grcrr.com",
    phone: "+254 711 987 654",
    priceEstimate: "KES 72,500 / trip",
  },
  {
    name: "Eastline Rail Services",
    truckType: "Rail flatbed",
    capacity: "Up to 36t / wagon",
    rating: 4.8,
    lanes: "Mombasa Port ↔ Nairobi ICD",
    contact: "dispatch@eastlinerail.com",
    phone: "+254 722 555 111",
    priceEstimate: "KES 54,000 / TEU",
  },
];

export default function CarriersPage() {
  const router = useRouter();

  return (
    <main className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            Carriers
          </h1>
          <p className="text-muted-foreground">
            Maintain your network of trucking companies and rail operators in one place.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/bookings")}
          >
            Invite carrier
          </Button>
          <Button
            className="gap-2"
            onClick={() => router.push("/bookings")}
          >
            <Plus className="h-4 w-4" />
            Add contract
          </Button>
        </div>
      </div>

      {/* Carrier marketplace grid */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Carrier marketplace
            </h2>
            <p className="text-xs text-muted-foreground">
              Compare rates, capacity, and performance before you book.
            </p>
          </div>
          <span className="text-xs text-muted-foreground">
            {CARRIERS.length} carriers
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CARRIERS.map((carrier) => (
            <CarrierCard
              key={carrier.name}
              name={carrier.name}
              truckType={carrier.truckType}
              capacity={carrier.capacity}
              rating={carrier.rating}
              priceEstimate={carrier.priceEstimate}
              onBook={() => router.push("/bookings")}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
