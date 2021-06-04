import React from "react";
import { setCuisineThunk } from "../store/restaurants";
import { connect } from "react-redux";
import MapView from "./MapView";
import RestaurantContainer from "./RestaurantContainer";
import Searches from "./Searches";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/styles";
import AliceCarousel from "react-alice-carousel";
import Button from "@material-ui/core/Button";
import "react-alice-carousel/lib/alice-carousel.css";
import theme from "../theme.js";
import { restaurantSelectionThunk } from "../store/restaurantSelections";

const handleDragStart = (e) => e.preventDefault();
const responsive = {
  324: {
    items: 1,
  },
  712: {
    items: 2,
  },
  912: {
    items: 3,
  },
  1099: {
    items: 4,
  },
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.lng,
      lat: this.props.lat,
      location: this.props.location,
      price: null,
      rating: null,
      selections: [],
    };
    console.log("My props on Map component are", this.props);
    this.restaurantSelection = this.restaurantSelection.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addSelectionsToStore = this.addSelectionsToStore.bind(this);
  }
  searchNewCuisine(cuisine, lat, long) {
    this.props._searchCuisine(cuisine, lat, long);
  }
  restaurantSelection(resId, resName, resImageUrl) {
    if (this.state.selections.length === 4) {
      window.alert("Please remove choice before continuing");
    } else {
      let pickedTwice = "";
      this.state.selections.forEach((item) => {
        if (item.yelpId === resId) {
          pickedTwice = item.yelpId;
        }
      });
      if (pickedTwice !== "") {
        window.alert("Can't pick restaurant twice! Please pick another!");
      } else {
        let restaurantObject = {
          yelpId: resId,
          yelpName: resName,
          yelpImageUrl: resImageUrl,
        };
        this.setState({
          selections: [...this.state.selections, restaurantObject],
        });
      }
    }
  }
  addSelectionsToStore() {
    if (this.state.selections.length === 4) {
      this.props.setRestaurantSelections(
        this.props.eventId,
        this.state.selections
      );
      this.props.history.push("/emails");
    } else {
      window.alert("Please make four selections!");
    }
  }
  removeSelection(resId) {
    this.setState({
      selections: this.state.selections.filter((item) => {
        return item.yelpId !== resId;
      }),
    });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleRadioChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    let resList = this.props.restaurants;
    if (this.state.rating !== null && this.state.rating !== "all") {
      resList = resList.filter((item) => {
        return item.rating === parseFloat(this.state.rating);
      });
    }
    if (this.state.price !== null && this.state.price !== "all") {
      resList = resList.filter((item) => {
        return item.price === this.state.price;
      });
    }
    const ratingValues = ["5", "4.5", "4", "all"];
    const ratingLabels = (
      <div className="rateLabels">
        {ratingValues.map((item) => (
          <label key={item}>{item}</label>
        ))}
      </div>
    );
    const rateButtons = (
      <div className="rateButtons">
        {ratingValues.map((item) => (
          <input
            key={item}
            type="radio"
            name="rating"
            value={item}
            checked={this.state.rating === item}
            onChange={this.handleRadioChange}
          />
        ))}
      </div>
    );
    const rateContainer = (
      <div className="rateContainer">
        {ratingLabels}
        {rateButtons}
      </div>
    );

    const priceValues = ["$$$$", "$$$", "$$", "$", "all"];
    const priceLabels = (
      <div className="priceLabels">
        {priceValues.map((item) => (
          <label key={item}>{item}</label>
        ))}
      </div>
    );

    const priceButtons = (
      <div className="priceButtons">
        {" "}
        {priceValues.map((item) => (
          <input
            key={item}
            type="radio"
            name="price"
            value={item}
            checked={this.state.price === item}
            onChange={this.handleInputChange}
          />
        ))}
      </div>
    );
    const priceContainer = (
      <div className="priceContainer">
        {priceLabels}
        {priceButtons}
      </div>
    );

    return (
      <ThemeProvider theme={theme}>
        <div id="main-container">
          <div id="main-map-container">
            <div id="search-and-select">
              <div style={{backgroundColor: "#fff100"}} id="main-selection-container">
                <h2 style={{color: "#dc143c"}} className="centered-text">SEARCH BY :</h2>
              </div>
              <div id="main-rating-container">
                <Searches
                  searchCuisine={(cuisine, lat, long) =>
                    this.searchNewCuisine(cuisine, lat, long)
                  }
                  lat={this.state.lat}
                  lng={this.state.lng}
                  resClear={(latitude, longitude) =>
                    this.props.restaurantsList(latitude, longitude)
                  }
                />
                <form className="rating-forms">
                  <h3 className="centered-text red">Rating:</h3>
                  {rateContainer}
                </form>
                <form className="rating-forms">
                  <h3 className="centered-text red">Price:</h3>
                  {priceContainer}
                </form>
              </div>
            </div>
            <div id="mapbox-container">
              <MapView
                restaurants={resList}
                lng={this.state.lng}
                lat={this.state.lat}
              />
            </div>
          </div>
          <div id="restaurant-container">
            <AliceCarousel
              disableDotsControls={true}
              mouseTracking
              responsive={responsive}
            >
              {resList.map((item) => (
                <div
                  className="res-card"
                  key={item.id}
                  onDragStart={handleDragStart}
                >
                  <Paper elevation={12} className="res-card">
                    <p id="res-card-text" className="capitalize-me">
                      {item.name}
                      <n />
                      {item.location.address1}
                      {item.location.address2}
                      <n />
                      {item.location.city} {item.location.state}{" "}
                      {item.location.zip_code}
                    </p>
                    <img className="restaurant-image" src={item.image_url} />
                    <div id="buttons-layout">
                      <a href={item.url} target="_blank">
                        <Button
                          id="yelp-button"
                          className="select-me"
                          variant="contained"
                        >
                          Go To Yelp!
                        </Button>
                      </a>
                      <Button
                        id="select-res-button"
                        className="select-me"
                        type="button"
                        variant="contained"
                        onClick={() =>
                          this.restaurantSelection(
                            item.id,
                            item.name,
                            item.image_url
                          )
                        }
                      >
                        Select
                      </Button>
                    </div>
                  </Paper>
                </div>
              ))}
            </AliceCarousel>
          </div>
          <RestaurantContainer
                resSelections={this.state.selections}
                removal={(resId) => this.removeSelection(resId)}
                addSelectionsToStore={this.addSelectionsToStore}
              />
        </div>
      </ThemeProvider>
    );
  }
}
const mapState = (state) => ({
  restaurants: state.restaurants,
  eventId: state.events.event.id,
});

const mapDispatch = (dispatch) => {
  return {
    _searchCuisine: (cuisine, lat, long) => {
      dispatch(setCuisineThunk(cuisine, lat, long));
    },
    setRestaurantSelections: (id, array) =>
      dispatch(restaurantSelectionThunk(id, array)),
  };
};

export default connect(mapState, mapDispatch)(Map);
