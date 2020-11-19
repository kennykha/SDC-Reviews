import React from "react";
import axios from "axios";
import Summary from "./Summary.jsx";
import Filterer from "./Filterer.jsx";
import Reviews from "./Reviews.jsx";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      displayedReviews: [],
      sortBy: "most recent",
      filterBy: "all ratings",
      verifiedPurchase: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "verifiedPurchase") {
      this.setState({verifiedPurchase: !this.state.verifiedPurchase})
    } else {
      this.setState({[name]: value})
    }
  }

  componentDidMount() {
    axios.get(`/api/reviews${window.location.pathname}`)
    .then((response) => {
      this.setState({
        allReviews: response.data,
        displayedReviews: response.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="app">
        <h3 className="appTitle">Guest Ratings & Reviews</h3>
        <Summary reviews={this.state.allReviews}/>
        <br></br>
        <Filterer handleInputChange={this.handleInputChange}/>
        <br></br>
        <Reviews sortBy={this.state.sortBy} filterBy={this.state.filterBy} displayedReviews={this.state.displayedReviews}/>
      </div>
    )
  }
}

export default App;