import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTheme } from '../actions'

function mapStateToProps(store) {
    return {
        theme: store.theme
    };
}

const selectThemeStyle = {
    'fontWeight': '700',
    'textDecoration': 'underline'
}


class menu extends Component {
    constructor(props) {
        super(props);

    }
    
    getStyle = (themeValue) => {
        if (this.props.theme === themeValue) {
            return selectThemeStyle
        }
    }
    render() {
        return (
            <div className='menu'>
                <div className='menu-item_header'>Theme:</div>

                <div 
                    className='menu-subitem' 
                    onClick={() => this.props.dispatch(setTheme('light'))}
                    style={this.getStyle('light')}>   
                    Light
                </div>

                <div 
                    className='menu-subitem' 
                    onClick={() => this.props.dispatch(setTheme('dark'))}
                    style={this.getStyle('dark')}>    
                    Dark
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(menu);