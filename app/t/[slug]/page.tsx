import { teaserEnterHref } from "@/lib/teaser-destination";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeaserExperience } from "@/components/teaser/teaser-experience";
import { getPublishedTeaser, teaserMediaUrl } from "@/lib/supabase/teasers";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const teaser = await getPublishedTeaser((await params).slug);
  return {
    title: teaser?.title ?? "Invitation",
    // Exact-link experiences are not a discovery surface, including private teasers.
    robots: { index: false, follow: false },
  };
}

export default async function TeaserPage({ params }: Props) {
  const teaser = await getPublishedTeaser((await params).slug);
  if (!teaser) notFound();

  const images = [teaser.image_1_path, teaser.image_2_path, teaser.image_3_path]
    .flatMap((path, slot) => path ? [{ url: teaserMediaUrl(path), slot }] : []);

  return <TeaserExperience
    eyebrow={teaser.eyebrow}
    title={teaser.title}
    body={teaser.body}
    graffiti={teaser.graffiti_lines ?? []}
    images={images}
    enterHref={teaserEnterHref(teaser)}
  />;
}
