import React, { Component } from "react";
import MenuSVG from "./icons/menuSVG.js";
import Menu from "./menu.js";

class menuParent extends Component {
  state = {
    menuIsShowing: false
  };

  render() {
    return (
      <div className='menu-parent'>
        <div onClick={() => this.setState({ menuIsShowing: !this.state.menuIsShowing })}>
          <MenuSVG />
        </div>
        {this.state.menuIsShowing && <Menu/>}
      </div>
    );
  }
}

export default menuParent;
