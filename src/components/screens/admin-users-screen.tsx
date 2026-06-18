"use client";

import {
  Check,
  ClipboardList,
  Eye,
  Search,
  ShieldCheck,
  X
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { adminService } from "@/services/admin-service";
import type {
  AdminPlaceSubmissionListItem,
  AdminUserListItem,
  PaginationMeta
} from "@/types/api";

const PAGE_SIZE = 10;
const initialPagination: PaginationMeta = {
  page: 1,
  pageSize: PAGE_SIZE,
  total: 0,
  totalPages: 0
};

type ReviewModalMode = "review" | "approve" | "reject";

export function AdminUsersScreen() {
  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(initialPagination);
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<AdminPlaceSubmissionListItem[]>(
    []
  );
  const [submissionsPagination, setSubmissionsPagination] =
    useState<PaginationMeta>(initialPagination);
  const [submissionsQuery, setSubmissionsQuery] = useState("");
  const [appliedSubmissionsQuery, setAppliedSubmissionsQuery] = useState("");
  const [areSubmissionsLoading, setAreSubmissionsLoading] = useState(true);
  const [submissionsError, setSubmissionsError] = useState("");
  const [selectedSubmission, setSelectedSubmission] =
    useState<AdminPlaceSubmissionListItem | null>(null);
  const [reviewModalMode, setReviewModalMode] =
    useState<ReviewModalMode>("review");
  const [reviewCoordinates, setReviewCoordinates] = useState<{
    lat: string;
    lng: string;
  }>({ lat: "", lng: "" });
  const [reviewError, setReviewError] = useState("");
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);

  async function loadUsers(page = 1, nextQuery = appliedQuery) {
    setIsLoading(true);
    setError("");

    try {
      const payload = await adminService.getUsers({
        page,
        pageSize: PAGE_SIZE,
        query: nextQuery
      });
      setUsers(payload.data);
      setPagination(payload.pagination);
    } catch (loadError) {
      setUsers([]);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "No se pudo cargar la lista de usuarios."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function loadSubmissions(
    page = 1,
    nextQuery = appliedSubmissionsQuery
  ) {
    setAreSubmissionsLoading(true);
    setSubmissionsError("");

    try {
      const payload = await adminService.getPlaceSubmissions({
        page,
        pageSize: PAGE_SIZE,
        query: nextQuery
      });
      setSubmissions(payload.data);
      setSubmissionsPagination(payload.pagination);
    } catch (loadError) {
      setSubmissions([]);
      setSubmissionsError(
        loadError instanceof Error
          ? loadError.message
          : "No se pudieron cargar los lugares pendientes."
      );
    } finally {
      setAreSubmissionsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    void Promise.all([
      adminService.getUsers({
        page: 1,
        pageSize: PAGE_SIZE
      }),
      adminService.getPlaceSubmissions({
        page: 1,
        pageSize: PAGE_SIZE
      })
    ])
      .then(([usersPayload, submissionsPayload]) => {
        if (!isMounted) {
          return;
        }

        setUsers(usersPayload.data);
        setPagination(usersPayload.pagination);
        setSubmissions(submissionsPayload.data);
        setSubmissionsPagination(submissionsPayload.pagination);
      })
      .catch((loadError) => {
        if (!isMounted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo cargar la lista de usuarios."
        );
        setSubmissionsError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudieron cargar los lugares pendientes."
        );
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
          setAreSubmissionsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = query.trim();
    setAppliedQuery(nextQuery);
    void loadUsers(1, nextQuery);
  }

  function handleSubmissionsSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = submissionsQuery.trim();
    setAppliedSubmissionsQuery(nextQuery);
    void loadSubmissions(1, nextQuery);
  }

  function openSubmissionReview(submission: AdminPlaceSubmissionListItem) {
    setSelectedSubmission(submission);
    setReviewModalMode("review");
    setReviewError("");
    setReviewCoordinates({
      lat:
        submission.coordinates?.lat !== undefined
          ? String(submission.coordinates.lat)
          : "",
      lng:
        submission.coordinates?.lng !== undefined
          ? String(submission.coordinates.lng)
          : ""
    });
  }

  function closeSubmissionReview() {
    if (isReviewSubmitting) {
      return;
    }

    setSelectedSubmission(null);
    setReviewModalMode("review");
    setReviewError("");
  }

  async function approveSelectedSubmission() {
    if (!selectedSubmission) {
      return;
    }

    const lat = Number(reviewCoordinates.lat);
    const lng = Number(reviewCoordinates.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      setReviewError("Revisá latitud y longitud antes de aprobar.");
      return;
    }

    setIsReviewSubmitting(true);
    setReviewError("");

    try {
      await adminService.approvePlaceSubmission(selectedSubmission.id, {
        lat,
        lng
      });
      closeSubmissionReviewAfterSubmit();
      void loadSubmissions(submissionsPagination.page);
    } catch (approvalError) {
      setReviewError(
        approvalError instanceof Error
          ? approvalError.message
          : "No se pudo aprobar el lugar."
      );
    } finally {
      setIsReviewSubmitting(false);
    }
  }

  async function rejectSelectedSubmission() {
    if (!selectedSubmission) {
      return;
    }

    setIsReviewSubmitting(true);
    setReviewError("");

    try {
      await adminService.rejectPlaceSubmission(selectedSubmission.id);
      closeSubmissionReviewAfterSubmit();
      void loadSubmissions(submissionsPagination.page);
    } catch (rejectionError) {
      setReviewError(
        rejectionError instanceof Error
          ? rejectionError.message
          : "No se pudo rechazar el lugar."
      );
    } finally {
      setIsReviewSubmitting(false);
    }
  }

  function closeSubmissionReviewAfterSubmit() {
    setSelectedSubmission(null);
    setReviewModalMode("review");
    setReviewError("");
  }

  const canGoBack = pagination.page > 1;
  const canGoForward =
    pagination.totalPages > 0 && pagination.page < pagination.totalPages;
  const canSubmissionsGoBack = submissionsPagination.page > 1;
  const canSubmissionsGoForward =
    submissionsPagination.totalPages > 0 &&
    submissionsPagination.page < submissionsPagination.totalPages;

  return (
    <div className="admin-page">
      <header className="page-header">
        <p className="badge badge--accent">Admin</p>
        <h1>Usuarios</h1>
        <p>Listado de cuentas registradas y roles asignados.</p>
      </header>

      <section className="admin-toolbar" aria-label="Filtros de usuarios">
        <form className="admin-search" onSubmit={handleSearch}>
          <label className="sr-only" htmlFor="admin-user-search">
            Buscar usuarios
          </label>
          <Search aria-hidden="true" size={18} />
          <input
            id="admin-user-search"
            type="search"
            placeholder="Buscar por nombre o email"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button type="submit" variant="ghost">
            Buscar
          </Button>
        </form>
        <div className="admin-total" aria-live="polite">
          <ShieldCheck aria-hidden="true" size={18} />
          <span>{pagination.total} usuarios</span>
        </div>
      </section>

      <section className="admin-table-wrap" aria-label="Tabla de usuarios">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Alta</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <span className="admin-avatar" aria-hidden="true">
                    {user.avatar}
                  </span>
                  <strong>{user.name}</strong>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge--neutral">{user.role}</span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!isLoading && users.length === 0 ? (
          <div className="admin-empty-state">
            <h2>No hay usuarios para mostrar</h2>
            <p>Cuando existan cuentas en la base, van a aparecer acá.</p>
          </div>
        ) : null}

        {isLoading ? <p className="status-message">Cargando usuarios...</p> : null}
        {error ? (
          <p className="field-error" role="alert">
            {error}
          </p>
        ) : null}
      </section>

      <footer className="admin-pagination" aria-label="Paginación de usuarios">
        <Button
          type="button"
          variant="ghost"
          disabled={!canGoBack || isLoading}
          onClick={() => void loadUsers(pagination.page - 1)}
        >
          Anterior
        </Button>
        <span>
          Página {pagination.page}
          {pagination.totalPages > 0 ? ` de ${pagination.totalPages}` : ""}
        </span>
        <Button
          type="button"
          variant="ghost"
          disabled={!canGoForward || isLoading}
          onClick={() => void loadUsers(pagination.page + 1)}
        >
          Siguiente
        </Button>
      </footer>

      <section className="admin-section" aria-labelledby="pending-places-title">
        <header className="section-header">
          <div>
            <p className="badge badge--accent">Pendientes</p>
            <h2 id="pending-places-title">Lugares a aprobar</h2>
            <p>Solicitudes enviadas por usuarios desde Agregar lugar.</p>
          </div>
        </header>

        <div className="admin-toolbar" aria-label="Filtros de lugares pendientes">
          <form className="admin-search" onSubmit={handleSubmissionsSearch}>
            <label className="sr-only" htmlFor="admin-submission-search">
              Buscar lugares pendientes
            </label>
            <Search aria-hidden="true" size={18} />
            <input
              id="admin-submission-search"
              type="search"
              placeholder="Buscar por nombre, dirección o categoría"
              value={submissionsQuery}
              onChange={(event) => setSubmissionsQuery(event.target.value)}
            />
            <Button type="submit" variant="ghost">
              Buscar
            </Button>
          </form>
          <div className="admin-total" aria-live="polite">
            <ClipboardList aria-hidden="true" size={18} />
            <span>{submissionsPagination.total} pendientes</span>
          </div>
        </div>

        <section className="admin-table-wrap" aria-label="Tabla de lugares pendientes">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Lugar</th>
                <th>Dirección</th>
                <th>Categoría</th>
                <th>Características</th>
                <th>Enviado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>
                    <strong>{submission.name}</strong>
                  </td>
                  <td>{submission.address}</td>
                  <td>{submission.category}</td>
                  <td>{formatBadges(submission.badges)}</td>
                  <td>{formatDate(submission.submittedAt)}</td>
                  <td>
                    <Button
                      type="button"
                      variant="ghost"
                      icon={<Eye aria-hidden="true" size={18} />}
                      onClick={() => openSubmissionReview(submission)}
                    >
                      Revisar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!areSubmissionsLoading && submissions.length === 0 ? (
            <div className="admin-empty-state">
              <h2>No hay lugares pendientes</h2>
              <p>Cuando un usuario envíe un lugar, va a aparecer acá.</p>
            </div>
          ) : null}

          {areSubmissionsLoading ? (
            <p className="status-message">Cargando lugares pendientes...</p>
          ) : null}
          {submissionsError ? (
            <p className="field-error" role="alert">
              {submissionsError}
            </p>
          ) : null}
        </section>

        <footer
          className="admin-pagination"
          aria-label="Paginación de lugares pendientes"
        >
          <Button
            type="button"
            variant="ghost"
            disabled={!canSubmissionsGoBack || areSubmissionsLoading}
            onClick={() => void loadSubmissions(submissionsPagination.page - 1)}
          >
            Anterior
          </Button>
          <span>
            Página {submissionsPagination.page}
            {submissionsPagination.totalPages > 0
              ? ` de ${submissionsPagination.totalPages}`
              : ""}
          </span>
          <Button
            type="button"
            variant="ghost"
            disabled={!canSubmissionsGoForward || areSubmissionsLoading}
            onClick={() => void loadSubmissions(submissionsPagination.page + 1)}
          >
            Siguiente
          </Button>
        </footer>
      </section>

      {selectedSubmission ? (
        <ReviewPlaceSubmissionModal
          submission={selectedSubmission}
          mode={reviewModalMode}
          coordinates={reviewCoordinates}
          error={reviewError}
          isSubmitting={isReviewSubmitting}
          onCoordinatesChange={setReviewCoordinates}
          onClose={closeSubmissionReview}
          onModeChange={setReviewModalMode}
          onApprove={() => void approveSelectedSubmission()}
          onReject={() => void rejectSelectedSubmission()}
        />
      ) : null}
    </div>
  );
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(value));
}

