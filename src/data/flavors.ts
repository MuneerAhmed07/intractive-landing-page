import { Flavor, FlavorConfig } from '../types';
import chocolateCanImg from '../assets/images/crunch_chocolate_can_1791249577093.jpg';
import berryCanImg from '../assets/images/crunch_berry_can_1791249594963.jpg';
import lineupImg from '../assets/images/crunch_hero_lineup_1791249609996.jpg';

export { lineupImg };

export const FLAVORS: Record<Flavor, FlavorConfig> = {
  chocolate: {
    id: 'chocolate',
    name: 'Chocolate',
    tagline: 'Pure Indulgence',
    title: 'Chocolate. Pure Indulgence.',
    description:
      'Decadent chocolate cream blended with organic milk for an unforgettable, rich, and smooth experience.',
    largeText: 'CHOCOLATE',
    rightCta: 'Explore More',
    bgGradient: 'radial-gradient(ellipse at 50% 45%, #3d1c14 0%, #2B1410 40%, #150805 100%)',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    accentColor: '#E29578',
    image: chocolateCanImg,
    altText: 'Power Crunch Chocolate can with swirling rich cocoa cream splashes and Oreo cookie crisps',
    specs: {
      protein: '24g',
      calories: '180 kcal',
      sugars: '1g',
      caffeine: '95mg Natural',
    },
    notes: ['Belgian Dark Cocoa', 'Organic Whole Milk', 'Oreo Biscuit Crunch', 'Velvet Smooth Finish'],
    pairing: 'Best served ice-cold post-workout or as an afternoon high-protein treat.',
  },
  berry: {
    id: 'berry',
    name: 'Berry',
    tagline: 'Pure Goodness',
    title: 'Berry. Pure Goodness.',
    description:
      'A delightful blend of juicy berries, rich milk cream, and natural sweeteners. Refreshing, delicious, and made to brighten your day.',
    largeText: 'BERRY',
    rightCta: 'Order Berry',
    bgGradient: 'radial-gradient(ellipse at 50% 45%, #630c33 0%, #4A0826 42%, #220312 100%)',
    glowColor: 'rgba(236, 72, 153, 0.28)',
    accentColor: '#FF6492',
    image: berryCanImg,
    altText: 'Power Crunch Berry can surrounded by luscious strawberry and raspberry milk cream splashes',
    specs: {
      protein: '24g',
      calories: '165 kcal',
      sugars: '2g',
      caffeine: '95mg Natural',
    },
    notes: ['Wild Alpine Berries', 'Ruby Raspberry Puree', 'Creamy Vanilla Whip', 'Crisp Tangy Lift'],
    pairing: 'Ideal chilled for mid-day focus, pre-cardio fuel, or crisp clean refreshment.',
  },
};

export const SIZES: Array<{ id: '250ml' | '330ml' | '500ml'; label: string; price: number; serves: string }> = [
  { id: '250ml', label: '250ml', price: 3.49, serves: 'Quick energy boost' },
  { id: '330ml', label: '330ml', price: 4.29, serves: 'Classic daily fuel' },
  { id: '500ml', label: '500ml', price: 5.79, serves: 'Maximum endurance size' },
];
