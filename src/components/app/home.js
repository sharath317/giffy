import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import Select, { components } from "react-select";
import { toJS } from "mobx";
import Pagination from "./pagination";
import { FixedSizeList as List, FixedSizeGrid as Grid } from "react-window";
import ContainerDimensions from "react-container-dimensions";
import * as utils from "./util";
import DisplayContainer from './displayContainer';


@inject("ProfileStore")
@observer
export class Home extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = utils.debounce(selectedOption => {
        selectedOption && selectedOption.length > 3 && this.props.ProfileStore.handleInputChange(selectedOption);
    }, 300)


    handleOnAutoComplete = value => {
        if (value) {
            this.props.ProfileStore.handleOnAutoComplete(value);
        }
    };

    onPageChanged = data => {
        this.props.ProfileStore.currentPage = data.currentPage;
        let { eventMap, currentPage } = this.props.ProfileStore;
        let currentPageData = toJS(eventMap.get(currentPage));
        if (!currentPageData && data) {
            this.props.ProfileStore.handleOnNextPage(data);
        }
    };


    render() {
        let {
            selectedItemOnAutoComplete,
            eventMap,
            currentPage,
        } = this.props.ProfileStore;

        let currentPageData = toJS(eventMap.get(currentPage));
        let pageLevelData = currentPageData && currentPageData['options'] || [];
        let paginationData = currentPageData && currentPageData['pagination'] || [];
        let { count, offset, total_count } = paginationData

        let options = pageLevelData.slice(1, 20);
        if (total_count >= 2000) {
            total_count = 2000;
        }

        const CustomOption = props => {
            const { data, innerRef, innerProps } = props;
            return data.mp4 ? (
                <div ref={innerRef} {...innerProps}>
                    <div className="optionItem">{data.value}</div>

                </div>
            ) : (
                    <components.Option {...props} />
                );
        };

        return (
            <div className="homePage">
                <div className="homePageSearch">
                    <Select
                        value={selectedItemOnAutoComplete}
                        onInputChange={this.handleChange}
                        onChange={this.handleOnAutoComplete}
                        components={{ Option: CustomOption }}
                        options={options}
                        placeholder={`Search for a Gif (eg. apple, hello, cool...)`}
                    />
                </div>
                <DisplayContainer />

                <div className="paginationContainer">
                    <Pagination
                        totalRecords={total_count || 200}
                        pageLimit={count}
                        pageNeighbours={1}
                        onPageChanged={this.onPageChanged}
                    />
                </div>
            </div>
        );
    }
}
export default withRouter(Home);
