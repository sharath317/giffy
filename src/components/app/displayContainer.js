import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import { FixedSizeList as List, FixedSizeGrid as Grid } from "react-window";
import ContainerDimensions from "react-container-dimensions";

@inject('ProfileStore')
@observer
export default class DisplayContainer extends Component {

    constructor(props) {

        super(props);
    }
    
    render() {
        let {
            eventMap,
            currentPage
        } = this.props.ProfileStore;


        let pageLevelData = toJS(eventMap.get(currentPage)) || [];
        let {options} =pageLevelData;


        const Cell = ({ columnIndex, rowIndex, style }) => (
            <div key={3 * rowIndex + columnIndex + 1} className="displayBarItem" style={style}>
                <video controls className="video" src={options[3 * rowIndex + columnIndex + 1].mp4} type="video/mp4" playsInline >
                </video>
            </div>
        );
        
        return (
            <div className="displayBar">
                {(options && options.length>0) &&  <ContainerDimensions>
                    {({ width, height }) =>
                        <Grid
                            columnCount={3}
                            columnWidth={width / 3}
                            height={height}
                            rowCount={options.length / 3}
                            rowHeight={height / 3}
                            width={width}
                        >
                            {Cell}
                        </Grid>
                    }
                </ContainerDimensions>}
                {(!options || !options.length>0) && <p>Loading...</p>}
               
            </div>
        );
    }
}

