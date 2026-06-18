import { apiFetch, jsonHeaders } from "@/services/api-client";
import type {
  AdminPlaceSubmissionListItem,
  AdminUserListItem,
  PaginatedResponse
} from "@/types/api";

interface AdminUsersQuery {
  page: number;
  pageSize: number;
  query?: string;
}

function toSearchParams(query: AdminUsersQuery) {
  const params = new URLSearchParams({
    page: String(query.page),
    pageSize: String(query.pageSize)
  });

  if (query.query?.trim()) {
    params.set("query", query.query.trim());
  }

  return params;
}

export const adminService = {
  getUsers(query: AdminUsersQuery) {
    const params = toSearchParams(query);

    return apiFetch<PaginatedResponse<AdminUserListItem>>(
      `/admin/users?${params.toString()}`
    );
  },

  getPlaceSubmissions(query: AdminUsersQuery) {
    const params = toSearchParams(query);

    return apiFetch<PaginatedResponse<AdminPlaceSubmissionListItem>>(
      `/admin/place-submissions?${params.toString()}`
    );
  },

  approvePlaceSubmission(
    submissionId: string,
    coordinates: AdminPlaceSubmissionListItem["coordinates"]
  ) {
    return apiFetch<{ submission: AdminPlaceSubmissionListItem }>(
      `/admin/place-submissions/${submissionId}/approve`,
      {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({ coordinates })
      }
    );
  },

  rejectPlaceSubmission(submissionId: string) {
    return apiFetch<{ submission: AdminPlaceSubmissionListItem }>(
      `/admin/place-submissions/${submissionId}/reject`,
      {
        method: "POST"
      }
    );
  }
};
