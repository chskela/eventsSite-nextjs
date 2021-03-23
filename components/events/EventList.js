import EventItem from "./EventItem";

export default function EventList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <EventItem item={item} key={item.id} />
      ))}
    </ul>
  );
}
