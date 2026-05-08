import { CyberPlasmaLoader } from "@/shared/ui/loaders/CyberPlasmaLoader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">
      <CyberPlasmaLoader />
    </div>
  );
}
