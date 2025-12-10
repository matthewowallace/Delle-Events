// import mongoose, { Schema, model, models, Document, Model } from 'mongoose';
//
// /**
//  * Event document shape with strongly typed fields.
//  */
// export interface EventDocument extends Document {
//     title: string;
//     slug: string;
//     description: string;
//     overview: string;
//     image: string;
//     venue: string;
//     location: string;
//     date: string; // Normalized ISO date-only string (YYYY-MM-DD).
//     time: string; // Normalized 24h time string (HH:MM).
//     mode: string;
//     audience: string;
//     agenda: string[];
//     organizer: string;
//     tags: string[];
//     createdAt: Date;
//     updatedAt: Date;
// }
//
// export type EventModel = Model<EventDocument>;
//
// const eventSchema = new mongoose.Schema<EventDocument, EventModel>(
//     {
//         title: { type: String, required: true, trim: true },
//         slug: { type: String, required: true, unique: true, trim: true },
//         description: { type: String, required: true, trim: true },
//         overview: { type: String, required: true, trim: true },
//         image: { type: String, required: true, trim: true },
//         venue: { type: String, required: true, trim: true },
//         location: { type: String, required: true, trim: true },
//         date: { type: String, required: true },
//         time: { type: String, required: true },
//         mode: { type: String, required: true, trim: true },
//         audience: { type: String, required: true, trim: true },
//         agenda: { type: [String], required: true, default: [] },
//         organizer: { type: String, required: true, trim: true },
//         tags: { type: [String], required: true, default: [] },
//     },
//     {
//         // Automatically manage createdAt and updatedAt.
//         timestamps: true,
//     }
// );
//
// // Ensure a unique index is created for slug at the database level.
// eventSchema.index({ slug: 1 }, { unique: true });
//
// /**
//  * Convert a string into a URL-safe slug.
//  */
// function toSlug(value: string): string {
//     return value
//         .toLowerCase()
//         .trim()
//         .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars.
//         .replace(/\s+/g, '-') // Collapse whitespace into dashes.
//         .replace(/-+/g, '-'); // Remove duplicate dashes.
// }
//
// /**
//  * Normalize a date string into YYYY-MM-DD (ISO date-only) format.
//  * Throws if the input cannot be parsed as a valid date.
//  */
// function normalizeDate(value: string): string {
//     const date = new Date(value);
//     if (Number.isNaN(date.getTime())) {
//         throw new Error('Invalid event date. Please provide a valid date string.');
//     }
//     return date.toISOString().slice(0, 10); // YYYY-MM-DD
// }
//
// /**
//  * Normalize time into a 24h HH:MM format.
//  * Accepts values like "9:00", "09:00", "21:30".
//  */
// function normalizeTime(value: string): string {
//     const trimmed = value.trim();
//     const match = trimmed.match(/^(\d{1,2}):(\d{2})$/);
//     if (!match) {
//         throw new Error('Invalid event time. Expected format HH:MM (24h).');
//     }
//
//     const hours = Number(match[1]);
//     const minutes = Number(match[2]);
//
//     if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
//         throw new Error('Invalid event time. Hour must be 0-23 and minutes 0-59.');
//     }
//
//     const normalizedHours = hours.toString().padStart(2, '0');
//     const normalizedMinutes = minutes.toString().padStart(2, '0');
//
//     return `${normalizedHours}:${normalizedMinutes}`;
// }
//
// /**
//  * Validate that all required string and array fields are present and non-empty.
//  * This is in addition to Mongoose's required validators for clearer error messages.
//  */
// function validateRequiredFields(doc: EventDocument): void {
//     const stringFields: Array<keyof EventDocument> = [
//         'title',
//         'description',
//         'overview',
//         'image',
//         'venue',
//         'location',
//         'date',
//         'time',
//         'mode',
//         'audience',
//         'organizer',
//     ];
//
//     for (const field of stringFields) {
//         const value = doc[field];
//         if (typeof value !== 'string' || value.trim().length === 0) {
//             throw new Error(`Field "${String(field)}" is required and cannot be empty.`);
//         }
//     }
//
//     if (!Array.isArray(doc.agenda) || doc.agenda.length === 0) {
//         throw new Error('Field "agenda" is required and must contain at least one item.');
//     }
//
//     if (!Array.isArray(doc.tags) || doc.tags.length === 0) {
//         throw new Error('Field "tags" is required and must contain at least one tag.');
//     }
// }
//
// /**
//  * Pre-save hook to:
//  * - Validate required fields.
//  * - Normalize date and time formats.
//  * - Generate or update the slug when the title changes.
//  */
//  // eventSchema.pre('save', function preSave(next) {
//  //     try {
//  //         // Run manual validation for clearer domain-specific errors.
//  //         validateRequiredFields(this);
//  //        // Normalize date and time into consistent formats.
//  //         this.date = normalizeDate(this.date);
//  //         this.time = normalizeTime(this.time);
//  //
//  //         // Only regenerate slug if the title has changed or slug is missing.
//  //         if (this.isModified('title') || !this.slug) {
//  //             this.slug = toSlug(this.title);
//  //         }
//  //
//  //
//  //     } catch (error) {
//  //
//  //     }
//  // });
//
// // Pre-save hook for slug generation and data normalization
// eventSchema.pre('save', function (next) {
//     const event = this as EventDocument;
//
//     // Generate slug only if title changed or document is new
//     if (event.isModified('title') || event.isNew) {
//         event.slug = toSlug(event.title);
//     }
//
//     // Normalize date to ISO format if it's not already
//     if (event.isModified('date')) {
//         event.date = normalizeDate(event.date);
//     }
//
//     // Normalize time format (HH:MM)
//     if (event.isModified('time')) {
//         event.time = normalizeTime(event.time);
//     }
//
//     // next();
// });
//
// export const Event: EventModel =
//     (mongoose.models.Event as mongoose.Model<EventDocument>) || model<EventDocument, EventModel>('Event', eventSchema);


