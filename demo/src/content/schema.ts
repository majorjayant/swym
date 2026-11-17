/**
 * Content schema: the single source of truth for every editable field.
 * Mirrors docs/content-model.md. Shaped like a headless-CMS schema so the
 * same types can back a real CMS and API in Phase 1 without component changes.
 *
 * Rule: no component may contain a visible string. Everything visible is a
 * LocalizedString (or Placeholder) defined here and filled in src/content/**.
 */

// ---------- Base types ----------

export type Locale = 'en' | 'pa' | 'hi' | 'fr';

/** Every visible text field. Only `en` is required in Phase 0. */
export type LocalizedString = { en: string; pa?: string; hi?: string; fr?: string };

export type Image = {
  src: string;
  alt: LocalizedString; // <= 125 chars; may be "" only when decorative
  width?: number;
  height?: number;
  focalPoint?: { x: number; y: number }; // 0–1
  decorative?: boolean;
};

export type LinkKind = 'internal' | 'external' | 'tel' | 'sms' | 'mailto' | 'map' | 'whatsapp';

export type Link = {
  label: LocalizedString; // <= 40
  href: string;
  kind: LinkKind;
  newTab?: boolean;
  ariaLabel?: LocalizedString;
};

export type CTAVariant = 'primary' | 'secondary' | 'text';
export type IconName =
  | 'phone' | 'message' | 'map-pin' | 'clock' | 'search' | 'check' | 'shield'
  | 'car' | 'key' | 'handshake' | 'file' | 'star' | 'arrow-right' | 'mail' | 'whatsapp';

export type CTA = Link & { variant: CTAVariant; icon?: IconName };

export type RichTextBlock =
  | { type: 'paragraph'; text: LocalizedString }
  | { type: 'heading'; level: 2 | 3 | 4; text: LocalizedString; anchor?: string }
  | { type: 'list'; ordered?: boolean; items: LocalizedString[] }
  | { type: 'link'; link: Link }
  /** Visible marker for legal templates; rendered while legalBody.lawyerMarkers is true. */
  | { type: 'marker'; kind: 'lawyer' | 'owner'; text: LocalizedString };

export type RichText = RichTextBlock[];

/** Wraps any fact the owner must supply. Rendered with a visible badge while isPlaceholder. */
export type Placeholder = {
  value: string;
  isPlaceholder: boolean;
  note?: string; // what the owner must supply
};

export type PublishState = 'draft' | 'published';

export type DocumentMeta = {
  id: string;
  updatedAt: string; // ISO
  updatedBy: string;
  state: PublishState;
  version: number;
};

// ---------- Global documents ----------

export type Phone = {
  label: LocalizedString;
  number: string; // E.164, e.g. +16394804400
  display: string; // e.g. 639-480-4400
  primary: boolean;
  sms: boolean;
};

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type DayHours = {
  day: DayKey;
  open: string | null; // 'HH:MM'
  close: string | null;
  closed: boolean;
  note?: LocalizedString;
  isPlaceholder?: boolean;
};

export type Hours = {
  days: DayHours[]; // exactly 7
  holidayNote?: LocalizedString;
  timezone: string; // America/Regina
};

export type SocialPlatform = 'facebook' | 'instagram' | 'google' | 'youtube' | 'tiktok' | 'x';

export type SocialLink = { platform: SocialPlatform; url: string; label: LocalizedString };

export type SiteSettings = {
  meta: DocumentMeta;
  businessName: LocalizedString;
  legalName: Placeholder;
  tagline: LocalizedString;
  /** mark: sedan mark (decoration only, p. 8/17). markOnDark: same shapes, black swapped for white only (p. 4 rule), for ink backgrounds. */
  logo: { light: Image; dark: Image; icon: Image; mark?: Image; markOnDark?: Image };
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    mapUrl: string;
    display: LocalizedString; // one-line form used in footer/contact
  };
  geo?: { lat: Placeholder; lng: Placeholder };
  phones: Phone[];
  email: Placeholder; // hidden when value is empty
  whatsapp: Placeholder; // E.164; hidden when empty
  hours: Hours;
  dealerLicence: Placeholder;
  /** PIPEDA Principle 1: accountable person and contact route (compliance s. 6 item 1). */
  privacyOfficer?: { name?: Placeholder; email: Placeholder; phone?: Placeholder };
  foundedYear: Placeholder;
  socialLinks: SocialLink[];
  enabledLocales: Locale[];
  mobileBar: { slots: CTA[] }; // exactly 3
  theme: 'brandV1';
};

