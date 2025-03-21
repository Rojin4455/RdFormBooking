import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const calendarType = "roundRobin"
  const [selectedCalendar, setSelectedCalendar] = useState('');
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const contactDropdownRef = useRef(null);
  const [showBooking, setShowBooking] = useState(false)
  // const [selectedUser, setSelectedUser] = useState('');
  // const [selectedCalendar, setSelectedCalendar] = useState('');
  // const calendarType = "roundRobin"; // Keeping it constant for now



  const isFormValid = selectedContact && calendarType && selectedCalendar;


  const users = [
    { id: 1, name: 'Steven Higgins' },
    { id: 2, name: 'Mike Reed' },
    { id: 3, name: 'Kelcee Lari' },
    { id: 4, name: 'Charles Johnson' },
    { id: 5, name: 'Alec Turner' },
    { id: 6, name: 'Bo Hardy' },
    { id: 7, name: 'Jordan Lane' },
  ];




  const userCalendars = {
    1: {
      roundRobin: [
        // { name: 'Marketing Breakdown Calendar RR', id: 'OC9reDkKUOra6IlSNiqH' },
        // { name: 'Business Breakdown Calendar RR', id: '4yzMBEOTLswbgfLiCz5e' },
        // { name: 'Team Building Breakdown Calendar RR', id: 'noSt7Dt0obyk6PhUC7KQ' },
        // { name: 'Systems Breakdown Calendar RR', id: 'wz65RzKW9OMdoX2oKOVz' },
        // { name: 'Bi-weekly Meeting Calendar RR', id: 'ly2I6eTgKJfIXTUNIdXi' },
      ],
    },
    2: {
      roundRobin: [
        { name: 'Marketing Breakdown Calendar RR', id: 'lm60Myt80lvYZgESN5HR' },
        { name: 'Business Breakdown Calendar RR', id: 'AD8nwM2zu77gBVj3QGsa' },
        { name: 'Team Building Breakdown Calendar RR', id: 'KnJdGEyApEyaZOncqyKS' },
        { name: 'Systems Breakdown Calendar RR', id: 'kz8ASoCNaM8auEQ7QDWP' },
        { name: 'Bi-weekly Meeting Calendar RR', id: 'osFDzOpgpVNRmj8weAZR' },
      ],
    },
    3: {
      roundRobin: [
        { name: 'Marketing Breakdown Calendar RR', id: 'OC9reDkKUOra6IlSNiqH' },
        { name: 'Business Breakdown Calendar RR', id: '4yzMBEOTLswbgfLiCz5e' },
        { name: 'Team Building Breakdown Calendar RR', id: 'noSt7Dt0obyk6PhUC7KQ' },
        { name: 'Systems Breakdown Calendar RR', id: 'wz65RzKW9OMdoX2oKOVz' },
        { name: 'Bi-weekly Meeting Calendar RR', id: 'ly2I6eTgKJfIXTUNIdXi' },
      ],
    },
    4: {
      roundRobin: [
        // { name: 'Marketing Breakdown Calendar RR', id: 'OC9reDkKUOra6IlSNiqH' },
        // { name: 'Business Breakdown Calendar RR', id: '4yzMBEOTLswbgfLiCz5e' },
        // { name: 'Team Building Breakdown Calendar RR', id: 'noSt7Dt0obyk6PhUC7KQ' },
        // { name: 'Systems Breakdown Calendar RR', id: 'wz65RzKW9OMdoX2oKOVz' },
        // { name: 'Bi-weekly Meeting Calendar RR', id: 'ly2I6eTgKJfIXTUNIdXi' },
      ],
    },
    5: {
      roundRobin: [
        // { name: 'Marketing Breakdown Calendar RR', id: 'OC9reDkKUOra6IlSNiqH' },
        // { name: 'Business Breakdown Calendar RR', id: '4yzMBEOTLswbgfLiCz5e' },
        // { name: 'Team Building Breakdown Calendar RR', id: 'noSt7Dt0obyk6PhUC7KQ' },
        // { name: 'Systems Breakdown Calendar RR', id: 'wz65RzKW9OMdoX2oKOVz' },
        // { name: 'Bi-weekly Meeting Calendar RR', id: 'ly2I6eTgKJfIXTUNIdXi' },
      ],
    },    
    6: {
      roundRobin: [
        { name: 'Marketing Breakdown Calendar RR', id: '7bOuuJ94cyx1k71ksyX7' },
        { name: 'Business Breakdown Calendar RR', id: 'G0IwvLanQuy79RBG3DmG' },
        { name: 'Team Building Breakdown Calendar RR', id: 'sGSIfoUZcmnQqW7EU41a' },
        { name: 'Systems Breakdown Calendar RR', id: 'ejLmaKsuT56qJlZ5Q5yO' },
        { name: 'Bi-weekly Meeting Calendar RR', id: '1dch7GGRXYfuP5vLJDve' },
      ],
    },    
    7: {
      roundRobin: [
        { name: 'Marketing Breakdown Calendar RR', id: 'NTYHwUeLxce0CkO94BA1' },
        { name: 'Business Breakdown Calendar RR', id: '949V78btNC3oguTVNySD' },
        { name: 'Team Building Breakdown Calendar RR', id: 'KSMHi0nwTwLZ91Ton03r' },
        { name: 'Systems Breakdown Calendar RR', id: 'Hj9xxqQvysGKzbfOGsbW' },
        { name: 'Bi-weekly Meeting Calendar RR', id: 'yem26uDVeICxR7TkbThP' },
      ],
    },
  };

  const selectedUserCalendars = selectedUser ? userCalendars[selectedUser]?.[calendarType] || [] : [];



  

  const fetchContacts = async (query) => {
    setLoading(true);
    try {

      const response = await axios.get(`https://rd.kickinsaas.com/api/contacts/?search=${query}`)
      if (response.status ===200){
        console.log(response.data)      
      setContacts(response.data.results);
}
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setSearchTerm(contact.first_name);
    setShowContactDropdown(false);
  };

  useEffect(() => {
    setSelectedCalendar('');
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      alert('Please fill all required fields and select Michael Kelcees as the user');
      return;
    }
    
    
    const baseUrl = `https://link.resultsdrivenrei.com/widget/booking/${selectedCalendar}`;
    const params = new URLSearchParams({
      email: selectedContact.email,
      first_name: selectedContact.first_name,
      last_name: selectedContact.last_name,
      id:selectedContact.id
    });
    
    if (selectedContact.phone) {
        const cleanedPhone = selectedContact.phone.replace(/\D/g, ''); 
        params.append("phone", cleanedPhone);
      }
    
    const url = `${baseUrl}?${params.toString()}`;
    // window.location.href = url;

    setShowBooking(true);
    setTimeout(() => {
      document.getElementById("bookingFrame").src = url;
    }, 100);
  };

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
  <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden">
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-white text-center">Schedule a Meeting</h1>
      <p className="text-gray-100 text-center mt-2">Find your contact and book a calendar event</p>
    </div>

        {!showBooking && (
        
        <form onSubmit={handleSubmit} className="p-6">
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
                {contacts.slice(0, 5).map((contact, index) => (
                  <div
                    key={contact.id ?? `${contact.email}-${index}`}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <div className="font-medium">{contact.first_name}</div>
                    <div className="text-sm text-gray-600">{contact.email} {contact.phone ? " | " + contact.phone : ""}{contact.id ? " | " + contact.id : ""}</div>
                  </div>
                ))}
                {/* {contacts.length > 5 && (
                  <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 text-center">
                    Scroll to see more results
                  </div>
                )} */}
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
                <p className="text-gray-600">{selectedContact.email} {selectedContact.phone ? " | " + selectedContact.phone : ""}{selectedContact.id ? " | " + selectedContact.id : ""}</p>
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
      </div>
          
          {/* Calendar Type Selection - only enabled for Michael Kelcees */}
         
          
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
          disabled={!selectedUserCalendars.length}
        >
          <option value="">Select a calendar</option>
          {selectedUserCalendars.map((calendar) => (
            <option key={calendar.id} value={calendar.id}>
              {calendar.name}
            </option>
          ))}
        </select>
      </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full font-bold py-3 px-4 rounded-lg shadow-md transition-all ${
              isFormValid 
                ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white hover:opacity-90' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Schedule Meeting
          </button>
          
          {!isFormValid && selectedUser && (
            <p className="text-xs text-center text-gray-500 mt-2">
             
            Please fill all required fields to enable scheduling
            </p>
          )}
          {!selectedUser && (
            <p className="text-xs text-center text-gray-500 mt-2">
              Please fill all required fields to enable scheduling
            </p>
          )}
        </form>
        )}

{showBooking && (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="p-4 bg-[#155EEF12] text-white flex justify-between items-center">
          <h2 className="text-xl text-gray-800 font-bold">Booking</h2>
          <button 
            onClick={() => setShowBooking(false)} 
            className="bg-blue-50 border border-blue-500 px-4 py-2 rounded-md text-blue-600 hover:bg-blue-500 hover:text-white transition duration-200"
            >
            Close
          </button>
        </div>
        <iframe 
          id="bookingFrame" 
          className="w-full h-full"
          style={{ border: "none" }} 
          title="Booking Widget"
        />
      </div>
    )}
      </div>
    </div>
  );
};

export default BookingForm;