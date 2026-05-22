export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  eta: string;
  averagePrice: number;
  heroEmoji: string;
  accent: string;
  description: string;
  tags: string[];
};

export const restaurants: Restaurant[] = [
  {
    id: '123',
    name: 'Spice Route Kitchen',
    cuisine: 'North Indian',
    rating: 4.8,
    eta: '25-30 min',
    averagePrice: 320,
    heroEmoji: '🍛',
    accent: '#F97316',
    description:
      'Comfort food with rich curries, soft naan, and quick doorstep delivery for late-night cravings.',
    tags: ['Chef Special', 'Fast Delivery', 'Family Packs'],
  },
  {
    id: '224',
    name: 'Sushi Sprint',
    cuisine: 'Japanese',
    rating: 4.6,
    eta: '30-35 min',
    averagePrice: 540,
    heroEmoji: '🍣',
    accent: '#0F766E',
    description:
      'Fresh maki rolls, salmon bowls, and crunchy tempura assembled right before pickup.',
    tags: ['Fresh Fish', 'Signature Rolls', 'Healthy Bowls'],
  },
  {
    id: '305',
    name: 'Burger Borough',
    cuisine: 'American',
    rating: 4.7,
    eta: '20-25 min',
    averagePrice: 280,
    heroEmoji: '🍔',
    accent: '#B45309',
    description:
      'Smash burgers, peri fries, and thick shakes designed for game nights and group orders.',
    tags: ['Best Seller', 'Combos', 'Late Night'],
  },
  {
    id: '412',
    name: 'Green Bowl Co.',
    cuisine: 'Healthy',
    rating: 4.5,
    eta: '18-22 min',
    averagePrice: 260,
    heroEmoji: '🥗',
    accent: '#2F855A',
    description:
      'Protein bowls, cold-pressed juices, and crunchy salads for a lighter everyday meal.',
    tags: ['Low Cal', 'Protein Packed', 'Juices'],
  },
];

export function findRestaurantById(restaurantId: string) {
  return restaurants.find(restaurant => restaurant.id === restaurantId);
}
