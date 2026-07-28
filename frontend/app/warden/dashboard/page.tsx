"use client";

import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WardenDashboard() {
  return (
    <AuthGuard allowedRoles={["warden"]}>
      <DashboardShell title="Hostel Dashboard">
        <Card>
          <CardHeader>
            <CardTitle>Pending Outpass Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Outpass approval workflow — Phase 3</p>
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}
