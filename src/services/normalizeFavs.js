const normalizeFav = (cards, myId) => {
  if (!cards) return null;
  const newCards = cards.map((card) => ({
    ...card,
    liked: card.likes.includes(myId),
  }));
  return newCards;
};

export default normalizeFav;
