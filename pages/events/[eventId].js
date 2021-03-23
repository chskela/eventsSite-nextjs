import { useRouter } from "next/router";

export default function EventDetailPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>EventDetailPage</h1>
    </div>
  );
}
