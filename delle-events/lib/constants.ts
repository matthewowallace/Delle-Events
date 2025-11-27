// Centralized constants for the app
// Events: curated list of upcoming or popular developer conferences, hackathons, and meetups.
// Note: image paths reference files in public/images

export type EventItem = {
  title: string;
  image: string; // public path, e.g., "/images/event1.png"
  slug: string;
  location: string; // City, Country or Online
  date: string; // Human-readable date, e.g., "Jan 15–17, 2026"
  time: string; // Time range with timezone if relevant
};

export const events: EventItem[] = [
  {
    image: "/images/event1.png",
    title: "JSConf EU",
    slug: "jsconf-eu-2026",
    location: "Berlin, Germany",
    date: "May 15–17, 2026",
    time: "09:00–18:00 CEST",
  },
  {
    image: "/images/event2.png",
    title: "Next.js Conf",
    slug: "nextjs-conf-2026",
    location: "San Francisco, USA",
    date: "Oct 7, 2026",
    time: "10:00–17:00 PDT",
  },
  {
    image: "/images/event3.png",
    title: "Hack the North",
    slug: "hack-the-north-2026",
    location: "Waterloo, Canada",
    date: "Sep 18–20, 2026",
    time: "All weekend (48h)",
  },
  {
    image: "/images/event4.png",
    title: "KubeCon + CloudNativeCon Europe",
    slug: "kubecon-eu-2026",
    location: "Vienna, Austria",
    date: "Apr 20–23, 2026",
    time: "08:30–18:00 CEST",
  },
  {
    image: "/images/event5.png",
    title: "PyCon US",
    slug: "pycon-us-2026",
    location: "Pittsburgh, USA",
    date: "May 1–9, 2026",
    time: "09:00–18:00 EDT",
  },
  {
    image: "/images/event6.png",
    title: "React Summit",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands + Online",
    date: "Jun 11–12, 2026",
    time: "09:00–17:30 CEST",
  },
];
