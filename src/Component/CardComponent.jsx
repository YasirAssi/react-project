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
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { SignalCellular1Bar } from "@mui/icons-material";

const CardComponent = ({
  title,
  subtitle,
  img,
  phone,
  address,
  cardNumber,
  id,
  onDelete,
  onCall,
  onEdit,
  onFav,
  isLiked,
}) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handlePhoneClick = () => {
    onCall(phone);
  };

  const handleFavClick = () => {
    onFav(id);
  };

  const handleEditClick = () => {
    onEdit(id);
  };

  return (
    <Card square raised>
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
            <IconButton onClick={handlePhoneClick}>
              <LocalPhoneIcon />
            </IconButton>
            <IconButton onClick={handleFavClick}>
              <FavoriteIcon color={isLiked ? "error" : "inherit"} />
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
};

CardComponent.defaultProps = {
  img: SignalCellular1Bar,
  subtitle: "Cards HomePage",
};

export default CardComponent;

// could you help me making the FavoriteIcon red when user cicks on it
