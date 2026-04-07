export type TAuth = {
  user: null | object;
  token: null | string;
};



export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  photo: string | null;
  age: number | null;
  dateOfBirth: string | null;
  identification: string | null;
  languagePreference: string | null;
  city: string[];
  isSubscribed: boolean;
  achievementBadges: string[];
  paymentCardNumber: string[];
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  country: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  isAvailable: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id?: string;
  exchangeRequestId: string;
  senderId: string;
  message: string;
  createdAt?: string;
}

export interface ExchangeRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromPropertyId: string;
  toPropertyId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  message: string;
  createdAt: string;
  updatedAt: string;
  fromUser: User;
  toUser: User;
  fromProperty: Property;
  toProperty: Property;
  chatMessages: ChatMessage[];
}

export interface CreateExchangeRequest {
  toUserId: string;
  toPropertyId: string;
  fromPropertyId: string;
  message: string;
}

export interface UpdateExchangeRequest {
  status: 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
}