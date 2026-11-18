'use client';

import type { Page, Section } from '@/content/schema';
import { AreasServed, NotFound, PageHeader, ProofBar, Reviews, SplitCta, Standards, Steps, Team } from './blocks';
import { ContactCards, ContactForm } from './contact';
import { FAQList, FAQTeaser } from './faq';
import { Hero } from './hero';
import { FeaturedVehicles, InventoryList, PhotoCredits } from './inventory';
import { LegalBody, RichTextBlock } from './rich-text';
import { VisitUs } from './visit-us';

/** Renders one CMS section by type. Adding a section type = add it to the schema and to this switch. */
export function SectionRenderer({ section }: { section: Section }) {
  if (!section.enabled) return null;
  switch (section.type) {
    case 'hero':
      return <Hero section={section} />;
    case 'pageHeader':
      return <PageHeader section={section} />;
    case 'proofBar':
      return <ProofBar section={section} />;
    case 'steps':
      return <Steps section={section} />;
    case 'splitCta':
      return <SplitCta section={section} />;
    case 'reviews':
      return <Reviews section={section} />;
    case 'areasServed':
      return <AreasServed section={section} />;
    case 'visitUs':
      return <VisitUs section={section} />;
    case 'richText':
      return <RichTextBlock section={section} />;
    case 'team':
      return <Team section={section} />;
    case 'standards':
      return <Standards section={section} />;
    case 'contactForm':
      return <ContactForm section={section} />;
    case 'contactCards':
      return <ContactCards section={section} />;
    case 'faqList':
      return <FAQList section={section} />;
    case 'faqTeaser':
      return <FAQTeaser section={section} />;
    case 'legalBody':
      return <LegalBody section={section} />;
    case 'notFound':
      return <NotFound section={section} />;
    case 'featuredVehicles':
      return <FeaturedVehicles section={section} />;
    case 'inventoryList':
      return <InventoryList section={section} />;
    case 'photoCredits':
      return <PhotoCredits section={section} />;
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}

export function PageSections({ page }: { page: Page }) {
  return (
    <>
      {page.sections.map((s) => (
        <SectionRenderer key={s.id} section={s} />
      ))}
    </>
  );
}
