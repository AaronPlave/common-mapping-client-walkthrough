import * as actionTypes from '../constants/actionTypes';
import * as mapStrings from '../constants/mapStrings';
import * as appStrings from '../constants/appStrings';
import * as mapConfig from '../constants/mapConfig';
import { createStore } from 'redux';
import { expect } from 'chai';
import rootReducer from '../reducers';
import { mapState, layerModel, paletteModel } from '../reducers/models/map';
import { asyncState } from '../reducers/models/async';
import { helpState } from '../reducers/models/help';
import { shareState } from '../reducers/models/share';
import { settingsState } from '../reducers/models/settings';
import { dateSliderState } from '../reducers/models/dateSlider';
import { analyticsState } from '../reducers/models/analytics';
import { viewState } from '../reducers/models/view';
import { layerInfoState } from '../reducers/models/layerInfo';

const initialState = {
    map: mapState,
    view: viewState,
    asyncronous: asyncState,
    help: helpState,
    settings: settingsState,
    share: shareState,
    dateSlider: dateSliderState,
    analytics: analyticsState,
    layerInfo: layerInfoState
};

describe('Store - Map', function() {
    // add the html fixture from the DOM to give maps a place to render during tests
    beforeEach(function() {
        let fixture = '<div id="fixture"><div id="map2D"></div><div id="map3D"></div></div>';

        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);
    });

    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });

    it('initializes 2D map', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_2D, container: "map2D" }
        ];
        actions.forEach(action => store.dispatch(action));


        const actual = store.getState();
        const actualMap2D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_2D];
        const actualMap3D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_3D];

        const expected = {
            map: mapState.remove("maps"),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(1);
        expect(actualMap2D).to.not.equal(undefined);
        expect(actualMap3D).to.equal(undefined);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.toJS());

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('initializes 3D map', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" }
        ];
        actions.forEach(action => store.dispatch(action));


        const actual = store.getState();
        const actualMap2D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_2D];
        const actualMap3D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_3D];

        const expected = {
            map: mapState.remove("maps"),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(1);
        expect(actualMap2D).to.equal(undefined);
        expect(actualMap3D).to.not.equal(undefined);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.toJS());

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('initializes 2D and 3D maps', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_2D, container: "map2D" },
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" }
        ];
        actions.forEach(action => store.dispatch(action));


        const actual = store.getState();
        const actualMap2D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_2D];
        const actualMap3D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_3D];

        const expected = {
            map: mapState.remove("maps"),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(2);
        expect(actualMap2D).to.not.equal(undefined);
        expect(actualMap3D).to.not.equal(undefined);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.toJS());

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('initializes 3D and 2D maps', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" },
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_2D, container: "map2D" }
        ];
        actions.forEach(action => store.dispatch(action));


        const actual = store.getState();
        const actualMap2D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_2D];
        const actualMap3D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_3D];

        const expected = {
            map: mapState.remove("maps"),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(2);
        expect(actualMap2D).to.not.equal(undefined);
        expect(actualMap3D).to.not.equal(undefined);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.toJS());

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('can enable 3D terrain', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" },
            { type: actionTypes.SET_TERRAIN_ENABLED, enabled: true }

        ];
        actions.forEach(action => store.dispatch(action));
        const actual = store.getState();
        const actualMap3D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_3D];

        const expected = {
            map: mapState.remove("maps"),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actualMap3D.map.terrainProvider._url).to.equal(mapConfig.DEFAULT_TERRAIN_ENDPOINT);
        expect(actual.map.remove("maps").get("view").toJS()).to.deep.equal(expected.map.remove("maps").get("view").toJS());

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('can disable 3D terrain', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" },
            { type: actionTypes.SET_TERRAIN_ENABLED, enabled: false }

        ];
        actions.forEach(action => store.dispatch(action));
        const actual = store.getState();
        const actualMap3D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_3D];

        const expected = {
            map: mapState.remove("maps"),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actualMap3D.map.terrainProvider._url).to.equal(undefined);
        expect(actual.map.remove("maps").get("view").toJS()).to.deep.equal(expected.map.remove("maps").get("view").toJS());

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('can set map view mode to 3D without 2D map', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" },
            { type: actionTypes.SET_MAP_VIEW_MODE, mode: mapStrings.MAP_VIEW_MODE_3D }

        ];
        actions.forEach(action => store.dispatch(action));
        const actual = store.getState();
        const actualMap3D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_3D];

        const expected = {
            map: mapState.remove("maps").setIn(["view", "in3DMode"], true),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(1);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.remove("maps").toJS());
        expect(actualMap3D.isActive).to.equal(true);

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('can set map view mode to 3D with 2D map', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" },
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_2D, container: "map2D" },
            { type: actionTypes.SET_MAP_VIEW_MODE, mode: mapStrings.MAP_VIEW_MODE_3D }

        ];
        actions.forEach(action => store.dispatch(action));
        const actual = store.getState();
        const actualMap3D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_3D];

        const expected = {
            map: mapState.remove("maps").setIn(["view", "in3DMode"], true),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(2);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.remove("maps").toJS());
        expect(actualMap3D.isActive).to.equal(true);

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('can set map view mode to 2D without 3D map', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_2D, container: "map2D" },
            { type: actionTypes.SET_MAP_VIEW_MODE, mode: mapStrings.MAP_VIEW_MODE_2D }

        ];
        actions.forEach(action => store.dispatch(action));
        const actual = store.getState();
        const actualMap2D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_2D];

        const expected = {
            map: mapState.remove("maps").setIn(["view", "in3DMode"], false),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(1);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.remove("maps").toJS());
        expect(actualMap2D.isActive).to.equal(true);

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('can set map view mode to 2D with 3D map', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_2D, container: "map2D" },
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" },
            { type: actionTypes.SET_MAP_VIEW_MODE, mode: mapStrings.MAP_VIEW_MODE_2D }

        ];
        actions.forEach(action => store.dispatch(action));
        const actual = store.getState();
        const actualMap2D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_2D];

        const expected = {
            map: mapState.remove("maps").setIn(["view", "in3DMode"], false),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(2);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.remove("maps").toJS());
        expect(actualMap2D.isActive).to.equal(true);

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('can reset 3D map orientation', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" },
            { type: actionTypes.SET_MAP_VIEW_MODE, mode: mapStrings.MAP_VIEW_MODE_3D },
            { type: actionTypes.RESET_ORIENTATION, duration: 0 }

        ];
        actions.forEach(action => store.dispatch(action));
        const actual = store.getState();
        const actualMap3D = actual.map.get("maps").toJS()[mapStrings.MAP_LIB_3D];

        const expected = {
            map: mapState.remove("maps").setIn(["view", "in3DMode"], true),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(1);
        expect(actualMap3D.map.camera.heading).to.equal(6.283185307179586);
        expect(actualMap3D.map.camera.roll).to.equal(0);
        expect(actualMap3D.map.camera.pitch).to.equal(-1.5707963267948966);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.remove("maps").toJS());

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });

    it('can zoom maps and stuff', function() {
        const store = createStore(rootReducer, initialState);

        const actions = [
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_2D, container: "map2D" },
            { type: actionTypes.INITIALIZE_MAP, mapType: mapStrings.MAP_LIB_3D, container: "map3D" },
            { type: actionTypes.ZOOM_IN },
            { type: actionTypes.ZOOM_IN },
            { type: actionTypes.ZOOM_OUT },
            { type: actionTypes.ZOOM_IN },
            { type: actionTypes.ZOOM_OUT }
        ];
        actions.forEach(action => store.dispatch(action));

        const actual = store.getState();
        const expected = {
            map: mapState.remove("maps").setIn(["view", "zoom"], mapState.getIn(["view", "zoom"]) + 1),
            view: viewState,
            asyncronous: asyncState,
            help: helpState,
            settings: settingsState,
            share: shareState,
            dateSlider: dateSliderState,
            analytics: analyticsState,
            layerInfo: layerInfoState
        };

        // CHANGE
        expect(actual.map.get("maps").size).to.equal(2);
        expect(actual.map.remove("maps").toJS()).to.deep.equal(expected.map.remove("maps").toJS());

        // NO CHANGE
        expect(actual.view.toJS()).to.deep.equal(expected.view.toJS());
        expect(actual.asyncronous.toJS()).to.deep.equal(expected.asyncronous.toJS());
        expect(actual.help.toJS()).to.deep.equal(expected.help.toJS());
        expect(actual.settings.toJS()).to.deep.equal(expected.settings.toJS());
        expect(actual.share.toJS()).to.deep.equal(expected.share.toJS());
        expect(actual.dateSlider.toJS()).to.deep.equal(expected.dateSlider.toJS());
        expect(actual.analytics.toJS()).to.deep.equal(expected.analytics.toJS());
        expect(actual.layerInfo.toJS()).to.deep.equal(expected.layerInfo.toJS());
    });
});
