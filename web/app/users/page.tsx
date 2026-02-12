import type { Metadata } from "next";
import UserContent from "./_components/content";

export const metadata: Metadata = {
  title: "Membros",
};
export default function UserPage() {
  return (
    <UserContent />
  );
}
