import { SiteFrame } from "@/components/editorial/primitives";
import { getPublicInvitableEvents } from "@/lib/supabase/events";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const events = await getPublicInvitableEvents();
  const hasPublicInvitableEvent = events.status === "success" && events.data.length > 0;

  return <SiteFrame showEvents={hasPublicInvitableEvent}>{children}</SiteFrame>;
}
