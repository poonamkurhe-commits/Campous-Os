"use client";

import { Bot } from "lucide-react";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIAssistantPage() {
  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardShell title="AI Campus Assistant">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" /> AI Assistant
            </CardTitle>
            <CardDescription>
              Ask questions about syllabus, timetables, and campus policies — scoped to your college.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border bg-muted/30 p-8 text-center">
              <Bot className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="font-medium">Coming in Phase 4</p>
              <p className="mt-2 text-sm text-muted-foreground">
                RAG-powered chatbot with per-college document ingestion will be available here.
              </p>
            </div>
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}
