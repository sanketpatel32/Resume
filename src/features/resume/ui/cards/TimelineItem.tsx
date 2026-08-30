import { FiCalendar, FiMapPin } from "react-icons/fi";

interface TimelineItemProps {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  index: number;
}

export default function TimelineItem({ company, role, dates, location, bullets }: TimelineItemProps) {
  return (
    <article className="career-entry">
      <div className="career-date"><FiCalendar aria-hidden="true" /> {dates}</div>
      <div className="career-detail">
        <div className="career-title-row">
          <div>
            <h3>{company}</h3>
            <p>{role}</p>
          </div>
          {location && <span className="career-location"><FiMapPin aria-hidden="true" /> {location}</span>}
        </div>
        <ul>
          {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      </div>
    </article>
  );
}
