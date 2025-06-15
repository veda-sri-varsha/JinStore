import type { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};
