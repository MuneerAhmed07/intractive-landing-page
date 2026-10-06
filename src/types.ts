export type Flavor = 'chocolate' | 'berry';

export type CanSize = '250ml' | '330ml' | '500ml';

export interface FlavorConfig {
  id: Flavor;
  name: string;
  tagline: string;
  title: string;
  description: string;
  largeText: string;
  rightCta: string;
  bgGradient: string;
  glowColor: string;
  accentColor: string;
  image: string;
  altText: string;
  specs: {
    protein: string;
    calories: string;
    sugars: string;
    caffeine: string;
  };
  notes: string[];
  pairing: string;
}
