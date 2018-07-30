import React, { Component } from 'react';

// Generic component for bar graphs
class TextFeature extends Component {

    constructor(props) {
        super(props);
        this.getVal = this.getVal.bind(this)
    }

    musicalKey = {
        0: 'C',
        1: 'C♯',
        2: 'D',
        3: 'D♯/E♭',
        4: 'E',
        5: 'F',
        6: 'F♯/G♭',
        7: 'G',
        8: 'G♯/A♭',
        9: 'G',
        10: 'A♯/B♭',
        11: 'B'
    }

    mode = {
        0: 'Minor',
        1: 'Major'
    }

    getVal(val, feature) {
        switch(feature) {
            case 'time_signature':
                return `${val}/4`
            case 'mode':
                return this.mode[val]
            case 'key':
                return this.musicalKey[val]
        }
    }

    render() {
        return (
            <div className='text-val'> 
                {this.getVal(this.props.val, this.props.feature)}
            </div>
        )
    }
}

export default TextFeature;
