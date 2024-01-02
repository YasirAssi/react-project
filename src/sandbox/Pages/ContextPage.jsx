import { Grid } from "@mui/material";
import UpdateContext from "../../context/UpdateComponent";
import DisplayContext from "../../context/DisplayComponent";

// const ContextPage = () => {
//   let [counterState, setCounterState] = useCounterContext();
//   const handleBtnClick = () => {
//     setCounterState((prevCounterState) => ({
//       ...prevCounterState,
//       counter: prevCounterState.counter + 1,
//     }));
//   };

//   return (
//     <Fragment>
//       <Typography variant="h1" color="initial">
//         Context Page
//       </Typography>
//       <Button onClick={handleBtnClick}>Increment</Button>
//       {counterState.counter}
//     </Fragment>
//   );
// };

const ContextPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={3} md={6} xs={12}>
        <UpdateContext />
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
        <DisplayContext />
      </Grid>
    </Grid>
  );
};

export default ContextPage;
