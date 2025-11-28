import { Schema, model, models, Document, Model } from 'mongoose';

/**
 * Event document shape with strongly typed fields.
 */
export interface EventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // Normalized ISO date-only string (YYYY-MM-DD).
  time: string; // Normalized 24h time string (HH:MM).
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type EventModel = Model<EventDocument>;

const eventSchema = new Schema<EventDocument, EventModel>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: { type: [String], required: true, default: [] },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true, default: [] },
  },
  {
    // Automatically manage createdAt and updatedAt.
    timestamps: true,
  }
);

// Ensure a unique index is created for slug at the database level.
eventSchema.index({ slug: 1 }, { unique: true });

/**
 * Convert a string into a URL-safe slug.
 */
function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars.
    .replace(/\s+/g, '-') // Collapse whitespace into dashes.
    .replace(/-+/g, '-'); // Remove duplicate dashes.
}

/**
 * Normalize a date string into YYYY-MM-DD (ISO date-only) format.
 * Throws if the input cannot be parsed as a valid date.
 */
function normalizeDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid event date. Please provide a valid date string.');
  }
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

/**
 * Normalize time into a 24h HH:MM format.
 * Accepts values like "9:00", "09:00", "21:30".
 */
function normalizeTime(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    throw new Error('Invalid event time. Expected format HH:MM (24h).');
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Invalid event time. Hour must be 0-23 and minutes 0-59.');
  }

  const normalizedHours = hours.toString().padStart(2, '0');
  const normalizedMinutes = minutes.toString().padStart(2, '0');

  return `${normalizedHours}:${normalizedMinutes}`;
}

/**
 * Validate that all required string and array fields are present and non-empty.
 * This is in addition to Mongoose's required validators for clearer error messages.
 */
function validateRequiredFields(doc: EventDocument): void {
  const stringFields: Array<keyof EventDocument> = [
    'title',
    'description',
    'overview',
    'image',
    'venue',
    'location',
    'date',
    'time',
    'mode',
    'audience',
    'organizer',
  ];

  for (const field of stringFields) {
    const value = doc[field];
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error(`Field "${String(field)}" is required and cannot be empty.`);
    }
  }

  if (!Array.isArray(doc.agenda) || doc.agenda.length === 0) {
    throw new Error('Field "agenda" is required and must contain at least one item.');
  }

  if (!Array.isArray(doc.tags) || doc.tags.length === 0) {
    throw new Error('Field "tags" is required and must contain at least one tag.');
  }
}

/**
 * Pre-save hook to:
 * - Validate required fields.
 * - Normalize date and time formats.
 * - Generate or update the slug when the title changes.
 */
eventSchema.pre('save', function preSave(next) {
  try {
    // Run manual validation for clearer domain-specific errors.
    validateRequiredFields(this);

    // Normalize date and time into consistent formats.
    this.date = normalizeDate(this.date);
    this.time = normalizeTime(this.time);

    // Only regenerate slug if the title has changed or slug is missing.
    if (this.isModified('title') || !this.slug) {
      this.slug = toSlug(this.title);
    }

    next();
  } catch (error) {
    next(error as Error);
  }
});

export const Event: EventModel =
  (models.Event as EventModel) || model<EventDocument, EventModel>('Event', eventSchema);
