var PinActions = require("../actions/PinActions");
var Store = require("../stores/Store");

var pinStyle = {
  background: "#fff",
  width: 300,
  border: "solid 1px #ccc",
  position: "relative",
  display: "inline-block",
  margin: 5,
  cursor: "pointer",
  verticalAlign: "top"
};

var pinButtonStyle = {
  WebkitTransition: "all 0.4s ease",
  WebkitAppearance: "none",
  outline: "none",
  border: "none",
  background: "#FF1857",
  color: "#fff",
  fontSize: 20,
  opacity: "1",
  position: "absolute",
  top: 5,
  right: 5,
  cursor: "pointer",
  fontFamily: "Courgette",
  borderRadius: 10,
  height: 30,
  lineHeight: 30,
};

var imgStyle = {
  maxWidth: 300,
  maxHeight: 400,
};

var pinButtonPinnedStyle = {
  fontSize: 0,
  opacity: 0.9,
};

module.exports = React.createClass({
  getInitialState: function() {
    return {
      pinned: this.props.pin.pinned
    };
  },
  _onPinClick: function() {
    if (this.props.pin.pinned)
      PinActions.unpinPost(this.props.pin.id);
    else
      PinActions.pinPost(this.props.pin.id);
    return false;
  },
  _onPostClick: function() {
    PinActions.showPost(this.props.pin.id);
  },
  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(Store.getPinState(this.props.pin.id));
  },
  render: function() {
    var pin = this.props.pin;

    var pinButton;
    var pbStyle = m(pinButtonStyle, this.state.pinned ? pinButtonPinnedStyle : {});
    pinButton = <button onClick={this._onPinClick} style={pbStyle}>Pin</button>;

    return (
      <div onClick={this._onPostClick} style={pinStyle}>
        <img src={pin.image} alt={pin.title} style={imgStyle} />
        <h2> {pin.title}</h2>
        {pinButton}
      </div>
    );
  }
});

function m() {
  var result = {};
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      for (var key in arguments[i]) {
	result[key] = arguments[i][key];
      }
    }
  }
  return result;
}
