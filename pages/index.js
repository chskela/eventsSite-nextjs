import Head from "next/head";

import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/NewsletterRegistration";

export default function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
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
