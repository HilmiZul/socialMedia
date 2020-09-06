import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Scream from "../components/scream";
import Profile from "../components/profile";
// REdux
import { connect } from "react-redux";
import { apiGetScreamBegan } from "../store/actions";

class Home extends Component {
  componentDidMount() {
    this.props.getAllScreams("./screams");
  }

  render() {
    let recentScream = this.props.data.screams ? (
      this.props.data.screams.map((scream, id) => (
        <Scream key={id + "scream"} scream={scream} />
      ))
    ) : (
      <p>{"loading..."}</p>
    );
    return (
      <Grid container spacing={10} sx={12}>
        <Grid item sm={7} sx={12}>
          {recentScream}
        </Grid>
        <Grid item sm={5} sx={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  data: state.data, //screams does not change, because shallow copy of scream object
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    getAllScreams: (url) => dispatch(apiGetScreamBegan({ url })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Home);
