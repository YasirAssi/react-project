import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import UserManageComponent from "./UserManageComponent";
import nextKey from "generate-my-key";
import normalizeUser from "./normalizeUser";
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
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
  }, [setUserArr]);

  const handleDelete = async (id) => {
    console.log("Deleting user with ID:", id);

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
          Avatar with text and icon
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
                isBuisness: user.isBuisness,
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
