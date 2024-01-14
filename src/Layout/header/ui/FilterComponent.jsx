import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useContext } from "react";
import GetCardsContext from "../../../store/getCardsContext";

const FilterComponent = () => {
  const { setCardsFromServer, cardsCopy } = useContext(GetCardsContext);
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue || inputValue.length < 1) {
      setCardsFromServer(cardsCopy);
      return;
    }
    const cardsSearch = cardsCopy.filter((card) => {
      return card.title.includes(inputValue);
    });

    setCardsFromServer(cardsSearch);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default FilterComponent;
