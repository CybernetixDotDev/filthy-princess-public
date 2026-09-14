import { CTA, CinematicPlaceholder, EditorialHero, EditorialSection } from "@/components/editorial/primitives";
import { getPublicInvitableEvents } from "@/lib/supabase/events";
import type { PublicInvitableEvent } from "@/lib/supabase/types";

export const metadata = { title: "Events", description: "Special private experiences, occasionally." };

const dateFormatter = new Intl.DateTimeFormat("en-ZA", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function parseDatabaseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12));
}

function formatEventDates(event: PublicInvitableEvent) {
  const start = dateFormatter.format(parseDatabaseDate(event.start_date));
  const end = dateFormatter.format(parseDatabaseDate(event.end_date));
  return start === end ? start : `${start} — ${end}`;
}

function EventsMessage({ unavailable = false }: { unavailable?: boolean }) {
  return (
    <EditorialSection eyebrow="Occasionally" className="bg-[#171211]">
      <p className="display max-w-2xl text-3xl leading-tight sm:text-5xl">
        {unavailable
          ? "Events are temporarily unavailable. Please look again soon."
          : "There are no invitations whispering just now."}
      </p>
    </EditorialSection>
  );
}

function Event({ event, index }: { event: PublicInvitableEvent; index: number }) {
  return (
    <EditorialSection
      eyebrow={`Invitation ${String(index + 1).padStart(2, "0")}`}
      title={event.title}
      className={index % 2 === 0 ? "bg-[#171211]" : "bg-[#100e0d]"}
    >
      <div className="mt-10 grid gap-8 sm:grid-cols-[1.15fr_1fr] sm:items-end">
        <CinematicPlaceholder title={event.title} description={event.description ?? event.title} tone="gold" />
        <div>
          <p className="eyebrow text-[#e9c99d]">Invitation only</p>
          <p className="display mt-5 text-2xl text-white/90">{formatEventDates(event)}</p>
          {event.description && <p className="mt-5 text-xl leading-8 text-white/70">{event.description}</p>}
          <div className="mt-8">
            <CTA href="/inner-sanctum">Want to be invited?</CTA>
          </div>
        </div>
      </div>
    </EditorialSection>
  );
}

export default async function EventsPage() {
  const events = await getPublicInvitableEvents();

  return (
    <main>
      <EditorialHero
        kicker="Occasionally"
        title={<>The good kind<br /><i>of trouble.</i></>}
        intro="Special private experiences for people who are paying attention."
        tone="rose"
      />
      {events.status === "unavailable" ? (
        <EventsMessage unavailable />
      ) : events.data.length === 0 ? (
        <EventsMessage />
      ) : (
        events.data.map((event, index) => <Event key={event.id} event={event} index={index} />)
      )}
    </main>
  );
}
