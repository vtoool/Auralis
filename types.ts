
export interface Course {
  id: number;
  title: string;
  description: string;
  type: 'Video Course' | 'Audio Meditation';
  price: number;
  imageUrl: string;
  duration: string;
  paddle_product_id?: string;
  file_url?: string;
}

export interface Appointment {
    id: number;
    created_at: string;
    name: string;
    email: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    service?: string;
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

export interface Unavailability {
    id: number;
    unavailable_date: string; // YYYY-MM-DD
    start_time: string | null; // HH:MM:SS
    end_time: string | null; // HH:MM:SS
    reason: string | null;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}