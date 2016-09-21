import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import { Button } from 'react-toolbox/lib/button';
import * as actions from '../../actions/MapActions';
import * as appConfig from '../../constants/appConfig';
import MiscUtil from '../../utils/MiscUtil';
import KeyHandler, { KEYUP, KEYDOWN } from 'react-key-handler';


const SPEED_FAST = 100;
const SPEED_SLOW = 500;

export class DatePickerContainer extends Component {
    componentWillMount() {
        // Instance variables are used here since these variables are purely interaction
        // based and are never intended to be affected by application state or affect application state.
        this.autoIncrementInterval = null;
        this.shouldAutoIncrement = false;
        this.autoIncrementSpeed = SPEED_SLOW;
        this.autoIncrementResolution = "days";
        this.shouldIntervalIncrement = true;
        this.autoIncrementEnabled = true;
    }
    incrementDate(resolution, increment = true) {
        let newDate = moment(this.props.date);
        if (increment) {
            newDate = newDate.add(1, resolution);
        } else {
            newDate = newDate.subtract(1, resolution);
        }

        let minDate = moment(appConfig.MIN_DATE);
        let maxDate = moment(appConfig.MAX_DATE);

        if (newDate.isBetween(minDate, maxDate)) {
            this.props.actions.setDate(newDate.toDate());
        }
    }
    updateDate(resolution, value) {
        // Update the application date based off 
        // Autocomplete incomplete date string
        let date = moment(this.props.date);
        let newDate = date.format("YYYY-MMM-DD");
        if (resolution === "days") {
            newDate = date.format("YYYY-MMM") + "-" + value;
        } else if (resolution === "months") {
            newDate = date.format("YYYY") + "-" + value + "-" + date.format("DD");
        } else if (resolution === "years") {
            newDate = value + "-" + date.format("MMM-DD");
        }
        newDate = moment(newDate, "YYYY-MMM-DD");

        let minDate = moment(appConfig.MIN_DATE);
        let maxDate = moment(appConfig.MAX_DATE);

        if (newDate.isBetween(minDate, maxDate)) {
            this.props.actions.setDate(newDate.toDate());
        } else {
            this.props.actions.setDate(date.toDate());
        }
    }
    autoIncrement() {
        if(this.shouldAutoIncrement) {
            clearTimeout(this.autoIncrementInterval);
            this.incrementDate(this.autoIncrementResolution, this.shouldIntervalIncrement);
            this.autoIncrementInterval = setTimeout(() => this.autoIncrement(), this.autoIncrementSpeed);
        }
    }
    beginAutoIncrement(increment) {
        if(this.autoIncrementEnabled) {
            this.shouldAutoIncrement = true;
            this.shouldIntervalIncrement = increment;
            if(this.autoIncrementInterval === null) {
                this.autoIncrementInterval = setTimeout(() => this.autoIncrement(), this.autoIncrementSpeed);
                this.incrementDate(this.autoIncrementResolution, this.shouldIntervalIncrement);
            }
        }
    }
    endAutoIncrement() {
        clearTimeout(this.autoIncrementInterval);
        this.shouldAutoIncrement = false;
        this.autoIncrementInterval = null;
    }
    setAutoIncrementResolution(resolution) {
        this.autoIncrementResolution = resolution;
    }
    setAutoIncrementSpeed(speed) {
        this.autoIncrementSpeed = speed;
    }
    disableAutoIncrement() {
        this.autoIncrementEnabled = false;
        this.endAutoIncrement();
    }
    enableAutoIncrement() {
        this.autoIncrementEnabled = true;
    }
    render() {
        let date = moment(this.props.date);
        let year = date.format("YYYY");
        let month = date.format("MMM");
        let day = date.format("DD");
        return (
            <div id="datePickerContainer" className="row middle-xs">
                <KeyHandler keyEventName={KEYDOWN} keyValue="Meta" onKeyHandle={() => this.disableAutoIncrement()} />
                <KeyHandler keyEventName={KEYUP} keyValue="Meta" onKeyHandle={() => this.enableAutoIncrement()} />

                <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowLeft" onKeyHandle={() => this.beginAutoIncrement(false)} />
                <KeyHandler keyEventName={KEYUP} keyValue="ArrowLeft" onKeyHandle={() => this.endAutoIncrement()} />

                <KeyHandler keyEventName={KEYDOWN} keyValue="ArrowRight" onKeyHandle={() => this.beginAutoIncrement(true)} />
                <KeyHandler keyEventName={KEYUP} keyValue="ArrowRight" onKeyHandle={() => this.endAutoIncrement()} />

                <KeyHandler keyEventName={KEYDOWN} keyValue="Shift" onKeyHandle={() => this.setAutoIncrementResolution("months")} />
                <KeyHandler keyEventName={KEYUP} keyValue="Shift" onKeyHandle={() => this.setAutoIncrementResolution("days")} />

                <KeyHandler keyEventName={KEYDOWN} keyValue="Control" onKeyHandle={() => this.setAutoIncrementSpeed(SPEED_FAST)} />
                <KeyHandler keyEventName={KEYUP} keyValue="Control" onKeyHandle={() => this.setAutoIncrementSpeed(SPEED_SLOW)} />
                <div className="date-picker-selection col-xs-5">
                    <div className="date-picker-selection-increment">
                        <Button neutral primary icon="arrow_drop_up" className="no-padding" onClick={() => this.incrementDate("years", true)}/>
                    </div>
                    <Autocomplete
                      direction="up"
                      onChange={(value) => this.updateDate("years", value)}
                      label=""
                      multiple={false}
                      source={appConfig.YEAR_ARRAY}
                      value={year}
                    />
                    <div className="date-picker-selection-increment">
                        <Button neutral primary icon="arrow_drop_down" className="no-padding" onClick={() => this.incrementDate("years", false)}/>
                    </div>
                </div>
                <div className="date-picker-selection col-xs-4">
                    <div className="date-picker-selection-increment">
                        <Button neutral primary icon="arrow_drop_up" className="no-padding" onClick={() => this.incrementDate("months", true)}/>
                    </div>
                    <Autocomplete
                      direction="up"
                      onChange={(value) => this.updateDate("months", value)}
                      label=""
                      multiple={false}
                      source={appConfig.MONTH_ARRAY}
                      value={month}
                    />
                    <div className="date-picker-selection-increment">
                        <Button neutral primary icon="arrow_drop_down" className="no-padding" onClick={() => this.incrementDate("months", false)}/>
                    </div>
                </div>
                <div className="date-picker-selection col-xs-3">
                    <div className="date-picker-selection-increment">
                        <Button neutral primary icon="arrow_drop_up" className="no-padding" onClick={() => this.incrementDate("days", true)}/>
                    </div>
                    <Autocomplete
                      direction="up"
                      onChange={(value) => this.updateDate("days", value)}
                      label=""
                      multiple={false}
                      source={appConfig.DAY_ARRAY}
                      value={day}
                    />
                    <div className="date-picker-selection-increment">
                        <Button neutral primary icon="arrow_drop_down" className="no-padding" onClick={() => this.incrementDate("days", false)}/>
                    </div>
                </div>
            </div>
        );
    }
}

DatePickerContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        date: state.map.get("date")
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DatePickerContainer);
