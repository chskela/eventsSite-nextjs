import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import { getFilteredEvents } from "../../helpers/api-util";
import Alert from "../../components/alert/Alert";

export default function FilteredEventsPage() {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState([]);

  const filter = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-24fe0-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    (url) =>
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          return Object.keys(data).map((id) => ({
            id,
            ...data[id],
          }));
        })
  );

  useEffect(() => {
    if (data) {
      setLoadedEvents(data);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = filter;
  const numYear = Number(year);
  const numMonth = Number(month);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Alert
        alert="Invalid filter. Please adjust your values!"
        link="/events"
        title="Show All Events"
      />
    );
  }

  const filteredEvents = loadedEvents.filter(({ date }) => {
    const eventDate = new Date(date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Alert alert="No event found!" link="/events" title="Show All Events" />
    );
  }

  const dateNow = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={dateNow} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export const getServerSideProps = async ({ params }) => {
//   const { slug } = params;
//   const [year, month] = slug;
//   const numYear = Number(year);
//   const numMonth = Number(month);

//   if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
//     return {
//       props: { hasErors: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error',
//       // }
//     };
//   }

//   const events = await getFilteredEvents({ year: numYear, month: numMonth });

//   return {
//     props: {
//       events,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };
