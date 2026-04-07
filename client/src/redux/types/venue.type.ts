export type VenueStatus = "active" | "hold" | "suspend";

export interface Venue {
  id: string;
  venueName: string;
  status: VenueStatus;
  address: string;
  totalEarning: number;
  commission: number;
  photo: string;
  coverImage?: string;
}

/* Message */
export interface Message {
  id: string;
  name: string;
  email: string;
  opinion: string;
  createdAt: string;
  read?: boolean;
}

export type LoginResponse = {
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    photo: string | null;
    role: string;
  };
  accessToken: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  photo: string | null;
  role: string;
};

export type TAuth = {
  user: User | null;
  token: string | null;
};

// export type Plan = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   features: string[];
//   planType: "YEARLY" | "TWO_YEARLY"; // Added TWO_YEARLY
//   status: "ACTIVE" | "INACTIVE";
//   plan_duration: string; // Added
//   priceId: string; // Added
//   is_populer?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// };

// // Omit id, createdAt, updatedAt for form
// export type PlanFormData = Omit<Plan, "id" | "createdAt" | "updatedAt">;

// Plan translation for multi-language support

export type PlanTranslation = {
  language: string; // "en", "el", etc.
  name: string;
  description: string;
  features: string[];
  planDuration: string;
  planType: "YEARLY" | "TWO_YEARLY" | "Premium" | "Basic";
};

export type Plan = {
  id: string;
  price: number;
  priceId: string;
  status: "ACTIVE" | "INACTIVE";
  translations: PlanTranslation[];
  // is_populer?: boolean;
  is_populer?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type PlanFormData = Omit<Plan, "id" | "createdAt" | "updatedAt">;

/* Quote Type */

export interface Quote {
  id: string;
  quote: string;
  author: string;
  createdAt?: string;
}

/* Faq Category */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category?: FAQCategory;
}

export interface FAQCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  faqs?: FAQ[];
}

export interface FAQFormData {
  question: string;
  answer: string;
  categoryId: string;
  categoryName?: string;
}

export interface FaqState {
  currentFaq: FAQ | null;
  isDialogOpen: {
    faq: boolean;
    category: boolean;
  };
}

/* Terms anagement type */
export interface TermCategory {
  id: string;
  title: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  keyPoints?: KeyPoint[]; // Optional as it might be loaded separately
}

export interface KeyPoint {
  id: string;
  point: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTermCategoryPayload {
  title: string;
  lastUpdated?: string; // Optional as we can default it on the backend
}

export interface CreateKeyPointPayload {
  point: string;
  categoryId: string;
}

/* Course  */

// src/redux/types/venue.type.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isPaid: boolean;
  category: string[];
  createdAt: string;
  updatedAt: string;
  modules?: IModule[];
}

export interface CourseFormData {
  title: string;
  description: string;
  category: string; // Comma-separated string for input
  isPaid: boolean;
}

export interface CourseState {
  searchTerm: string;
  filterPaid: "all" | "paid" | "free";
}
/* Module Type */

export interface IModule {
  id: string;
  title: string;
  description: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  contents?: IModuleContent[];
}

export interface IModuleContent {
  id: string;
  title: string;
  url: string;
  duration: number;
  description: string;
  viewCount: number;
  tags: string[];
  moduleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IModuleState {
  modules: IModule[];
  isLoading: boolean;
  error: string | null;
  currentModule: IModule | null;
  searchTerm: string;
  sortConfig: {
    field: keyof IModule;
    direction: "asc" | "desc";
  };
}

/* Content */

export interface Content {
  id: string;
  title: string;
  url: string; // or fileUrl if you prefer

  duration: number;
  description: string;
  tags: string[];
  moduleId: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  courseId: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

/* Notifications */
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

/* Payment */

// src/types/payment.ts
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "SUCCESS" | "FAILED" | "PENDING" | "REFUNDED";
  transactionId: string;
  subscriptionId: string;
  createdAt: string;
  subscription: {
    id: string;
    userId: string;
    planId: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      phoneNumber: string;
    };
    plan: {
      id: string;
      name: string;
      description: string;
      price: number;
      features: string[];
      planType: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export type PaymentStatus = "SUCCESS" | "FAILED" | "PENDING" | "REFUNDED";

/* Admin/ user profile */
export interface IProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  photo: string | null;
  role: string;
  isSubscribed: boolean;
  subscriptions: ISubscription[];
  // progresses: any[];
  // FavoriteContents: any[];
  // notifications: any[];
  // SavedQuotes: any[];
  createdAt: string;
  updatedAt: string;
}

export interface ISubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export type ProfileUpdatePayload = {
  fullName?: string;
  phoneNumber?: string;
  file?: File;
};

export type ProfileFormData = {
  fullName: string;
  phoneNumber: string;
  photo?: string | null;
  address?: string;
};
