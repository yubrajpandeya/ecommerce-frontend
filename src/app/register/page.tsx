import { RegisterForm } from "@/components/auth/register-form";
import { UnauthenticatedRoute } from "@/components/auth/unauthenticated-route";

export default function RegisterPage() {
  return (
    <UnauthenticatedRoute>
      <RegisterForm />
    </UnauthenticatedRoute>
  );
}
