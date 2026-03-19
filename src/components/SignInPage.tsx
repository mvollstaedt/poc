import { SignIn } from '@clerk/react';

export default function SignInPage() {
  return (
    <div className="login-page">
      <SignIn forceRedirectUrl="/poc" />
    </div>
  );
}
