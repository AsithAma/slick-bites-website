
// This service handles reservation data storage and retrieval
import emailjs from 'emailjs-com';

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
  
  // Send a confirmation email that the reservation was received
  if (newReservation.email) {
    sendEmailNotification(
      newReservation.email,
      'Reservation Received',
      `Dear ${newReservation.name},\n\nThank you for your reservation request at The Eating Establishment for ${newReservation.date} at ${formatTime(newReservation.time)} for ${newReservation.guests} guests.\n\nYour reservation is currently pending confirmation. We will contact you shortly to confirm your reservation.\n\nBest regards,\nThe Eating Establishment Team`,
      newReservation
    );
  }
  
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
  
  const previousStatus = reservations[index].status;
  reservations[index].status = status;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reservations));
  
  // Send email notification if status has changed and email exists
  const reservation = reservations[index];
  if (reservation.email && previousStatus !== status) {
    let subject = '';
    let message = '';
    
    if (status === 'confirmed') {
      subject = 'Reservation Confirmed';
      message = `Dear ${reservation.name},\n\nWe are pleased to confirm your reservation at The Eating Establishment for ${reservation.date} at ${formatTime(reservation.time)} for ${reservation.guests} guests.\n\nWe look forward to welcoming you!\n\nBest regards,\nThe Eating Establishment Team`;
    } else if (status === 'cancelled') {
      subject = 'Reservation Cancelled';
      message = `Dear ${reservation.name},\n\nWe regret to inform you that your reservation at The Eating Establishment for ${reservation.date} at ${formatTime(reservation.time)} could not be accommodated.\n\nPlease contact us at 435.649.8284 if you would like to discuss alternative dates or times.\n\nBest regards,\nThe Eating Establishment Team`;
    }
    
    if (subject && message) {
      sendEmailNotification(reservation.email, subject, message, reservation);
    }
  }
  
  return reservations[index];
};

export const deleteReservation = (id: string): boolean => {
  const reservations = getReservations();
  const reservation = reservations.find(res => res.id === id);
  const filteredReservations = reservations.filter(res => res.id !== id);
  
  if (filteredReservations.length === reservations.length) return false;
  
  // Send email notification if a reservation is deleted and has an email
  if (reservation && reservation.email) {
    sendEmailNotification(
      reservation.email,
      'Reservation Cancelled',
      `Dear ${reservation.name},\n\nYour reservation at The Eating Establishment for ${reservation.date} at ${formatTime(reservation.time)} has been cancelled.\n\nIf you did not request this cancellation, please contact us at 435.649.8284.\n\nBest regards,\nThe Eating Establishment Team`,
      reservation
    );
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredReservations));
  return true;
};

// Helper function to generate a simple ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Helper function to format time from 24h to 12h format
const formatTime = (timeString: string): string => {
  try {
    const [hours, minutes] = timeString.split(':');
    return `${parseInt(hours) > 12 ? parseInt(hours) - 12 : hours}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
  } catch (e) {
    return timeString;
  }
};

// Function to send an actual email using EmailJS
export const sendEmailNotification = (to: string, subject: string, message: string, reservation?: Reservation): void => {
  // Get EmailJS configuration from localStorage
  const serviceId = localStorage.getItem("emailjs_service_id");
  const templateId = localStorage.getItem("emailjs_template_id");
  const userId = localStorage.getItem("emailjs_user_id");
  
  // If EmailJS is configured, send an actual email
  if (serviceId && templateId && userId && reservation) {
    // Initialize EmailJS with the user ID
    if (!emailjs._initialized) {
      emailjs.init(userId);
    }
    
    // Prepare the template parameters
    const templateParams = {
      to_email: to,
      to_name: reservation.name,
      subject: subject,
      message: message,
      reservation_date: reservation.date,
      reservation_time: formatTime(reservation.time),
      guests: reservation.guests,
      status: reservation.status,
      phone: reservation.phone,
      special_requests: reservation.specialRequests || "None"
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams)
      .then((response) => {
        console.log('EMAIL SENT SUCCESSFULLY!', response.status, response.text);
      }, (error) => {
        console.error('EMAIL SENDING FAILED...', error);
      });
  } else {
    // If EmailJS is not configured, log to console
    console.log(`Would send email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
  }
  
  // Always store the email in localStorage for demo purposes
  const emailsKey = 'sent-emails';
  const sentEmails = JSON.parse(localStorage.getItem(emailsKey) || '[]');
  sentEmails.push({
    to,
    subject,
    message,
    sentAt: new Date().toISOString()
  });
  localStorage.setItem(emailsKey, JSON.stringify(sentEmails));
};
