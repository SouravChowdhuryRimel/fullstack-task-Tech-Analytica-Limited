// src/redux/types/badge.type.ts
export type BadgeType = "GOLDEN_HOST" | "REVIEW_BADGE" | "EARLY_ADOPTER";

export interface Badge {
  id: string;
  type: BadgeType;
  displayName: string;
  greek_displayName: string;
  badge_type: string;
  description: string;
  greek_description: string;
  greek_discription: string;
  icon: string; // URL
  iconPublicId: string;
  createdAt: string;
}
