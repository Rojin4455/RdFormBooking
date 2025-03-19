import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BookingForm = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [calendarType, setCalendarType] = useState('');
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const contactDropdownRef = useRef(null);

  // Check if the selected user is Michael Kelcees (ID: 3)
  const isKelceesSelected = selectedUser === '3';

  // Check if form is valid - now requires Michael Kelcees to be selected
  const isFormValid = selectedContact && isKelceesSelected && calendarType && selectedCalendar;

  // Sample users data
  const users = [
    { id: 1, name: 'Steve' },
    { id: 2, name: 'Mike' },
    { id: 3, name: 'Kelcee' },
    { id: 4, name: 'Charles Johnson' },
    { id: 5, name: 'Alec' },
  ];

  // Calendar data - now we specify these are Kelcees' calendars
  const KelceesCalendars = {
    eventCalendar: [
      { name: 'Marketing Breakdown Calendar', id: 'pDjjjnOFa84nDxJRlMrv' },
      { name: 'Business Breakdown Calendar', id: 'zjtwwfxUxrHreNpX72rO' },
      { name: 'Systems Breakdown Calendar', id: 'RB0ws2DWhj0X67JhtEhA' },
      { name: 'Bi-weekly Meeting Calendar', id: 'f25EIhrwbMEkSylYz1RN' },
      { name: 'Team Building Breakdown Calendar', id: '2VlcEpcg8H7GBiWb3XQE' },
    ],
    roundRobin: [
      { name: 'Marketing Breakdown Calendar RR', id: 'OC9reDkKUOra6IlSNiqH' },
      { name: 'Business Breakdown Calendar RR', id: '4yzMBEOTLswbgfLiCz5e' },
      { name: 'Team Building Breakdown Calendar RR', id: 'noSt7Dt0obyk6PhUC7KQ' },
      { name: 'Systems Breakdown Calendar RR', id: 'wz65RzKW9OMdoX2oKOVz' },
      { name: 'Bi-weekly Meeting Calendar RR', id: 'ly2I6eTgKJfIXTUNIdXi' },
    ],
  };

  // Mock API call to fetch contacts
  const fetchContacts = async (query) => {
    setLoading(true);
    try {
      // Simulating API call with a timeout
    //   await new Promise(resolve => setTimeout(resolve, 300));

      const response = await axios.get(`http://44.204.156.38/api/contacts/?search=${query}`)
        console.log(response.data)
        
      // Mock data generation based on search term
    //   const mockContacts = [
    //     { id: 1, name: 'Alex Thompson', email: 'alex@example.com', phone: '555-1234' },
    //     { id: 2, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-2345' },
    //     { id: 3, name: 'Andrew Davis', email: 'andrew@example.com', phone: '555-3456' },
    //     { id: 4, name: 'Anna Wilson', email: 'anna@example.com', phone: '555-4567' },
    //     { id: 5, name: 'Anthony Miller', email: 'anthony@example.com', phone: '555-5678' },
    //     { id: 6, name: 'Amanda Brown', email: 'amanda@example.com', phone: '555-6789' },
    //     { id: 7, name: 'Adrian Clark', email: 'adrian@example.com', phone: '555-7890' },
    //   ].filter(contact => 
    //     contact.name.toLowerCase().includes(query.toLowerCase())
    //   );
      
      setContacts(response.data.results);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Split a full name into first and last name
  const splitName = (fullName) => {
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    return { firstName, lastName };
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      fetchContacts(value);
      setShowContactDropdown(true);
    } else {
      setContacts([]);
      setShowContactDropdown(false);
      setSelectedContact(null);
    }
  };

  // Handle contact selection
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setSearchTerm(contact.first_name);
    setShowContactDropdown(false);
  };

  // Reset calendar selections when user changes
  useEffect(() => {
    setCalendarType('');
    setSelectedCalendar('');
  }, [selectedUser]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      alert('Please fill all required fields and select Michael Kelcees as the user');
      return;
    }
    
    // Split the contact name for the URL parameters
    
    const url = `https://link.resultsdrivenrei.com/widget/booking/${selectedCalendar}?email=${selectedContact.email}&phone=${selectedContact.phone}&first_name=${selectedContact.first_name}&last_name=${selectedContact.last_name}`;
    window.location.href = url;
  };

  // Close contact dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target)) {
        setShowContactDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-8">

          <h1 className="text-3xl font-bold text-white text-center">Schedule a Meeting</h1>
          <p className="text-gray-100 text-center mt-2">Find your contact and book a calendar event</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Contact Search */}
          <div className="mb-6 relative" ref={contactDropdownRef}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
              Search Contact <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contact"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-gray-800 focus:outline-none transition-colors"
              placeholder="Start typing a name..."
              value={searchTerm}
              onChange={handleSearchChange}
              autoComplete="off"
            />
            
            {/* Contact Search Results */}
            {showContactDropdown && contacts.length > 0 && (
              <div className="absolute z-30 mt-1 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                {contacts.slice(0, 5).map((contact) => (
                  <div
                    key={contact.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="font-medium">{contact.first_name}</div>
                    <div className="text-sm text-gray-600">{contact.email}</div>
                  </div>
                ))}
                {contacts.length > 5 && (
                  <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 text-center">
                    Scroll to see more results
                  </div>
                )}
              </div>
            )}
            
            {loading && (
              <div className="absolute right-3 top-10">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
              </div>
            )}
            
            {selectedContact && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm">
                <p className="font-medium">{selectedContact.first_name}</p>
                <p className="text-gray-600">{selectedContact.email} | {selectedContact.phone}</p>
              </div>
            )}
          </div>
          
          {/* User Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
              Select User <span className="text-red-500">*</span>
            </label>
            <select
              id="user"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-gray-500 focus:outline-none transition-colors"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {selectedUser && !isKelceesSelected && (
              <p className="text-sm text-red-500 mt-1">
                Only Michael Kelcees' calendars are currently available
              </p>
            )}
          </div>
          
          {/* Calendar Type Selection - only enabled for Michael Kelcees */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calendarType">
              Calendar Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  calendarType === 'eventCalendar'
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${!isKelceesSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (isKelceesSelected) {
                    setCalendarType('eventCalendar');
                    setSelectedCalendar('');
                  }
                }}
                disabled={!isKelceesSelected}
              >
                Event Calendar
              </button>
              <button
                type="button"
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  calendarType === 'roundRobin'
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${!isKelceesSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (isKelceesSelected) {
                    setCalendarType('roundRobin');
                    setSelectedCalendar('');
                  }
                }}
                disabled={!isKelceesSelected}
              >
                Round Robin
              </button>
            </div>
            {!isKelceesSelected && selectedUser && (
              <p className="text-sm text-gray-500 mt-2">
                Please select Michael Kelcees to access calendars
              </p>
            )}
          </div>
          
          {/* Calendar Selection - only available for Michael Kelcees */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calendar">
              Select Calendar <span className="text-red-500">*</span>
            </label>
            <select
              id="calendar"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-gray-500 focus:outline-none transition-colors"
              value={selectedCalendar}
              onChange={(e) => setSelectedCalendar(e.target.value)}
              disabled={!isKelceesSelected || !calendarType}
            >
              <option value="">Select a calendar</option>
              {isKelceesSelected && calendarType && KelceesCalendars[calendarType].map((calendar) => (
                <option key={calendar.id} value={calendar.id}>
                  {calendar.name}
                </option>
              ))}
            </select>
            {!isKelceesSelected && selectedUser && (
              <p className="text-sm text-gray-500 mt-1">
                Please select Michael Kelcees to access calendars
              </p>
            )}
            {isKelceesSelected && !calendarType && (
              <p className="text-sm text-orange-500 mt-1">Please select a calendar type first</p>
            )}
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full font-bold py-3 px-4 rounded-lg shadow-md transition-all ${
              isFormValid 
                ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:opacity-90' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            Schedule Meeting
          </button>
          
          {!isFormValid && selectedUser && (
            <p className="text-xs text-center text-gray-500 mt-2">
              {!isKelceesSelected 
                ? "Only Michael Kelcees' calendars are available for scheduling" 
                : "Please fill all required fields to enable scheduling"}
            </p>
          )}
          {!selectedUser && (
            <p className="text-xs text-center text-gray-500 mt-2">
              Please fill all required fields to enable scheduling
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingForm;