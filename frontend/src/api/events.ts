export interface EventItem {
  id: number;
  title: string;
  description: string | null;
  eventDate: string;
  imageUrl: string;
  externalUrl: string | null;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function getEvents(): Promise<EventItem[]> {
  const response = await fetch(`${API_URL}/events`);
  if (!response.ok) {
    throw new Error(`Failed to load events (${response.status})`);
  }
  const data = (await response.json()) as { items: EventItem[] };

  return data.items;
}