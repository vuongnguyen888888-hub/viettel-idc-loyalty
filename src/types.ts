export interface GiftItem {
  id: string;
  name: string;
  points: number;
  category: string;
  giftType: string;
  location: string;
  imageUrl: string;
  brand: string;
  originalPriceText?: string;
  descriptionDetail?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  mainBalance: number;
  promoBalance: number;
  points: number;
}

export interface FilterState {
  giftType: string;
  category: string;
  searchQuery: string;
  location: string;
  priceRange: string;
}
