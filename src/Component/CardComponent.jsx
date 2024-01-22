import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import { SignalCellular1Bar } from "@mui/icons-material";
import "../style/cardComponentStyle.css";

const CardComponent = ({
  title,
  subtitle,
  img,
  phone,
  address,
  cardNumber,
  id,
  onDelete,
  Info,
  onEdit,
  onFav,
  isFav,
}) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleInfoClick = () => {
    Info(id);
  };

  const handleFavClick = () => {
    onFav(id);
  };

  const handleEditClick = () => {
    onEdit(id);
  };

  return (
    <Card square raised className="cards">
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          alt="american massle car"
          height={200}
        />
      </CardActionArea>
      <CardHeader title={title} subheader={subtitle}></CardHeader>
      <Divider></Divider>
      <CardContent>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Phone:
          </Typography>
          {phone}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Address:
          </Typography>
          {`${address.state} ${address.country} ${address.city} ${address.zip} ${address.street} ${address.houseNumber}`}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Card number:
          </Typography>
          {cardNumber}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEditClick}>
              <ModeIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={handleInfoClick}>
              <InfoIcon />
            </IconButton>
            <IconButton onClick={handleFavClick}>
              <StarIcon color={isFav ? "warning" : "inherit"} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  phone: PropTypes.string.isRequired,
  address: PropTypes.shape({
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    houseNumber: PropTypes.number.isRequired,
    zip: PropTypes.number.isRequired,
  }).isRequired,
  cardNumber: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  Info: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onFav: PropTypes.func.isRequired,
  isFav: PropTypes.bool.isRequired,
};

CardComponent.defaultProps = {
  img: SignalCellular1Bar,
  subtitle: "Cards HomePage",
  phone: " 050-000-00-00",
  address: {
    city: " City",
    street: "Street",
    houseNumber: 11,
  },
  cardNumber: 12345,
};

export default CardComponent;
