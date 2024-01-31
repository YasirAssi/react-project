import { useContext } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import ModeIcon from "@mui/icons-material/Mode";
import {
  Grid,
  Box,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import LogInContext from "../store/loginContext";
import "../style/userCardStyle.css";

const UserManageComponent = ({ userInfo, onDelete, onEdit }) => {
  const { logIn } = useContext(LogInContext);
  const handleDeleteClick = () => {
    onDelete(userInfo._id);
  };
  const handleEditClick = () => {
    onEdit(userInfo._id);
  };

  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginBottom: "8px",
        }}
        className="user-card"
      >
        <ListItem className="user-info">
          <ListItemAvatar>
            <Avatar className="avatar">
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <Grid container className="user-details">
            <Grid item xs={12} sm container>
              <Grid item>
                <Typography variant="h6" className="user-full-name">
                  User Full Name: {userInfo.first} {userInfo.last}
                </Typography>

                <Grid item>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="user-property"
                    >
                      isAdmin: {userInfo.isAdmin ? "Yes" : "No"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="user-property"
                    >
                      isBusiness: {userInfo.isBusiness ? "Yes" : "No"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="user-property"
                    >
                      Phone: {userInfo.phone}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="user-property"
                    >
                      Email: {userInfo.email}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box className="actions">
            {logIn.isAdmin && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleDeleteClick}
                className="delete-button"
              >
                <DeleteIcon />
              </IconButton>
            )}
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleEditClick}
              className="edit-button"
            >
              <ModeIcon />
            </IconButton>
          </Box>
        </ListItem>
      </Card>
    </Grid>
  );
};

UserManageComponent.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  userInfo: PropTypes.shape({
    _id: PropTypes.string,
    first: PropTypes.string.isRequired,
    middle: PropTypes.string,
    last: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string,
    isAdmin: PropTypes.bool,
    isBusiness: PropTypes.bool,
  }).isRequired,
};

export default UserManageComponent;
