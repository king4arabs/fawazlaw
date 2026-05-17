import { OfficePreferencesProvider } from "@/features/office/components/office-preferences-provider";
import { OfficeShell } from "@/features/office/components/office-shell";

export default function OfficeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <OfficePreferencesProvider>
      <OfficeShell>{children}</OfficeShell>
    </OfficePreferencesProvider>
  );
}
