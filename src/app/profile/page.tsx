import { UserProfile } from "@/components/auth/user-profile";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  );
}
