import React, { useContext } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import ModeIcon from "@mui/icons-material/Mode";
import {
  Grid,
  Card,
  CardContent,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import LogInContext from "../store/loginContext";
import "../style/userManagerCardStyle.css";

const UserManageComponent = ({ userInfo, onDelete, onEdit }) => {
  const { logIn } = useContext(LogInContext);
  const handleDeleteClick = () => {
    onDelete(userInfo._id);
  };
  const handleEditClick = () => {
    onEdit(userInfo._id);
  };

  return (
    <Grid xs={12} md={6}>
      <Card className="managementCard">
        <ListItem justifyContent>
          <ListItemAvatar>
            <Avatar className="avatar">
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <Grid container>
            <Grid item xs={12} sm container>
              <Grid item xs spacing={2}>
                <Grid item>
                  <Typography variant="h6">
                    User Full Name: {userInfo.first} {userInfo.last}
                  </Typography>
                </Grid>
                <Grid item>
                  <CardContent className="cardContent">
                    <Typography variant="body2" color="text.secondary">
                      isAdmin: {userInfo.isAdmin ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      isBusiness: {userInfo.isBusiness ? "Yes" : "No"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {userInfo.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email: {userInfo.email}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {logIn.isAdmin && (
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton edge="end" aria-label="edit" onClick={handleEditClick}>
            <ModeIcon />
          </IconButton>
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
