import { LoginForm } from "@/components/auth/login-form";
import { UnauthenticatedRoute } from "@/components/auth/unauthenticated-route";

export default function LoginPage() {
  return (
    <UnauthenticatedRoute>
      <LoginForm />
    </UnauthenticatedRoute>
  );
}
