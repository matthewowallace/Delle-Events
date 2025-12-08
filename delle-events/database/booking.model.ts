import { Schema, model, models, Document, Model, Types } from 'mongoose';
import { Event, EventModel } from './event.model';

/**
 * Booking document shape with strongly typed fields.
 */
export interface BookingDocument extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export type BookingModel = Model<BookingDocument>;

const bookingSchema = new Schema<BookingDocument, BookingModel>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
    },
    {
        // Automatically manage createdAt and updatedAt.
        timestamps: true,
    }
);

// Index eventId for faster lookups of bookings by event.
bookingSchema.index({ eventId: 1 });

/**
 * Simple, conservative email validation pattern.
 */
function isValidEmail(email: string): boolean {
    // Intentionally conservative regex to avoid over-accepting invalid emails.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Pre-save hook to validate:
 * - That the email is well-formed.
 * - That the referenced event exists.
 */
bookingSchema.pre('save', async function preSave(next) {
    try {
        const email = this.email?.trim();
        if (!email || !isValidEmail(email)) {
            throw new Error('A valid email address is required to create a booking.');
        }

        // Only check the event reference if a new document or the eventId has changed.
        if (this.isNew || this.isModified('eventId')) {
            const eventExists = await (Event as EventModel).exists({ _id: this.eventId });
            if (!eventExists) {
                throw new Error('Cannot create booking: referenced event does not exist.');
            }
        }

        next();
    } catch (error) {
        next(error as Error);
    }
});

export const Booking: BookingModel =
    (models.Booking as BookingModel) || model<BookingDocument, BookingModel>('Booking', bookingSchema);