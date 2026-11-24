export interface EventResponseDto {
  id: number;
  title: string;
  description: string | null;
  eventDate: string;
  imageUrl: string;
  externalUrl: string | null;
}

export interface EventListResponseDto {
  items: EventResponseDto[];
}