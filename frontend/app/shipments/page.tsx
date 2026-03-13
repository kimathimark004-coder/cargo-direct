"use client";

import { useEffect, useState } from "react";
import { Package, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShipmentCards } from "@/components/dashboard/shipment-cards";
import { supabase } from "@/lib/supabase";

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  cargo_type: string;
  eta: string;
  status: string;
  driver: string;
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShipments = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("shipments")
        .select(
          "id, origin, destination, cargo_type, eta, status, driver"
        )
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setShipments([]);
      } else {
        setShipments((data as Shipment[]) ?? []);
      }

      setLoading(false);
    };

    void loadShipments();
  }, []);

  return (
    <main className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            Shipments
          </h1>
          <p className="text-muted-foreground">
            Manage and track all your shipments across Kenya.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            size="sm"
            className="gap-2"
            // In a later iteration this can open a "New shipment" form
            onClick={() => alert("Implement new shipment creation form")}
          >
            <Plus className="h-4 w-4" />
            New Shipment
          </Button>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-destructive">
          Failed to load shipments: {error}
        </p>
      ) : loading ? (
        <p className="text-sm text-muted-foreground">Loading shipments...</p>
      ) : (
        <ShipmentCards shipments={shipments} />
      )}
    </main>
  );
}

