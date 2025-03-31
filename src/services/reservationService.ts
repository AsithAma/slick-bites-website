
// This service handles reservation data storage and retrieval

type Reservation = {
  id: string;
  name: string;
  email?: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

// In a real app, this would be stored in a database
const LOCAL_STORAGE_KEY = 'restaurant-reservations';

export const saveReservation = (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation => {
  const reservations = getReservations();
  
  const newReservation: Reservation = {
    ...reservation,
    id: generateId(),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  
  reservations.push(newReservation);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reservations));
  
  return newReservation;
};

export const getReservations = (): Reservation[] => {
  const reservationsString = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!reservationsString) return [];
  return JSON.parse(reservationsString);
};

export const getReservationById = (id: string): Reservation | undefined => {
  const reservations = getReservations();
  return reservations.find(res => res.id === id);
};

export const updateReservationStatus = (id: string, status: Reservation['status']): Reservation | undefined => {
  const reservations = getReservations();
  const index = reservations.findIndex(res => res.id === id);
  
  if (index === -1) return undefined;
  
  reservations[index].status = status;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reservations));
  
  return reservations[index];
};

export const deleteReservation = (id: string): boolean => {
  const reservations = getReservations();
  const filteredReservations = reservations.filter(res => res.id !== id);
  
  if (filteredReservations.length === reservations.length) return false;
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredReservations));
  return true;
};

// Helper function to generate a simple ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
