import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTheme } from '../actions'

function mapStateToProps(state) {
    return {

    };
}

class menu extends Component {
    render() {
        return (
            <div className='menu'>
                <div className='menu-item_header'>Theme:</div>

                <div className='menu-subitem' onClick={() => this.props.dispatch(setTheme('light'))}>   Light</div>
                <div className='menu-subitem' onClick={() => this.props.dispatch(setTheme('dark'))}>   Dark</div>
                
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(menu);