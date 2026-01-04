import { Product, TeamMember, Testimonial } from './types';

export interface Service {
  id: string;
  name: string;
  image: string;
  link: string;
}

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Primary Care',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=800&fit=crop',
    link: '/consult',
  },
  {
    id: '2',
    name: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=800&fit=crop',
    link: '/consult',
  },
  {
    id: '3',
    name: 'Dermatology',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=800&fit=crop',
    link: '/consult',
  },
  {
    id: '4',
    name: 'Neurology',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=800&fit=crop',
    link: '/consult',
  },
  {
    id: '5',
    name: 'Orthopedics',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=800&fit=crop',
    link: '/consult',
  },
  {
    id: '6',
    name: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&h=800&fit=crop',
    link: '/consult',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'MediSense Pro',
    category: 'Diagnostics',
    description: 'Advanced continuous glucose monitoring system with real-time AI analytics.',
    price: '$299',
    image: 'https://picsum.photos/800/600?random=101',
    features: ['Real-time tracking', '14-day battery', 'Waterproof'],
  },
  {
    id: '2',
    name: 'VitalFlow Patch',
    category: 'Wearables',
    description: 'Smart cardiovascular health patch that monitors heart rate variability and oxygen levels.',
    price: '$149',
    image: 'https://picsum.photos/800/600?random=102',
    features: ['ECG Accuracy', 'Skin-friendly adhesive', 'Mobile App Sync'],
  },
  {
    id: '3',
    name: 'NanoHeal Gel',
    category: 'Therapeutics',
    description: 'Rapid-acting topical gel for accelerated wound healing using nanotechnology.',
    price: '$45',
    image: 'https://picsum.photos/800/600?random=103',
    features: ['Antibacterial', 'Fast absorption', 'Pain relief'],
  },
  {
    id: '4',
    name: 'NeuroFocus',
    category: 'Supplements',
    description: 'Cognitive enhancement complex designed to improve focus and memory retention.',
    price: '$89',
    image: 'https://picsum.photos/800/600?random=104',
    features: ['Clinically tested', 'Natural ingredients', 'Caffeine-free'],
  },
  {
    id: '5',
    name: 'OrthoFlex Brace',
    category: 'Orthopedics',
    description: 'Lightweight, adaptive knee brace providing support without restricting movement.',
    price: '$120',
    image: 'https://picsum.photos/800/600?random=105',
    features: ['Breathable mesh', 'Adjustable tension', 'Machine washable'],
  },
  {
    id: '6',
    name: 'SleepZen Monitor',
    category: 'Wellness',
    description: 'Non-contact sleep tracking device that analyzes sleep cycles and environment.',
    price: '$199',
    image: 'https://picsum.photos/800/600?random=106',
    features: ['Detailed reports', 'Smart alarm', 'Ambient noise analysis'],
  },
];

export const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Chief Executive Officer',
    bio: 'Former surgeon with 15 years of experience in medical technology innovation.',
    image: 'https://picsum.photos/400/400?random=201',
  },
  {
    id: '2',
    name: 'James Wilson',
    role: 'Head of Product',
    bio: 'Product strategist who has led development for top pharmaceutical companies.',
    image: 'https://picsum.photos/400/400?random=202',
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    role: 'Chief Medical Officer',
    bio: 'Renowned cardiologist focused on preventative care solutions.',
    image: 'https://picsum.photos/400/400?random=203',
  },
  {
    id: '4',
    name: 'Marcus Johnson',
    role: 'VP of Engineering',
    bio: 'Tech veteran specializing in biomedical engineering and AI integration.',
    image: 'https://picsum.photos/400/400?random=204',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Alexandra Davis',
    role: 'Clinic Director',
    company: 'Wellness First',
    content: 'Medicomix products have revolutionized how we track patient recovery. The accuracy is unmatched.',
  },
  {
    id: '2',
    name: 'Michael Brown',
    role: 'Senior Patient',
    company: 'N/A',
    content: 'The VitalFlow Patch gave me peace of mind. It is comfortable and incredibly easy to use.',
  },
  {
    id: '3',
    name: 'Dr. Emily Foster',
    role: 'Head of Neurology',
    company: 'City General Hospital',
    content: 'The NeuroFocus supplement has shown remarkable results in our clinical trials for cognitive retention.',
  },
];
