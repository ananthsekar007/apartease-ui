import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface AuthCardProps {
  title: string;
  content: string;
  image: string;
  redirectPath: string;
}

export const AuthCard = (props: AuthCardProps) => {

    const navigate = useNavigate();

  const onButtonClick = () => {
    navigate(props.redirectPath);
  };

  return (
    <>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={props.image}
            alt="Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="large"
            color="primary"
            fullWidth
            variant="contained"
            onClick={onButtonClick}
          >
            Get Started
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