function formatBadges(badges: string[]) {
  return badges.length > 0 ? badges.join(", ") : "-";
}

function ReviewPlaceSubmissionModal({
  submission,
  mode,
  coordinates,
  error,
  isSubmitting,
  onCoordinatesChange,
  onClose,
  onModeChange,
  onApprove,
  onReject
}: {
  submission: AdminPlaceSubmissionListItem;
  mode: ReviewModalMode;
  coordinates: { lat: string; lng: string };
  error: string;
  isSubmitting: boolean;
  onCoordinatesChange: (coordinates: { lat: string; lng: string }) => void;
  onClose: () => void;
  onModeChange: (mode: ReviewModalMode) => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="admin-modal-backdrop" role="presentation">
      <section
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-review-title"
      >
        <header className="admin-modal__header">
          <div>
            <p className="badge badge--accent">
              {mode === "review"
                ? "Revisión"
                : mode === "approve"
                  ? "Confirmar aprobación"
                  : "Confirmar rechazo"}
            </p>
            <h2 id="admin-review-title">{submission.name}</h2>
          </div>
          <Button
            type="button"
            variant="ghost"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cerrar
          </Button>
        </header>

        <div className="admin-review-grid">
          <div>
            <strong>Dirección</strong>
            <p>{submission.address}</p>
          </div>
          <div>
            <strong>Categoría</strong>
            <p>{submission.category}</p>
          </div>
          <div>
            <strong>Características</strong>
            <p>{formatBadges(submission.badges)}</p>
          </div>
          <div>
            <strong>Enviado</strong>
            <p>{formatDate(submission.submittedAt)}</p>
          </div>
        </div>

        {submission.description ? (
          <div className="admin-review-block">
            <strong>Descripción</strong>
            <p>{submission.description}</p>
          </div>
        ) : null}

        <fieldset className="admin-coordinate-fields">
          <legend>Ubicación publicada</legend>
          <label>
            <span>Latitud</span>
            <input
              type="number"
              step="any"
              value={coordinates.lat}
              disabled={isSubmitting || mode === "reject"}
              onChange={(event) =>
                onCoordinatesChange({
                  ...coordinates,
                  lat: event.target.value
                })
              }
            />
          </label>
          <label>
            <span>Longitud</span>
            <input
              type="number"
              step="any"
              value={coordinates.lng}
              disabled={isSubmitting || mode === "reject"}
              onChange={(event) =>
                onCoordinatesChange({
                  ...coordinates,
                  lng: event.target.value
                })
              }
            />
          </label>
        </fieldset>

        {mode === "approve" ? (
          <p className="status-message">
            Al aprobar, el lugar queda publicado y aparece en mapa/listados.
          </p>
        ) : null}
        {mode === "reject" ? (
          <p className="status-message">
            Al rechazar, la solicitud sale de pendientes y no se publica.
          </p>
        ) : null}
        {error ? (
          <p className="field-error" role="alert">
            {error}
          </p>
        ) : null}

        <footer className="admin-modal__actions">
          {mode === "review" ? (
            <>
              <Button
                type="button"
                variant="danger"
                icon={<X aria-hidden="true" size={18} />}
                onClick={() => onModeChange("reject")}
              >
                Rechazar
              </Button>
              <Button
                type="button"
                icon={<Check aria-hidden="true" size={18} />}
                onClick={() => onModeChange("approve")}
              >
                Aprobar
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="ghost"
                disabled={isSubmitting}
                onClick={() => onModeChange("review")}
              >
                Volver
              </Button>
              <Button
                type="button"
                variant={mode === "approve" ? "primary" : "danger"}
                disabled={isSubmitting}
                onClick={mode === "approve" ? onApprove : onReject}
              >
                {isSubmitting
                  ? "Guardando..."
                  : mode === "approve"
                    ? "Confirmar aprobación"
                    : "Confirmar rechazo"}
              </Button>
            </>
          )}
        </footer>
      </section>
    </div>
  );
}
