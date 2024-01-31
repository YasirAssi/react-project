import React, { useContext } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import ModeIcon from "@mui/icons-material/Mode";
import {
  Box,
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
      <Card
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginBottom: "8px",
        }}
      >
        <ListItem
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "#800080" }}>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <Grid container style={{ flex: 1, paddingLeft: "16px" }}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{ fontSize: "1.2rem", marginBottom: "8px" }}
              >
                User Full Name: {userInfo.first} {userInfo.last}
              </Typography>
            </Grid>
            <Grid item>
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "1rem", marginBottom: "4px" }}
                >
                  isAdmin: {userInfo.isAdmin ? "Yes" : "No"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "1rem", marginBottom: "4px" }}
                >
                  isBusiness: {userInfo.isBusiness ? "Yes" : "No"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "1rem", marginBottom: "4px" }}
                >
                  Phone: {userInfo.phone}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ fontSize: "1rem", marginBottom: "4px" }}
                >
                  Email: {userInfo.email}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
          <Box style={{ display: "flex", alignItems: "center" }}>
            {logIn.isAdmin && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleDeleteClick}
                style={{ marginLeft: "auto" }}
              >
                <DeleteIcon />
              </IconButton>
            )}
            <IconButton edge="end" aria-label="edit" onClick={handleEditClick}>
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
