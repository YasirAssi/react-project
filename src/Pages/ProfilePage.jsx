import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, List, Grid, Typography } from "@mui/material";
import UserManageComponent from "../Component/UserManageComponent";
import { toast } from "react-toastify";
import GetUsersContext from "../store/usersContext";
import LogInContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";

const ProfilePage = () => {
  const { user, setUser, setUserCopy } = useContext(GetUsersContext);
  const [dense] = useState(true);
  const { logIn } = useContext(LogInContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/users/" + logIn._id);
        setUser(data);
      } catch (error) {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };

    fetchData();
  }, [logIn, setUserArr, setUserCopy]);

  const handleEdit = (id) => {
    navigate(`${ROUTES.EDITUSER}/${id}`);
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Profile
        </Typography>

        <List dense={dense}>
          <UserManageComponent
            userInfo={{
              _id: user._id,
              first: user.first,
              middle: user.middle,
              last: user.last,
              phone: user.phone,
              email: user.email,
              isAdmin: user.isAdmin,
              isBusiness: user.isBusiness,
            }}
            onEdit={handleEdit}
          />
        </List>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
