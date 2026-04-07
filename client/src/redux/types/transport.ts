export interface Transport {
  id: string;
  name: string;
  greek_name: string;
  icon: string;
}

export interface TransportResponse {
  status: number;
  success: boolean;
  message: string;
  data: Transport[];
}

export interface CreateTransportRequest {
  name: string;
  greek_name: string;
  icon: File;
}

export interface UpdateTransportRequest {
  name?: string;
  greek_name?: string;
  icon?: string;
}



// export interface Transport {
//   id: string;
//   name: string;
//   icon: string;
// }

// export interface TransportResponse {
//   status: number;
//   success: boolean;
//   message: string;
//   data: Transport[];
// }

// export interface CreateTransportRequest {
//   name: string;
//   icon: File;
// }

// export interface UpdateTransportRequest {
//   name?: string;
//   icon?: string;
// }