export type Navigation = {
  meta: DocumentMeta;
  header: { links: Link[]; ctas: CTA[]; skipLinkLabel: LocalizedString };
  footer: {
    columns: { heading: LocalizedString; links: Link[] }[];
    legalLine: LocalizedString; // may contain {year}
    showLicence: boolean;
    licenceLabel: LocalizedString; // e.g. "DL #"
    /** Reopens the cookie banner (compliance s. 6 item 3). */
    cookieSettingsLabel?: LocalizedString;
  };
  mobileMenu: { links: Link[] };
};

export type AnnouncementBar = {
  meta: DocumentMeta;
  enabled: boolean;
  text: LocalizedString; // <= 110
  link?: Link;
  dismissible: boolean;
  theme: 'ink' | 'accent';
  startAt?: string;
  endAt?: string;
  dismissLabel: LocalizedString;
};

export type ConsentCategoryKey = 'necessary' | 'analytics' | 'marketing';

export type CookieBanner = {
  meta: DocumentMeta;
  enabled: boolean;
  title: LocalizedString; // <= 60
  body: LocalizedString; // <= 300
  acceptLabel: LocalizedString;
  rejectLabel: LocalizedString;
  settingsLabel: LocalizedString;
  saveLabel: LocalizedString;
  categories: {
    key: ConsentCategoryKey;
    label: LocalizedString;
    description: LocalizedString;
    required: boolean;
  }[];
  policyLink: Link;
};

export type SEOFields = {
  title: LocalizedString; // <= 60
  description: LocalizedString; // <= 155
  ogTitle?: LocalizedString; // <= 70
  ogDescription?: LocalizedString; // <= 200
  ogImage?: Image;
  canonical?: string;
  noindex: boolean;
};

export type SEODefaults = {
  meta: DocumentMeta;
  siteUrl: string;
  titleTemplate: string; // e.g. "%s | Mr Best Cars"
  defaultTitle: LocalizedString;
  defaultDescription: LocalizedString;
  ogImage: Image;
  twitterCard: 'summary_large_image' | 'summary';
  jsonLd: {
    type: 'AutoDealer';
    aggregateRating: { enabled: boolean; value?: number; count?: number };
    sameAs: string[]; // social URLs, filled from SiteSettings at render
  };
  robots: { index: boolean };
};

// ---------- Sections ----------

export type SectionTheme = 'light' | 'dark';

type SectionBase<T extends string> = {
  id: string;
  type: T;
  enabled: boolean;
  anchor?: string;
  theme: SectionTheme;
};

export type HeroSlide = {
  id: string;
  media: {
    kind: 'image' | 'video';
    image: Image; // poster when video
    video?: { src: string; muted: true; loop: boolean };
  };
  scrim: { kind: 'gradient' | 'solid'; opacity: number; direction: 'left' | 'bottom' | 'centre' };
  eyebrow?: LocalizedString; // <= 30
  headline: LocalizedString; // <= 60
  subhead?: LocalizedString; // <= 140
  primaryCta: CTA;
  secondaryCta?: CTA;
  textLink?: Link;
  align: 'left' | 'centre';
  enabled: boolean;
};

export type HeroSection = SectionBase<'hero'> & {
  slides: HeroSlide[]; // 1–5
  autoplay: boolean;
  intervalMs: number; // 4000–10000
  controls: { previous: LocalizedString; next: LocalizedString; pause: LocalizedString; play: LocalizedString; goTo: LocalizedString };
};

export type PageHeaderSection = SectionBase<'pageHeader'> & {
  eyebrow?: LocalizedString;
  heading: LocalizedString; // <= 70, the page h1
  intro?: LocalizedString; // <= 220
  image?: Image;
};

export type ProofItem = { label: LocalizedString; value: Placeholder; suffix?: LocalizedString; link?: Link };
export type ProofBarSection = SectionBase<'proofBar'> & { items: ProofItem[] }; // 2–5

export type StepsSection = SectionBase<'steps'> & {
  heading: LocalizedString;
  intro?: LocalizedString;
  steps: { title: LocalizedString; body: LocalizedString; icon: IconName }[]; // 3–4
  cta?: CTA;
};

export type SplitCtaSection = SectionBase<'splitCta'> & {
  heading: LocalizedString;
  body: LocalizedString;
  primary: CTA;
  secondary?: CTA;
  image?: Image;
};

export type Review = {
  quote: LocalizedString; // <= 280
  author: LocalizedString; // <= 40
  source: 'google' | 'facebook' | 'other';
  date?: string;
  isPlaceholder: boolean;
};

export type ReviewsSection = SectionBase<'reviews'> & {
  heading: LocalizedString;
  intro?: LocalizedString;
  rating: Placeholder;
  count: Placeholder;
  items: Review[]; // 3–6
  profileLink?: Link;
  sourceLabel: LocalizedString; // e.g. "Google review"
};

export type AreasServedSection = SectionBase<'areasServed'> & {
  heading: LocalizedString;
  intro?: LocalizedString;
  areas: { name: LocalizedString; href?: string }[]; // <= 12
};

export type VisitUsSection = SectionBase<'visitUs'> & {
  heading: LocalizedString;
  body?: LocalizedString;
  showMap: boolean;
  mapEmbedUrl?: string;
  mapConsentNotice: LocalizedString; // shown when marketing consent not given
  mapLoadLabel: LocalizedString;
  showHours: boolean;
  hoursHeading: LocalizedString;
  ctas: CTA[]; // <= 3
};

export type RichTextSection = SectionBase<'richText'> & { heading?: LocalizedString; body: RichText };

export type TeamSection = SectionBase<'team'> & {
  heading: LocalizedString;
  members: { name: LocalizedString; role: LocalizedString; photo?: Image; bio?: LocalizedString }[];
};

export type StandardsSection = SectionBase<'standards'> & {
  heading: LocalizedString;
  intro?: LocalizedString;
  items: { title: LocalizedString; body: Placeholder; icon: IconName }[]; // <= 6
};

export type FormFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';

export type FormField = {
  name: string;
  label: LocalizedString;
  type: FormFieldType;
  required: boolean;
  placeholder?: LocalizedString;
  options?: { value: string; label: LocalizedString }[];
  validation: { pattern?: string; minLength?: number; maxLength?: number; errorMessage: LocalizedString };
  autocomplete?: string;
};

export type ContactFormSection = SectionBase<'contactForm'> & {
  heading: LocalizedString;
  intro?: LocalizedString;
  fields: FormField[];
  consentText: LocalizedString; // <= 400, enquiry consent (required)
  /** CASL: separate, unchecked, optional consent for marketing messages (compliance s. 6 item 2). */
  marketingConsentText?: LocalizedString;
  submitLabel: LocalizedString;
  submittingLabel: LocalizedString;
  successTitle: LocalizedString;
  successBody: LocalizedString;
  disabledNotice: LocalizedString; // demo: nothing is sent
  errorSummaryTitle: LocalizedString;
};

export type ContactCardsSection = SectionBase<'contactCards'> & {
  heading?: LocalizedString;
  callLabel: LocalizedString;
  textLabel: LocalizedString;
  emailLabel: LocalizedString;
  whatsappLabel: LocalizedString;
  directionsLabel: LocalizedString;
};

export type FAQItem = {
  id: string;
  question: LocalizedString; // <= 120
  answer: RichText; // <= 800 chars plain
  order: number;
  needsOwnerInput: boolean;
  showOnHome: boolean;
};

export type FAQGroup = { id: string; title: LocalizedString; items: FAQItem[] };

export type FAQListSection = SectionBase<'faqList'> & {
  heading: LocalizedString;
  intro?: LocalizedString;
  groups: FAQGroup[];
  allowMultipleOpen: boolean;
  jumpLinksLabel: LocalizedString;
};

export type FAQTeaserSection = SectionBase<'faqTeaser'> & {
  heading: LocalizedString;
  intro?: LocalizedString;
  limit: number;
  moreLink: Link;
};

export type LegalBodySection = SectionBase<'legalBody'> & {
  effectiveDate: string;
  lastReviewed: string;
  effectiveLabel: LocalizedString;
  reviewedLabel: LocalizedString;
  disclaimer: LocalizedString; // <= 300, "not legal advice"
  tocHeading: LocalizedString;
  /** Supports merge tokens {legalName}, {businessName}, {privacyEmail}, {address} resolved from SiteSettings at render (compliance s. 6 item 4). */
  body: RichText;
  lawyerMarkers: boolean;
};

export type NotFoundSection = SectionBase<'notFound'> & {
  heading: LocalizedString;
  body: LocalizedString;
  ctas: CTA[]; // <= 3
};

export type Section =
  | HeroSection
  | PageHeaderSection
  | ProofBarSection
  | StepsSection
  | SplitCtaSection
  | ReviewsSection
  | AreasServedSection
  | VisitUsSection
  | RichTextSection
  | TeamSection
  | StandardsSection
  | ContactFormSection
  | ContactCardsSection
  | FAQListSection
  | FAQTeaserSection
  | LegalBodySection
  | NotFoundSection;

export type SectionType = Section['type'];

export type Page = {
  meta: DocumentMeta;
  slug: string; // '' for home
  seo: SEOFields;
  breadcrumbLabel: LocalizedString;
  sections: Section[];
};

// ---------- Microcopy ----------

