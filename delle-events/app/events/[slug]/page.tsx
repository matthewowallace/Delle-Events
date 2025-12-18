import Image from "next/image";
import BookEvent from "@/components/BookEvent";

const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({icon,label,alt}: {icon:string, label: string, alt: string}) => {
    return (
        <div className={"flex-row-gap-2 items-center"}>
            <Image src={icon} alt={label} width={24} height={24}/>
            <p>{label}</p>
        </div>
    )
}

const EventAgenda = ({agendaItems}: {agendaItems: string[]}) => (
    <div className={"agenda"}>
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) =>
                <li key={item}>{item}</li>
            )}
        </ul>
    </div>
)

const EventTags = ({tags}: {tags: string[]}) => (
    <div className={"flex flex-row gap-1.5 flex-wrap"}>
        {tags.map((tag) =>(
            <div key={tag} className={"pill"}>{tag}</div>
        ))}
    </div>
)

const EventDetailsPage = async({params} : {params: Promise< {slug: string }>}) => {

    const {slug} = await params;
    const request = await fetch(`${Base_URL}/api/events/${slug}`);
    const data = await request.json();
    const {description, image, overview, date, time, location, mode, agenda, audience,tags} = data.event;

    if(!description) throw new Error("Event not found");

    const bookings = 10;

    return (
        <section id={"event"}>
            <div className={"header"}>
              <h1>Events Description</h1>
                <p>{description}</p>
            </div>
            <div className={"details"}>
                <div className="content">
                   <Image src={image} alt={"Event Banner"} width={800} height={800} className={"banner"}/>
                    <section className={"flex-col-gap-2"}>
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>
                    <section className={"flex-col-gap-2"}>
                        <h2>Events Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="calender" label={date}/>
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time}/>
                        <EventDetailItem icon="/icons/pin.svg" alt="location" label={location}/>
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode}/>
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience}/>
                    </section>
                    
                    <EventAgenda agendaItems={JSON.parse(agenda[0])} />
                    <section className={"flex-col-gap-2"}>
                        <h2> About The Organizer</h2>
                        <p>organizer</p>
                    </section>
                    
                    <EventTags tags={JSON.parse(tags[0])} />
                </div>
                <aside className={"booking"}>
                    <div className={"signupcard"}>
                        <h2>Book Your Spot </h2>
                        {bookings > 0 ? (
                            <p className={"text-sm"}>
                                Join {bookings} spots left.
                            </p>
                        ):
                            (
                                <p className={"text-sm"}>
                                    Booking Closed
                                </p>
                            )
                        }
                        <BookEvent/>
                    </div>
                </aside>
            </div>
        </section>
    )
}
export default EventDetailsPage
