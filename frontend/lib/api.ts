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

  delete<T>(path: string) {
    return this.request<T>(path, { method: "DELETE" });
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

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  college_id: string | null;
  profile: Record<string, unknown>;
  is_verified: boolean;
}

export interface Student {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  roll_no: string;
  department: string;
  course?: string;
  year: number;
  semester: number;
  avatar_url?: string;
  emergency_contact?: string;
  blood_group?: string;
  created_at?: string;
}

export interface StudentAttendanceRecord {
  student_id: string;
  status: string;
  marked_by?: string | null;
}

export interface Attendance {
  id: string;
  faculty_id: string;
  subject: string;
  date: string;
  session_name?: string | null;
  records: StudentAttendanceRecord[];
  created_at: string;
}

export interface Assignment {
  id: string;
  created_by: string;
  title: string;
  description?: string;
  subject?: string;
  due_date?: string | null;
  attachments: string[];
  published: boolean;
  created_at: string;
}

export interface Submission {
  id: string;
  assignment_id: string;
  student_id: string;
  files: string[];
  submitted_at: string;
  marks_awarded?: number | null;
}

export interface Result {
  id: string;
  student_id: string;
  subject: string;
  exam_name?: string;
  internal_marks?: number;
  practical_marks?: number;
  total_marks?: number;
  grade?: string;
}

export interface TimetableEntry {
  id: string;
  faculty_id: string;
  subject: string;
  classroom?: string | null;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  course?: string;
  designation?: string;
  status?: string;
  subjects: string[];
  created_at?: string;
}

export interface UserPayload {
  name: string;
  email: string;
  password: string;
  role: "student" | "faculty" | "parent" | "warden";
  department?: string;
  course?: string;
  designation?: string;
  status?: string;
  hostel?: string;
  phone?: string;
  student_ids?: string[];
  subjects?: string[];
  roll_no?: string;
  year?: number;
  semester?: number;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  department?: string;
  course?: string;
  designation?: string;
  status?: string;
  hostel?: string;
  phone?: string;
  student_ids?: string[];
  subjects?: string[];
  roll_no?: string;
  year?: number;
  semester?: number;
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
