import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class menu extends Component {
    render() {
        return (
            <div className='menu'>
                <div className='menu-item'>Theme:</div>

                <div className='menu-subitem'>   Light</div>
                <div className='menu-subitem'>   Dark</div>
                
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(menu);