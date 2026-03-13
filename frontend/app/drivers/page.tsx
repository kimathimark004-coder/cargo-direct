"use client";

import { useEffect, useState } from "react";
import { Truck, Filter, Plus, Check, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Driver {
  id: string;
  full_name: string;
  phone: string;
  vehicle_type: string;
  verification_status: "pending" | "verified" | "rejected";
  phone_verified?: boolean;
  created_at: string;
}

export default function DriversPage() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadDrivers = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("drivers")
      .select(
        "id, full_name, phone, vehicle_type, verification_status, phone_verified, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setDrivers([]);
    } else {
      setDrivers((data as Driver[]) ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    void loadDrivers();
  }, []);

  const badgeClass = (status: Driver["verification_status"]) => {
    switch (status) {
      case "pending":
        return "border-amber-500/40 bg-amber-500/10 text-amber-400";
      case "verified":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
      case "rejected":
        return "border-rose-500/40 bg-rose-500/10 text-rose-400";
      default:
        return "border-muted-foreground/40 bg-muted/10 text-muted-foreground";
    }
  };

  const updateVerification = async (
    id: string,
    verification_status: "verified" | "rejected"
  ) => {
    setUpdatingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/drivers/${id}/verification`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ verification_status }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Failed to update driver.");
      await loadDrivers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update driver.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Truck className="h-6 w-6 text-primary" />
            Drivers
          </h1>
          <p className="text-muted-foreground">
            Manage your fleet drivers, availability, and current locations.
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
            onClick={() => router.push("/drivers/new")}
          >
            <Plus className="h-4 w-4" />
            Add driver
          </Button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      {error ? (
        <p className="text-sm text-destructive">
          Failed to load drivers: {error}
        </p>
      ) : loading ? (
        <p className="text-sm text-muted-foreground">Loading drivers...</p>
      ) : drivers.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No drivers found. Add your first driver to get started.
        </p>
      ) : (
        <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Driver registry</p>
            <p className="text-xs text-muted-foreground">{drivers.length} drivers</p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Truck className="h-4 w-4 text-primary" />
                        </span>
                        <div className="leading-tight">
                          <div>{driver.full_name}</div>
                          <div className="text-xs text-muted-foreground">
                            Phone OTP:{" "}
                            <span className={driver.phone_verified ? "text-emerald-400" : "text-amber-400"}>
                              {driver.phone_verified ? "verified" : "not verified"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {driver.phone}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {driver.vehicle_type}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={badgeClass(driver.verification_status)}>
                        {driver.verification_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {driver.created_at}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          disabled={updatingId === driver.id}
                          onClick={() => updateVerification(driver.id, "verified")}
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          disabled={updatingId === driver.id}
                          onClick={() => updateVerification(driver.id, "rejected")}
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </main>
  );
}

