import { Suspense } from "react";
import { BuilderApp } from "@/components/builder/BuilderApp";

function BuilderFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <BuilderApp />
    </Suspense>
  );
}
