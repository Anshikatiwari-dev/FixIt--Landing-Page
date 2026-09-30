export type BookingStatus =
  | "Booking Confirmed"
  | "Technician Assigned"
  | "En Route"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export interface TechnicianInfo {
  name: string;
  avatarInitial: string;
  verified: boolean;
  experienceYears: number;
  rating: number;
  phone: string;
  role: string;
}

export interface Booking {
  id: string; // e.g. FIX-2026-8812
  bookedAt: string; // e.g. Booked Today, 10:15 AM
  serviceTitle: string;
  categoryId: string;
  status: BookingStatus;
  stepIndex: number; // 1 to 5: 1=Confirmed, 2=Assigned, 3=En Route, 4=In Progress, 5=Completed
  price: number; // e.g. 299
  appointmentWindow: string; // e.g. Today (02:00 PM - 04:00 PM)
  address: string;
  otp: string; // 4-digit code e.g. 4821
  technician: TechnicianInfo;
  userRating?: {
    stars: number;
    comment: string;
  };
}

export const TIMELINE_STEPS = [
  "Booking Confirmed",
  "Technician Assigned",
  "En Route",
  "In Progress",
  "Completed",
] as const;

export const INITIAL_MOCK_BOOKINGS: Booking[] = [
  {
    id: "FIX-2026-8812",
    bookedAt: "Booked Today, 10:15 AM",
    serviceTitle: "Tap & Shower Leakage Repair",
    categoryId: "plumbing",
    status: "In Progress",
    stepIndex: 4,
    price: 299,
    appointmentWindow: "Today (02:00 PM - 04:00 PM)",
    address: "Flat 402, Green Glen Layout, Outer Ring Road, Bellandur, Bengaluru",
    otp: "4821",
    technician: {
      name: "Ramesh Verma",
      avatarInitial: "R",
      verified: true,
      experienceYears: 7,
      rating: 4.9,
      phone: "+91 98451 22910",
      role: "Verified Master Plumber",
    },
  },
  {
    id: "FIX-2026-9045",
    bookedAt: "Booked Today, 08:30 AM",
    serviceTitle: "Refrigerator Not Cooling Diagnostic",
    categoryId: "refrigerator",
    status: "Technician Assigned",
    stepIndex: 2,
    price: 499,
    appointmentWindow: "Today (04:30 PM - 06:30 PM)",
    address: "Tower 3, Apt 1104, Prestige Lakeside Habitat, Varthur, Bengaluru",
    otp: "7392",
    technician: {
      name: "Anita Sharma",
      avatarInitial: "A",
      verified: true,
      experienceYears: 6,
      rating: 4.85,
      phone: "+91 98712 44321",
      role: "Certified Appliance Technician",
    },
  },
  {
    id: "FIX-2026-7210",
    bookedAt: "Booked Yesterday, 03:45 PM",
    serviceTitle: "Steam Iron Thermal Fuse & Element Restoration",
    categoryId: "small-appliances",
    status: "Completed",
    stepIndex: 5,
    price: 249,
    appointmentWindow: "Yesterday (05:00 PM - 07:00 PM)",
    address: "Villa 18, Palm Meadows, Whitefield, Bengaluru",
    otp: "5183",
    technician: {
      name: "Vikram Rao",
      avatarInitial: "V",
      verified: true,
      experienceYears: 9,
      rating: 5.0,
      phone: "+91 97410 88231",
      role: "Certified Appliance Technician",
    },
    userRating: {
      stars: 5,
      comment: "Fixed the thermal cutoff in 20 minutes! Excellent work and tested steam output thoroughly.",
    },
  },
];

const LOCAL_STORAGE_KEY = "fixit_bookings_v2";

export function loadStoredBookings(): Booking[] {
  if (typeof window === "undefined") return INITIAL_MOCK_BOOKINGS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_BOOKINGS));
      return INITIAL_MOCK_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse bookings from localStorage:", e);
    return INITIAL_MOCK_BOOKINGS;
  }
}

export function saveStoredBookings(bookings: Booking[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
  } catch (e) {
    console.error("Failed to save bookings to localStorage:", e);
  }
}

export function createNewBooking(
  serviceTitle: string,
  categoryId: string,
  appointmentWindow: string,
  address: string,
  price: number = 299,
  technicianRole: string = "Certified Technician"
): Booking {
  const randomIdNumber = Math.floor(1000 + Math.random() * 9000);
  const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

  const newBooking: Booking = {
    id: `FIX-2026-${randomIdNumber}`,
    bookedAt: "Booked Just Now",
    serviceTitle,
    categoryId,
    status: "Technician Assigned",
    stepIndex: 2,
    price,
    appointmentWindow,
    address,
    otp: randomOtp,
    technician: {
      name: "Suresh Pillai",
      avatarInitial: "S",
      verified: true,
      experienceYears: 5,
      rating: 4.9,
      phone: "+91 98402 11982",
      role: technicianRole,
    },
  };

  const existing = loadStoredBookings();
  const updated = [newBooking, ...existing];
  saveStoredBookings(updated);
  return newBooking;
}

export function advanceBookingStatus(bookingId: string): Booking[] {
  const bookings = loadStoredBookings();
  const updated = bookings.map((b) => {
    if (b.id !== bookingId) return b;

    if (b.status === "Cancelled" || b.status === "Completed") return b;

    const nextIndex = Math.min(b.stepIndex + 1, 5);
    const nextStatus = TIMELINE_STEPS[nextIndex - 1];

    return {
      ...b,
      stepIndex: nextIndex,
      status: nextStatus,
    };
  });

  saveStoredBookings(updated);
  return updated;
}

export function cancelBooking(bookingId: string): Booking[] {
  const bookings = loadStoredBookings();
  const updated = bookings.map((b) => {
    if (b.id !== bookingId) return b;
    return {
      ...b,
      status: "Cancelled" as BookingStatus,
    };
  });
  saveStoredBookings(updated);
  return updated;
}

export function rateBooking(
  bookingId: string,
  stars: number,
  comment: string
): Booking[] {
  const bookings = loadStoredBookings();
  const updated = bookings.map((b) => {
    if (b.id !== bookingId) return b;
    return {
      ...b,
      userRating: { stars, comment },
    };
  });
  saveStoredBookings(updated);
  return updated;
}
