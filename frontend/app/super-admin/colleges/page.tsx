"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { api, College } from "@/lib/api";

export default function CollegesPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    subdomain: "",
    admin_name: "",
    admin_email: "",
    admin_password: "",
    theme_color: "#2563eb",
  });
  const [error, setError] = useState("");

  const { data: colleges, isLoading } = useQuery({
    queryKey: ["colleges"],
    queryFn: () => api.get<College[]>("/api/v1/colleges"),
  });

  const createMutation = useMutation({
    mutationFn: (body: typeof form) => api.post<College>("/api/v1/colleges", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
      setShowForm(false);
      setForm({ name: "", subdomain: "", admin_name: "", admin_email: "", admin_password: "", theme_color: "#2563eb" });
    },
    onError: (err: Error) => setError(err.message),
  });

  return (
    <AuthGuard allowedRoles={["super_admin"]}>
      <DashboardShell title="College Management">
        <div className="mb-6 flex justify-end">
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" /> Onboard College
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Onboard New College</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setError("");
                  createMutation.mutate(form);
                }}
                className="grid gap-4 md:grid-cols-2"
              >
                <div className="space-y-2">
                  <Label>College Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Subdomain</Label>
                  <Input
                    value={form.subdomain}
                    onChange={(e) => setForm({ ...form, subdomain: e.target.value.toLowerCase() })}
                    placeholder="abc-college"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Admin Name</Label>
                  <Input value={form.admin_name} onChange={(e) => setForm({ ...form, admin_name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Admin Email</Label>
                  <Input type="email" value={form.admin_email} onChange={(e) => setForm({ ...form, admin_email: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Admin Password</Label>
                  <Input type="password" value={form.admin_password} onChange={(e) => setForm({ ...form, admin_password: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Theme Color</Label>
                  <Input type="color" value={form.theme_color} onChange={(e) => setForm({ ...form, theme_color: e.target.value })} />
                </div>
                {error && <p className="text-sm text-destructive md:col-span-2">{error}</p>}
                <div className="md:col-span-2">
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Creating..." : "Create College"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Colleges</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : colleges && colleges.length > 0 ? (
              <div className="divide-y">
                {colleges.map((c) => (
                  <div key={c.id} className="flex items-center gap-4 py-4">
                    <div
                      className="h-10 w-10 rounded-xl"
                      style={{ backgroundColor: c.theme_color }}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {c.subdomain}.campusos.com · {c.plan} plan
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs capitalize">{c.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-muted-foreground">No colleges yet. Onboard your first college above.</p>
            )}
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}
