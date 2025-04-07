export type Tent = {
  id: string;
  name: string;
  tent_image: string;
  weekend_price?: number;
  weekday_price?: number;
  description: string;
  facilities: string[]; 
  category_id: string; 
  category?: Category; 
  status: "available" | "unavailable";
  updated_at?: string; 
  created_at?: string; 
  capacity: number;
};

export type Category = {
  id: string;
  name: string;
  price: number;
  description: string;
  tents: Tent[];
};

export type Guest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

export type Reservation = {
  data: Category[];
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  price: number;
  tent_id: string;
  guest_id: string;
  check_in?: string;
  check_out?: string;
  status:
  | "pending"
  | "confirmed"
  | "checked-in"
  | "completed"
  | "canceled"
  | "refund"
  | "rescheduled";
};

export type responseArray = {
  message: string;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
};

export type responseObject = {
  message: string;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export type CheckPriceResponse = {
  status: number;
  message: string;
  data: {
    total_price: number;
    tents: Tent[];
    start_date: string; 
    end_date: string;   
  };
};