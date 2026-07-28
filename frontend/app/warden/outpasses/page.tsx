"use client";

import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WardenOutpassesPage() {
  return (
    <AuthGuard allowedRoles={["warden"]}>
      <DashboardShell title="Outpass Management">
        <Card>
          <CardHeader>
            <CardTitle>All Outpass Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Digital outpass request & approval — Phase 3</p>
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}
