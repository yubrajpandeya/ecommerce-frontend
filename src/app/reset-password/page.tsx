import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { UnauthenticatedRoute } from "@/components/auth/unauthenticated-route";

export default function ResetPasswordPage() {
  return (
    <UnauthenticatedRoute>
      <ResetPasswordForm />
    </UnauthenticatedRoute>
  );
}
