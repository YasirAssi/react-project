import React from "react";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FolderIcon from "@mui/icons-material/Folder";

const UserManageComponent = ({ userInfo, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(userInfo._id);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      }
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "8px",
      }}
    >
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <Box>
        <Typography variant="h6">
          {userInfo.first} {userInfo.last}
        </Typography>
        <ListItemText
          primary={`isAdmin: ${userInfo.isAdmin ? "Yes" : "No"}, isBusiness: ${
            userInfo.isBusiness ? "Yes" : "No"
          }, Phone: ${userInfo.phone}`}
        />
      </Box>
    </ListItem>
  );
};

UserManageComponent.propTypes = {
  onDelete: PropTypes.func,
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
