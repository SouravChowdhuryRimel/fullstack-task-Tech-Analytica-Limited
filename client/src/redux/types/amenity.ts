// src/redux/types/amenity.ts
export interface Amenity {
  id: string;
  name: string;
  greek_name: string;
  icon: string;
}

export interface AmenityResponse {
  status: number;
  success: boolean;
  message: string;
  data: Amenity[];
}

export interface CreateAmenityRequest {
  name: string;
  greek_name: string;
  icon: File;
}

export interface UpdateAmenityRequest {
  name?: string;
  greek_name?: string;
  icon?: string | File;
}



// // types/amenity.ts
// export interface Amenity {
//   id: string;
//   name: string;
//   icon: string;
// }

// export interface AmenityResponse {
//   status: number;
//   success: boolean;
//   message: string;
//   data: Amenity[];
// }

// export interface CreateAmenityRequest {
//   name: string;
//   icon: File;
// }

// export interface UpdateAmenityRequest {
//   name?: string;
//   icon?: string;
// }