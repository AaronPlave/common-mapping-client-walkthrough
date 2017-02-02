import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, IconButton} from 'react-toolbox/lib/button';
import appConfig from 'constants/appConfig';
import * as DateSliderActions from '_core/actions/DateSliderActions';
import MiscUtil from '_core/utils/MiscUtil';

const miscUtil = new MiscUtil();

export class ResolutionStep extends Component {
    constructor(props) {
        super(props);

        this.isSelectingResoltion = false;
    }
    toggleResolutionSelector() {
        this.isSelectingResolution = !this.isSelectingResolution;
        this.forceUpdate();
    }
    render() {
        let resolutionSelectorClasses = miscUtil.generateStringFromSet({
            "resolution-selector": true,
            "active": this.isSelectingResolution
        });
        return (
            <div id="dateSliderResolutionStepContainer" className="text-wrap">
                <IconButton
                    primary={this.isSelectingResolution}
                    onClick={() => this.toggleResolutionSelector()}
                    className="timeline-zoom"
                    icon="filter_list"
                    data-tip="Adjust the slider resolution"
                    data-place="left"
                />
                <div className={resolutionSelectorClasses}>
                    <Button
                        primary
                        tabIndex={this.isSelectingResolution ? 0 : -1}
                        label={appConfig.DATE_SLIDER_RESOLUTIONS.DAYS.label}
                        className="no-padding resolution-step small"
                        onClick={() => this.props.actions.setDateResolution(appConfig.DATE_SLIDER_RESOLUTIONS.DAYS)}
                    />
                    <Button
                        primary
                        tabIndex={this.isSelectingResolution ? 0 : -1}
                        label={appConfig.DATE_SLIDER_RESOLUTIONS.MONTHS.label}
                        className="no-padding resolution-step small"
                        onClick={() => this.props.actions.setDateResolution(appConfig.DATE_SLIDER_RESOLUTIONS.MONTHS)}
                    />
                    <Button
                        primary
                        tabIndex={this.isSelectingResolution ? 0 : -1}
                        label={appConfig.DATE_SLIDER_RESOLUTIONS.YEARS.label}
                        className="no-padding resolution-step small"
                        onClick={() => this.props.actions.setDateResolution(appConfig.DATE_SLIDER_RESOLUTIONS.YEARS)}
                    />
                </div>
            </div>
        );
    }
}
ResolutionStep.propTypes = {
    actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(DateSliderActions, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
)(ResolutionStep);
