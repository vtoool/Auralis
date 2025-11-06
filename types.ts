
export interface Course {
  id: number;
  title: string;
  description: string;
  type: 'Video Course' | 'Audio Meditation';
  price: number;
  imageUrl: string;
  duration: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  avatarUrl: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}