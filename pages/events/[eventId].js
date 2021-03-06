import { Fragment } from "react";
import Head from "next/head";

import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import Comments from "../../components/input/Comments";

export default function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  const { id, title, date, location, image, description } = event;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>{description}</EventContent>
      <Comments eventId={id} />
    </Fragment>
  );
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const { eventId } = params;
  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map(({ id }) => ({ params: { eventId: id } }));

  return {
    paths,
    fallback: true,
  };
};
