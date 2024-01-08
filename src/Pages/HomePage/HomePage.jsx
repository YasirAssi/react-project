import { Grid, Typography } from "@mui/material";
import CardComponent from "../../Component/CardComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const handlePhoneCard = (phone) => {
  console.log("parent: Phone to call", phone);
};

const handleFavCard = (id) => {
  console.log("parent: card to like", id);
};

const handleEditCard = (id) => {
  console.log("parent: card to edit", id);
};

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setDataFromServer(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);
  if (!dataFromServer || !dataFromServer.length) {
    return <Typography>Could not find any items</Typography>;
  }
  const handleDeleteCard = (id) => {
    console.log("father: card to delete", id);
    setDataFromServer((currentDataFromServer) =>
      currentDataFromServer.filter((card) => card._id !== id)
    );
    toast("🦄 Card Is Deleted", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <Grid container spacing={2} mt={7}>
      {dataFromServer.map((item, index) => (
        <Grid item lg={3} md={3} xs={12} key={"carsCard" + index}>
          <CardComponent
            id={item._id}
            title={item.title}
            subtitle={item.subtitle}
            img={item.image.url}
            phone={item.phone}
            address={item.address}
            cardNumber={item.bizNumber}
            onDelete={handleDeleteCard}
            onCall={handlePhoneCard}
            onEdit={handleEditCard}
            onFav={handleFavCard}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
