"use client";

import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParentBusPage() {
  return (
    <AuthGuard allowedRoles={["parent"]}>
      <DashboardShell title="Bus Tracking">
        <Card>
          <CardHeader>
            <CardTitle>Live Bus Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-xl bg-muted/50">
              <p className="text-muted-foreground">Phase 3 — WebSocket + Google Maps</p>
            </div>
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}
