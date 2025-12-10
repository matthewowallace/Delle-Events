'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconGitBranch } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { AnimatedCompass, CompassIcon } from "@/components/CompassIcon";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(`${BASE_URL}/api/events`, {
                    cache: "no-store",
                });
                const data = await response.json();
                setEvents(data.events || []);
            } catch (err) {
                console.error("Failed to load events:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []); // runs ONCE → prevents infinite recompiling

    return (
        <div>
            <section className="flex justify-center px-4 py-20">
                <div className="max-w-2xl text-center">
                    <h1 className="text-center">Connect Through Code</h1>
                    <p className="mt-5 text-sm pb-10">
                        Explore a curated ecosystem of developer-focused events. Whether you're
                        hosting or attending, our platform streamlines event discovery, management,
                        and collaboration for the modern tech community.
                    </p>

                    <Button variant="outline" size="lg" id="explore-btn">
                        <a href="#events">
                            <span>Explore Events</span>
                            <CompassIcon size={24} className="inline-block justify-center" />
                        </a>
                    </Button>
                </div>
            </section>

            <section id="events">
                <div className="mt-20 space-y-7">
                    <h3>Featured Events</h3>

                    {loading ? (
                        <p>Loading events...</p>
                    ) : (
                        <ul className="events">
                            {events.length > 0 ? (
                                events.map((event: IEvent) => (
                                    <li key={event.slug || event.title}>
                                        <EventCard {...event} />
                                    </li>
                                ))
                            ) : (
                                <p>No events found.</p>
                            )}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
}
