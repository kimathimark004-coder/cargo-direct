import { AnalyticsWidgets } from "@/components/dashboard/analytics-widgets";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <main className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Analytics
          </h1>
          <p className="text-muted-foreground">
            Performance metrics and insights for your logistics operations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
        </div>
      </div>

      {/* Top-line stats */}
      <section className="mb-6">
        <DashboardStats
          stats={[
            {
              label: "Active shipments",
              value: "128",
              change: "+12.4%",
              trend: "up",
              icon: "shipments",
            },
            {
              label: "Completed deliveries",
              value: "3,241",
              change: "+8.9%",
              trend: "up",
              icon: "deliveries",
            },
            {
              label: "Total carriers",
              value: "42",
              change: "+3 onboarded",
              trend: "up",
              icon: "carriers",
            },
            {
              label: "Monthly revenue",
              value: "KES 12.8M",
              change: "+6.1%",
              trend: "up",
              icon: "revenue",
            },
          ]}
        />
      </section>

      {/* Analytics Widgets */}
      <section className="mb-6">
        <AnalyticsWidgets />
      </section>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-chart-3" />
              Delivery Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Delivery trend chart will appear here
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-chart-3">94%</p>
                <p className="text-xs text-muted-foreground">On-Time Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2.4h</p>
                <p className="text-xs text-muted-foreground">Avg Delivery</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-chart-1">156</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-chart-2" />
              Route Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { route: "Nairobi - Mombasa", trips: 45, percentage: 85 },
                { route: "Nairobi - Kisumu", trips: 32, percentage: 65 },
                { route: "Eldoret - Nairobi", trips: 28, percentage: 55 },
                { route: "Mombasa - Malindi", trips: 18, percentage: 35 },
              ].map((item) => (
                <div key={item.route}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-foreground">{item.route}</span>
                    <span className="text-muted-foreground">
                      {item.trips} trips
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
