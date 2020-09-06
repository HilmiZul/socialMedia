import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./scream.module.css";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeButton from "./likeButton";

class Scream extends Component {
  render() {
    console.log("like count is ", this.props.scream.likeCount);
    dayjs.extend(relativeTime);
    const {
      body,
      createdAt,
      userImage,
      userHandle,
      likeCount,
      screamId,
      commentCount,
    } = this.props.scream;
    return (
      <Card className={classes.Card}>
        <CardMedia
          image={userImage}
          title="ProfileImage"
          className={classes.Image}
        ></CardMedia>
        <CardContent className={classes.Content}>
          <Typography
            color="primary"
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} Likes</span>
        </CardContent>
      </Card>
    );
  }
}

//connect subscribe/unsubscribe the redux store
export default Scream;
