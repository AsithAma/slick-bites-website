
import React, { useState, useEffect } from "react";
import { 
  getReservations, 
  updateReservationStatus, 
  deleteReservation 
} from "@/services/reservationService";
import { Check, X, Trash2, CalendarRange, Clock, User, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

type Email = {
  to: string;
  subject: string;
  message: string;
  sentAt: string;
};

const AdminPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sentEmails, setSentEmails] = useState<Email[]>([]);
  const [activeTab, setActiveTab] = useState("reservations");
  const { toast } = useToast();
  
  useEffect(() => {
    loadReservations();
    loadSentEmails();
  }, []);
  
  useEffect(() => {
    filterReservations();
  }, [searchTerm, statusFilter, reservations]);
  
  const loadReservations = () => {
    const allReservations = getReservations();
    setReservations(allReservations);
    setFilteredReservations(allReservations);
  };

  const loadSentEmails = () => {
    const emailsData = localStorage.getItem('sent-emails');
    if (emailsData) {
      setSentEmails(JSON.parse(emailsData));
    }
  };
  
  const filterReservations = () => {
    let filtered = reservations;
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(res => res.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(res => 
        res.name.toLowerCase().includes(term) ||
        res.phone.includes(term) ||
        (res.email && res.email.toLowerCase().includes(term))
      );
    }
    
    setFilteredReservations(filtered);
  };
  
  const handleStatusChange = (id: string, status: 'confirmed' | 'cancelled') => {
    const updated = updateReservationStatus(id, status);
    
    if (updated) {
      loadReservations();
      loadSentEmails(); // Reload emails to show the notification email
      toast({
        title: `Reservation ${status}`,
        description: `Reservation for ${updated.name} has been ${status}.`,
      });
    }
  };
  
  const handleDeleteReservation = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the reservation for ${name}?`)) {
      const deleted = deleteReservation(id);
      
      if (deleted) {
        loadReservations();
        loadSentEmails(); // Reload emails to show the notification email
        toast({
          title: "Reservation Deleted",
          description: `Reservation for ${name} has been deleted.`,
        });
      }
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      return `${parseInt(hours) > 12 ? parseInt(hours) - 12 : hours}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
    } catch (e) {
      return timeString;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Reservation Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all incoming table reservations
          </p>
        </div>
        <Link to="/" className="btn-outline">
          Back to Home
        </Link>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="emails">Email Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reservations">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Reservation Dashboard</CardTitle>
              <CardDescription>
                Review and manage all reservation requests for The Eating Establishment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, phone or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Party Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReservations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No reservations found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>
                            <div className="font-medium">{reservation.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center mt-1">
                              <Phone size={14} className="mr-1" />
                              {reservation.phone}
                            </div>
                            {reservation.email && (
                              <div className="text-sm text-muted-foreground mt-1">
                                {reservation.email}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarRange size={16} className="mr-2 text-muted-foreground" />
                              {formatDate(reservation.date)}
                            </div>
                            <div className="flex items-center mt-1">
                              <Clock size={16} className="mr-2 text-muted-foreground" />
                              {formatTime(reservation.time)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <User size={16} className="mr-2 text-muted-foreground" />
                              {reservation.guests} {reservation.guests > 1 ? 'people' : 'person'}
                            </div>
                            {reservation.specialRequests && (
                              <div className="text-xs text-muted-foreground mt-1 italic">
                                "{reservation.specialRequests.substring(0, 30)}
                                {reservation.specialRequests.length > 30 ? '...' : ''}""
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              reservation.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : reservation.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {reservation.status === 'pending' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                                    onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                                  >
                                    <Check size={16} />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                                    onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                                  >
                                    <X size={16} />
                                  </Button>
                                </>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="hover:bg-red-100 hover:text-red-600"
                                onClick={() => handleDeleteReservation(reservation.id, reservation.name)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredReservations.length} of {reservations.length} reservations
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="emails">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Record of all emails sent to guests regarding their reservations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sent To</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Sent At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sentEmails.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          No emails sent yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      sentEmails.map((email, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">{email.to}</div>
                          </TableCell>
                          <TableCell>{email.subject}</TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate">
                              {email.message.substring(0, 100)}
                              {email.message.length > 100 ? '...' : ''}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(email.sentAt).toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Showing {sentEmails.length} sent emails
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
