import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box, List, Grid, Typography } from "@mui/material";
import UserManageComponent from "../Component/UserManageComponent";
import nextKey from "generate-my-key";
import normalizeUser from "../services/normalizeUser";
import { toast } from "react-toastify";
import GetUsersContext from "../store/usersContext";

const SandboxPage = () => {
  const { userArr, setUserArr, setUserCopy } = useContext(GetUsersContext);
  const [dense, setDense] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users");
        setUserArr(normalizeUser(response.data));
        setUserCopy(normalizeUser(response.data));
      } catch (error) {
        toast.error("Error fetching data", {
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
  }, [setUserArr, setUserCopy]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete("/users/" + id).then(({ data }) => {
        setUserArr((copyOfUsers) => {
          return copyOfUsers.filter((user) => user._id !== id);
        });
      });
      toast.success("🦄 User is Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.warn("Only Admin or LoggedIn Owner can Delete!", {
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

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Users List
        </Typography>

        <List dense={dense}>
          {userArr.map((user) => (
            <UserManageComponent
              key={nextKey()}
              userInfo={{
                _id: user._id,
                first: user.name.first,
                middle: user.name.middle,
                last: user.name.last,
                phone: user.phone,
                email: user.email,
                isAdmin: user.isAdmin,
                isBusiness: user.isBusiness,
              }}
              onDelete={handleDelete}
            />
          ))}
        </List>
      </Grid>
    </Box>
  );
};

export default SandboxPage;
