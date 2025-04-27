import { Loader } from "lucide-react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin">
        <Loader />
      </div>
    </div>
  );
}
