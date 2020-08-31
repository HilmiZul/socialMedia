import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Scream from "../components/scream";
import Profile from "../components/profile";
//redux
import { connect } from "react-redux";
import { apiGetBegan } from "../store/types";

class Home extends Component {
  state = {
    screams: null,
  };
  componentDidMount() {
    axios
      .get("/screams")
      .then((res) => {
        console.log(res.data);
        this.setState({ screams: res.data.screams });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentScream = this.state.screams ? (
      this.state.screams.map((scream, id) => (
        <Scream key={id + "scream"} scream={scream}></Scream>
      ))
    ) : (
      <p>{"loading..."}</p>
    );
    return (
      <Grid container sx={12}>
        <Grid item sm={6} sx={12}>
          {recentScream}
        </Grid>
        <Grid item sm={6} sx={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

//connect subscribe/unsubscribe the redux store
export default Home;
