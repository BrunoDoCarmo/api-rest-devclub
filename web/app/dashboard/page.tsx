import type { Metadata } from "next";
import { DashboardContent } from "./_components/content";

export const metadata: Metadata = {
  title: "Dashboard",
};
export default function DashboardPage() {
  return (
    <DashboardContent />
  );
}