export type Microcopy = {
  meta: DocumentMeta;
  nav: {
    skipLink: LocalizedString;
    openMenu: LocalizedString;
    closeMenu: LocalizedString;
    menuTitle: LocalizedString;
    call: LocalizedString;
    text: LocalizedString;
    home: LocalizedString;
    currentPage: LocalizedString; // sr-only
    quickActions: LocalizedString; // label of the fixed mobile bar (Call · Text · Contact)
  };
  buttons: {
    learnMore: LocalizedString;
    readMore: LocalizedString;
    backHome: LocalizedString;
    submit: LocalizedString;
    sending: LocalizedString;
    tryAgain: LocalizedString;
    close: LocalizedString;
    dismiss: LocalizedString;
  };
  forms: {
    required: LocalizedString;
    invalidEmail: LocalizedString;
    invalidPhone: LocalizedString;
    tooLong: LocalizedString;
    consentRequired: LocalizedString;
    genericError: LocalizedString;
    optional: LocalizedString;
  };
  states: { loading: LocalizedString; empty: LocalizedString; offline: LocalizedString };
  faq: { expand: LocalizedString; collapse: LocalizedString; noResults: LocalizedString };
  placeholderBadge: { label: LocalizedString; tooltip: LocalizedString };
  reviews: { ratingOutOf: LocalizedString; basedOn: LocalizedString; placeholderRating: LocalizedString };
  hours: { heading: LocalizedString; closed: LocalizedString; today: LocalizedString; placeholder: LocalizedString; dayNames: Record<DayKey, LocalizedString> };
  admin: {
    appName: LocalizedString;
    nothingSaved: LocalizedString;
    dashboard: LocalizedString;
    pages: LocalizedString;
    global: LocalizedString;
    draft: LocalizedString;
    published: LocalizedString;
    dirty: LocalizedString;
    saveDraft: LocalizedString;
    publish: LocalizedString;
    discard: LocalizedString;
    preview: LocalizedString;
    exitPreview: LocalizedString;
    previewBanner: LocalizedString;
    addItem: LocalizedString;
    remove: LocalizedString;
    moveUp: LocalizedString;
    moveDown: LocalizedString;
    enabled: LocalizedString;
    sections: LocalizedString;
    fields: LocalizedString;
    seo: LocalizedString;
    seoPreview: LocalizedString;
    characters: LocalizedString; // "{count}/{max}"
    requiredField: LocalizedString;
    tooLongField: LocalizedString;
    publishBlocked: LocalizedString;
    saved: LocalizedString;
    lastUpdated: LocalizedString;
    openEditor: LocalizedString;
    backToDashboard: LocalizedString;
    viewSite: LocalizedString;
    login: {
      title: LocalizedString;
      email: LocalizedString;
      password: LocalizedString;
      signIn: LocalizedString;
      note: LocalizedString; // auth is Phase 1
    };
    uploadDisabled: LocalizedString;
    imageUrl: LocalizedString;
    altText: LocalizedString;
    reorderHint: LocalizedString;
    logout: LocalizedString;
    unsavedWarning: LocalizedString;
  };
};

// ---------- Theme ----------

export type DesignTokens = {
  name: 'brandV1';
  colour: { ink: string; red: string; white: string; lightGrey: string; slate: string };
  font: { body: string };
  scale: Record<'display' | 'headline' | 'title' | 'body' | 'caption' | 'label', { size: number; weight: number; lineHeight: number; tracking?: number }>;
  spacing: number[];
  radius: { card: number; icon: number; control: number };
  motion: { fast: number; base: number; slow: number; easing: string };
};

// ---------- Whole tree ----------

export type ContentTree = {
  site: SiteSettings;
  navigation: Navigation;
  announcement: AnnouncementBar;
  cookieBanner: CookieBanner;
  seo: SEODefaults;
  microcopy: Microcopy;
  pages: Record<'home' | 'about' | 'contact' | 'faq' | 'privacy' | 'terms' | 'not-found', Page>;
};

export type Store = {
  published: ContentTree;
  draft: ContentTree;
  dirty: boolean;
  previewMode: boolean;
};

// ---------- Helpers ----------

export const FIELD_LIMITS = {
  seoTitle: 60,
  seoDescription: 155,
  ogTitle: 70,
  ogDescription: 200,
  heroHeadline: 60,
  heroSubhead: 140,
  heroEyebrow: 30,
  linkLabel: 40,
  heading: 60,
  pageHeading: 70,
  intro: 220,
  body: 220,
  faqQuestion: 120,
  faqAnswerPlain: 800,
  reviewQuote: 280,
  announcement: 110,
  cookieBody: 300,
  consentText: 400,
  imageAlt: 125,
} as const;
