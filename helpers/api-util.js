export async function getAllEvents() {
  return await fetch(
    "https://nextjs-course-24fe0-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  )
    .then((r) => r.json())
    .then((data) => {
      return Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }));
    });
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter(({ isFeatured }) => isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  return allEvents.filter(({ date }) => {
    const eventDate = new Date(date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}