import mongoose, { Schema, model, models, Document, Model } from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type EventModel = Model<IEvent>;
//
// const eventSchema = new mongoose.Schema<EventDocument, EventModel>(

const EventSchema = new mongoose.Schema<IEvent, EventModel>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        slug: {
            type: String,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters'],
        },
        overview: {
            type: String,
            required: [true, 'Overview is required'],
            trim: true,
            maxlength: [500, 'Overview cannot exceed 500 characters'],
        },
        image: {
            type: String,
            required: [true, 'Image URL is required'],
            trim: true,
        },
        venue: {
            type: String,
            required: [true, 'Venue is required'],
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        date: {
            type: String,
            required: [true, 'Date is required'],
        },
        time: {
            type: String,
            required: [true, 'Time is required'],
        },
        mode: {
            type: String,
            required: [true, 'Mode is required'],
            enum: {
                values: ['online', 'offline', 'hybrid'],
                message: 'Mode must be either online, offline, or hybrid',
            },
        },
        audience: {
            type: String,
            required: [true, 'Audience is required'],
            trim: true,
        },
        agenda: {
            type: [String],
            required: [true, 'Agenda is required'],
            validate: {
                validator: (v: string[]) => v.length > 0,
                message: 'At least one agenda item is required',
            },
        },
        organizer: {
            type: String,
            required: [true, 'Organizer is required'],
            trim: true,
        },
        tags: {
            type: [String],
            required: [true, 'Tags are required'],
            validate: {
                validator: (v: string[]) => v.length > 0,
                message: 'At least one tag is required',
            },
        },
    },
    {
        timestamps: true, // Auto-generate createdAt and updatedAt
    }
);

// Pre-save hook for slug generation and data normalization
EventSchema.pre('save', function (next) {
    const event = this as IEvent;

    // Generate slug only if title changed or document is new
    if (event.isModified('title') || event.isNew) {
        event.slug = generateSlug(event.title);
    }

    // Normalize date to ISO format if it's not already
    if (event.isModified('date')) {
        event.date = normalizeDate(event.date);
    }

    // Normalize time format (HH:MM)
    if (event.isModified('time')) {
        event.time = normalizeTime(event.time);
    }

    // next();
});

// Helper function to generate URL-friendly slug
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to normalize date to ISO format
function normalizeDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }
    return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

// Helper function to normalize time format
function normalizeTime(timeString: string): string {
    // Handle various time formats and convert to HH:MM (24-hour format)
    const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
    const match = timeString.trim().match(timeRegex);

    if (!match) {
        throw new Error('Invalid time format. Use HH:MM or HH:MM AM/PM');
    }

    let hours = parseInt(match[1]);
    const minutes = match[2];
    const period = match[4]?.toUpperCase();

    if (period) {
        // Convert 12-hour to 24-hour format
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
    }

    if (hours < 0 || hours > 23 || parseInt(minutes) < 0 || parseInt(minutes) > 59) {
        throw new Error('Invalid time values');
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

// Create unique index on slug for better performance
EventSchema.index({ slug: 1 }, { unique: true });

// Create compound index for common queries
EventSchema.index({ date: 1, mode: 1 });

export const Event: EventModel = mongoose.models.Event as mongoose.Model<IEvent> || model<IEvent, EventModel>('Event', EventSchema);


// export const Event: EventModel =
//     (mongoose.models.Event as mongoose.Model<EventDocument>) || model<EventDocument, EventModel>('Event', eventSchema);