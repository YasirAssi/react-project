const normalizeFav = (cards, myId) => {
  if (!cards) return null;
  const normalizedCards = Array.isArray(cards)
    ? cards.map((card) => ({
        ...card,
        liked: card.likes.includes(myId),
      }))
    : {
        ...cards,
        liked: cards.likes.includes(myId),
      };

  return normalizedCards;
};
export default normalizeFav;
