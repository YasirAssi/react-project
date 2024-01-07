import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CoffeeIcon from "@mui/icons-material/Coffee";
import DiamondIcon from "@mui/icons-material/Diamond";
const FooterComponent = () => {
  return (
    <Paper elevation={4} sx={{ position: "sticky", mt: 2 }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Icebook" icon={<AcUnitIcon />} />
        <BottomNavigationAction label="Cofegram" icon={<CoffeeIcon />} />
        <BottomNavigationAction label="D" icon={<DiamondIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default FooterComponent;
