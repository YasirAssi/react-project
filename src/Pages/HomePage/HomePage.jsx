import { Grid, Typography } from "@mui/material";
import CardComponent from "../../Component/CardComponent";
import { useState, useEffect } from "react";
import axios from "axios";

let initialDataFromServer = [
  {
    id: "id0",
    title: "title1",
    subtitle: "subtitle1",
    img: "/assets/imgs/car1.jpg",
    phone: "050-4334433",
  },
  {
    id: "id1",
    title: "title2",
    subtitle: "subtitle2",
    img: "/assets/imgs/card2.jpg",
    phone: "050-2347895",
  },
  {
    id: "id2",
    title: "title3",
    subtitle: "subtitle3",
    img: "/assets/imgs/card3.jpg",
    phone: "050-2342453",
  },
  {
    id: "id3",
    title: "title4",
    subtitle: "subtitle4",
    img: "/assets/imgs/card4.jpg",
    phone: "050-1234567",
  },
  {
    id: "id4",
    title: "title5",
    subtitle: "subtitle5",
    img: "/assets/imgs/card5.png",
    phone: "050-1324333",
  },
];

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
        console.log(data);
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
    console.log({ dataFromServer });
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

// the onDelete={handleDeleteCard} is not deleting the card
