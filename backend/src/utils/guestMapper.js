// Database -> Frontend
function toApiGuest(guest) {
  return {
    id: guest.guestCode,
    name: guest.name,
    email: guest.email,
    phone: guest.phone,
    address: guest.address,
    visits: guest.visits,
  };
}

// Frontend -> Database
function toDbGuest(guest) {
  return {
    guestCode: guest.id ?? guest.guestCode,
    name: guest.name,
    email: guest.email,
    phone: guest.phone || "",
    address: guest.address || "",
    visits: Number(guest.visits) || 0,
  };
}

module.exports = {
  toApiGuest,
  toDbGuest,
};