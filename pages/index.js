import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-util";

export default function HomePage({ events }) {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export const getStaticProps = async () => {
  const events = await getFeaturedEvents();

  return {
    props: {
      events,
    },
    revalidate: 1800,
  };
};
