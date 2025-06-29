import { Spinner } from "@nextui-org/react";
export default function Loading() {
  return (
    <div className="h-screen py-4">
      <Spinner size="lg" className="flex" />
    </div>
  );
}
