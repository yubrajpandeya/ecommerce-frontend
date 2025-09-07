import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { UnauthenticatedRoute } from "@/components/auth/unauthenticated-route";

export default function ForgotPasswordPage() {
  return (
    <UnauthenticatedRoute>
      <ForgotPasswordForm />
    </UnauthenticatedRoute>
  );
}
