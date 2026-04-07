export interface Surrounding {
  id: string;
  name: string;
  greek_name: string;
  icon: string;
}

export interface SurroundingResponse {
  status: number;
  success: boolean;
  message: string;
  data: Surrounding[];
}

export interface CreateSurroundingRequest {
  name: string;
  greek_name: string;
  icon: File;
}

export interface UpdateSurroundingRequest {
  name?: string;
  greek_name?: string;
  icon?: string;
}


// export interface Surrounding {
//   id: string;
//   name: string;
//   icon: string;
// }

// export interface SurroundingResponse {
//   status: number;
//   success: boolean;
//   message: string;
//   data: Surrounding[];
// }

// export interface CreateSurroundingRequest {
//   name: string;
//   icon: File;
// }

// export interface UpdateSurroundingRequest {
//   name?: string;
//   icon?: string;
// }
