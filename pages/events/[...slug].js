import { useRouter } from "next/router";
import { Fragment } from "react";

import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import { getFilteredEvents } from "../../dummy-data";
import Alert from "../../components/alert/Alert";

export default function FilteredEventsPage() {
  const router = useRouter();

  const filter = router.query.slug;

  if (!filter) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = filter;
  const numYear = Number(year);
  const numMonth = Number(month);

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return (
      <Alert
        alert="Invalid filter. Please adjust your values!"
        link="/events"
        title="Show All Events"
      />
    );
  }

  const events = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!events || events.length === 0) {
    return (
      <Alert alert="No event found!" link="/events" title="Show All Events" />
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
}
