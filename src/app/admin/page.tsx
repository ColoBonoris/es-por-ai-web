import { AdminProtectedPage } from "@/components/app/protected-page";
import { AdminUsersScreen } from "@/components/screens/admin-users-screen";

export default function AdminPage() {
  return (
    <AdminProtectedPage>
      <AdminUsersScreen />
    </AdminProtectedPage>
  );
}
