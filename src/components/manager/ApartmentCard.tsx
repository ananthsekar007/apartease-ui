import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Apartment } from "../../types/ApartmentTypes";
import ApartmentBackground from "../../assets/Apartment.jpg";

interface ApartmentCardProps {
  apartment: Apartment;
}

const styles = {
  media: {
    height: 150,
    position: "relative",
  },
  fadeOverlay: {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundImage: "linear-gradient(to bottom, transparent, white)",
    zIndex: 1,
  },
};


const ApartmentCard = ({ apartment: {name, city, state, zip, street, ...rest} }: ApartmentCardProps) => {

    const GetAddress = () => {
        return (
            <>
                <Typography variant="body1"> {` ${street}, ${city}, ${state} - ${zip} `} </Typography>
            </>
        )
    }

  return (
    <Card
      elevation={6}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 20,
        height: "30%",
        borderRadius: 20,
        cursor: "pointer"
      }}
    >
      <CardMedia style={styles.media} image={ApartmentBackground}>
        <div style={styles.fadeOverlay} />
      </CardMedia>
      <CardContent
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexDirection : "row"
        }}
      >
        <div>
          <Typography variant="h5" component="h2" marginTop={2}>
            {name}
          </Typography>
        </div>
        <div style={{marginTop: 20}}>
          <GetAddress />
        </div>
      </CardContent>
    </Card>
  );
};

export default ApartmentCard;
