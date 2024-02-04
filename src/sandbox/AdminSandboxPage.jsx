import { useState, useEffect, useContext, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, List, Grid, Button } from "@mui/material";
import UserManageComponent from "../Component/UserManageComponent";
import normalizeUser from "../services/normalizeUser";
import { toast } from "react-toastify";
import GetUsersContext from "../store/usersContext";
import PageHeader from "../Layout/header/PageHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ROUTES from "../routes/ROUTES";

const SandboxPage = () => {
  const { userArr, setUserArr, setUserCopy } = useContext(GetUsersContext);
  const [dense] = useState(true);
  const [visibleItems, setVisibleItems] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/users");
        setUserArr(normalizeUser(data));
        setUserCopy(normalizeUser(data));
      } catch (error) {
        toast.error("Ops! somthing went wrong", {
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

  const handleEdit = (id) => {
    navigate(`${ROUTES.EDITUSER}/${id}`);
  };

  return (
    <Fragment>
      <PageHeader
        title="Users List"
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
            {userArr.length > 0 ? (
              userArr.slice(0, visibleItems).map((user, index) => (
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
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <p>No users available.</p>
            )}
            {visibleItems < userArr.length && (
              <Button
                variant="contained"
                endIcon={<AddCircleOutlineIcon />}
                onClick={handleShowMore}
                color="secondary"
                sx={{ mt: 1, ml: 28 }}
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

// the userArr is an array (data
//Array(297) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ]) but still get form react that useArr.slice or useArr.map is not a function

/**
 * the normalizeUser code:
 
 * const normalizeUser = (data) => {
  return data.map((user) => ({
    _id: user._id,
    name: {
      first: user.name.first,
      middle: user.name.middle,
      last: user.name.last,
    },
    phone: user.phone,
    email: user.email,
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
  }));
};

export default normalizeUser;

 */
