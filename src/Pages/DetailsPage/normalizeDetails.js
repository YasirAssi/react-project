const normalizeDetails = (data) => {
  return {
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    phone: data.phone,
    email: data.email,
    web: data.web,
    url: data.image.url,
    address: data.address,
    houseNumber: data.address.houseNumber,
  };
};

export default normalizeDetails;
