import { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { Box, List, Grid, Button } from "@mui/material";
import UserManageComponent from "../Component/UserManageComponent";
import normalizeUser from "../services/normalizeUser";
import { toast } from "react-toastify";
import GetUsersContext from "../store/usersContext";
import PageHeader from "../Layout/header/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const SandboxPage = () => {
  const { userArr, setUserArr, setUserCopy } = useContext(GetUsersContext);
  const [dense, setDense] = useState(true);
  const [visibleItems, setVisibleItems] = useState(4);

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

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };

  return (
    <Fragment>
      <PageHeader
        title="User List"
        subtitle="Admin, you have control over user accounts on this page"
        paragraph=" This page allows you to oversee and manage user accounts. Utilize the 'Edit' option to modify user details and 'Delete' to remove a user from the system. Take care to confirm any deletions, as this action is irreversible"
      />
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: 1200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={6}>
          <List dense={dense}>
            {userArr.slice(0, visibleItems).map((user, index) => (
              <UserManageComponent
                key={"user" + index}
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
            {visibleItems < userArr.length && (
              <Button
                variant="contained"
                endIcon={<AddCircleOutlineIcon />}
                onClick={handleShowMore}
                color="secondary"
                sx={{ mt: 1, ml: 12 }}
              >
                Show More Users
              </Button>
            )}
          </List>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default SandboxPage;
