import { useEffect } from "react";
import Typography from "@mui/material/Typography";

const ProfilePage = () => {
  useEffect(() => {
    //axios call to get user data
    //useContext get user id
  }, []);
  return (
    <Typography variant="h1" color="initial">
      Profile Page
    </Typography>
  );
};

export default ProfilePage;
