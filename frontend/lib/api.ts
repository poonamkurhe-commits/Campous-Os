const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ApiError {
  detail: string;
}

export class ApiClient {
  private accessToken: string | null = null;
  private collegeId: string | null = null;
  private collegeSubdomain: string | null = null;

  setAuth(token: string | null, collegeId?: string | null, subdomain?: string | null) {
    this.accessToken = token;
    if (collegeId !== undefined) this.collegeId = collegeId;
    if (subdomain !== undefined) this.collegeSubdomain = subdomain;
  }

  private headers(): HeadersInit {
    const h: Record<string, string> = { "Content-Type": "application/json" };
    if (this.accessToken) h["Authorization"] = `Bearer ${this.accessToken}`;
    if (this.collegeId) h["X-College-Id"] = this.collegeId;
    if (this.collegeSubdomain) h["X-College-Subdomain"] = this.collegeSubdomain;
    return h;
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { ...this.headers(), ...(options.headers || {}) },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || "Request failed");
    }
    return res.json();
  }

  get<T>(path: string) {
    return this.request<T>(path);
  }

  post<T>(path: string, body: unknown) {
    return this.request<T>(path, { method: "POST", body: JSON.stringify(body) });
  }

  patch<T>(path: string, body: unknown) {
    return this.request<T>(path, { method: "PATCH", body: JSON.stringify(body) });
  }
}

export const api = new ApiClient();

export interface AuthResponse {
  tokens: { access_token: string; refresh_token: string; token_type: string };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    college_id: string | null;
    profile: Record<string, unknown>;
    is_verified: boolean;
  };
  college: {
    id: string;
    name: string;
    subdomain: string;
    logo_url: string | null;
    theme_color: string;
    plan: string;
    status: string;
  } | null;
}

export interface College {
  id: string;
  name: string;
  subdomain: string;
  logo_url: string | null;
  theme_color: string;
  plan: string;
  status: string;
  created_at?: string;
}

export interface DashboardStats {
  total_students: number;
  total_faculty: number;
  unread_notifications: number;
  attendance_rate: number | null;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  priority: string;
  created_at: string;
  is_read: boolean;
}
