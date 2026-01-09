import Link from "next/link";
import Image from "next/image";
interface props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}
const EventCard = ({title, image, slug, location, date, time}:props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
        <Image 
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
         />
         <div className="flex flex-row gap-2">
            <Image
            src="/icons/pin.svg" alt="location" width={16} height={16}
            />
            <p className="location">{location}</p>
         </div>
         <p className="title">{title}</p>
         <div className="datetime">
            <div>
                <Image
            src="/icons/calendar.svg" alt="date" width={16} height={16}
            />
            <p className="date">{date}</p>
            </div>
             <div>
                <Image
            src="/icons/clock.svg" alt="time" width={16} height={16}
            />
            <p className="time">{time}</p>
            </div>
         </div>
    </Link>
  )
}

export default EventCard