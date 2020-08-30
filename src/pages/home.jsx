import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Scream from "../components/scream";

class Home extends Component {
  state = {
    scream: null,
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
      <Grid container spacing={10}>
        <Grid item sm={8} sx={12}>
          {recentScream}
        </Grid>
        <Grid item sm={4} sx={12}>
          <p>Profile</p>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
