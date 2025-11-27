'use client'

import Image from "next/image";
import { IconGitBranch } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {AnimatedCompass, CompassIcon} from "@/components/CompassIcon";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/constants";

export default function Home() {
  return (
      <div>
        <section className="flex justify-center px-4 py-20">
            <div className={"max-w-2xl text-center"}>
            <h1  className="text-center">Connect Through Code</h1>
            <p className={"mt-5 text-sm pb-10"}>Explore a curated ecosystem of developer-focused events. Whether you're hosting or attending, our platform streamlines event discovery, management, and collaboration for the modern tech community.</p>
            <Button variant="outline" size="lg" onClick={() => alert("New Branch")} id={"explore-btn"} >
                <a href="#events">
                    <span>Explore Events</span>
                    <CompassIcon size={24} className="inline-block justify-center" />
                </a>
            </Button>
            </div>
        </section>
          <section>
              <div className="mt-20 space-y-7">
                  <h3>Featured Events</h3>
                  <ul className="events">
                      {events.map((event)=>(
                          <li key={event.title}>
                              <EventCard {...event}/>
                          </li>
                      ))}
                  </ul>
              </div>
          </section>
      </div>
  );
}


