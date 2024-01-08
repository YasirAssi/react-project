import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useContext, useState } from "react";
import GetCardsContext from "../../../store/getCardsContext";

const FilterComponent = () => {
  const [txt, setTxt] = useState("");
  const { cardsFromServer, setCardsFromServer } = useContext(GetCardsContext);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTxt(inputValue);
    const cardsSearch = cardsFromServer.filter((card) => {
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
        value={txt}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default FilterComponent;
