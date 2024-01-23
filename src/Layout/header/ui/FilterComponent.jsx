import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useContext } from "react";
import GetCardsContext from "../../../store/getCardsContext";
import GetUsersContext from "../../../store/usersContext";

const FilterComponent = () => {
  const { setCardsFromServer, cardsCopy } = useContext(GetCardsContext);
  const { setUserArr, userCopy } = useContext(GetUsersContext);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue || inputValue.length < 1) {
      setCardsFromServer(cardsCopy);
      setUserArr(userCopy);
      return;
    }
    const cardsSearch = cardsCopy.filter((card) => {
      return card.title.includes(inputValue);
    });
    const userSearch = userCopy.filter((user) => {
      return user.name.first.includes(inputValue);
    });

    setCardsFromServer(cardsSearch);
    setUserArr(userSearch);
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
