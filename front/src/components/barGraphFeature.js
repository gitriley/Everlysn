import React, { Component } from 'react';

// Generic component for bar graphs
class BarGraphFeature extends Component {

    constructor(props) {
        super(props);
        this.calcWidth = this.calcWidth.bind(this)
    }

    calcWidth(val, feature) {
        switch(feature) {
            case 'tempo':
                return (val/220)*100
            case 'loudness':
                /* 
                set a hard floor on minimum loudness value because tracks rarely (if ever) 
                have a loudness less than -35db. Most are between -20db and -2db. 
                So by decreasing the range, we create a more expressive representation 
                of these more common values
                */
                let loudness = val
                if (loudness < -35) {
                    loudness = -25
                }
                return (1-(loudness/(-35)))*100
            default:
                return val*100
        }
    }

    render() {
        console.log(this.props.val)
        return (
            <div    
                className="graph-bar" 
                style={{width: this.calcWidth(this.props.val, this.props.feature) + '%'}}> 
            </div>
        )
    }
}

export default BarGraphFeature;
