const normalizeEditUser = (data) => {
  return {
    first: data.name.first,
    middle: data.name.middle,
    last: data.name.last,
    phone: data.phone,
    email: data.email,
    country: data.address.country,
    city: data.address.city,
    street: data.address.street,
    houseNumber: data.address.houseNumber,
    zip: data.address.zip,
  };
};

export default normalizeEditUser;
