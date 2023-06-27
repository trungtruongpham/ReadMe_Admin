import { Await, useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider } from "../hooks/useAuth";
import { Suspense } from "react";
import HomePage from "../pages/home";

export const AuthLayout = () => {
  const outlet = useOutlet();
  const userPromise = useLoaderData();

  return (
    <Suspense fallback={<HomePage />}>
      <Await
        resolve={userPromise}
        errorElement={<p>Something went wrong!</p>}
        children={(user) => (
          <AuthProvider
            user={{
              token: user.accessToken,
              refreshToken: user.refreshToken,
              expiration: user.expiration,
            }}
          >
            {outlet}
          </AuthProvider>
        )}
      />
    </Suspense>
  );
};
