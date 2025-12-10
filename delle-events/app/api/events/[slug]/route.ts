import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event, type IEvent } from '@/database/event.model';

interface EventBySlugRouteParams {
    slug: string;
}

function isValidSlug(slug: string): boolean {
    const trimmed = slug.trim();
    if (!trimmed) return false;

    return /^[a-z0-9-]+$/.test(trimmed);
}

export async function GET(
    _req: NextRequest,
    context: { params: Promise<EventBySlugRouteParams> },
): Promise<NextResponse> {
    // 🔥 FIX: await the params
    const { slug } = await context.params;

    if (!slug || typeof slug !== 'string' || !isValidSlug(slug)) {
        return NextResponse.json(
            {
                message: 'Invalid or missing slug parameter.',
                details:
                    'The "slug" route parameter must be a non-empty URL-safe string (lowercase letters, numbers, hyphens).',
            },
            { status: 400 },
        );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    try {
        await connectDB();

        const event = await Event.findOne({ slug: sanitizedSlug }).lean<IEvent>().exec();

        if (!event) {
            return NextResponse.json(
                {
                    message: 'Event not found.',
                    details: `No event found with slug "${sanitizedSlug}".`,
                },
                { status: 404 },
            );
        }

        const { __v, ...safeEvent } = event;

        return NextResponse.json(
            {
                message: 'Event fetched successfully.',
                event: safeEvent,
            },
            { status: 200 },
        );
    } catch (error: any) {
        console.error('Error fetching event by slug:', error);

        if (error?.name === 'ValidationError') {
            return NextResponse.json(
                {
                    message: 'Invalid request data when querying event.',
                    details: error.message,
                },
                { status: 400 },
            );
        }

        return NextResponse.json(
            {
                message: 'Failed to fetch event.',
                details: error?.message ?? 'Unknown server error.',
            },
            { status: 500 },
        );
    }
}
