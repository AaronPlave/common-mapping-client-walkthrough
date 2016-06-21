import Immutable from 'immutable';
import * as config from '../../constants/mapConfig';

export const mapState = Immutable.fromJS({
    layers: {
        data: [],
        reference: [],
        basemap: [],
        partial: []
    },
    maps: {},
    palettes: {},
    date: config.DEFAULT_DATE,
    view: {
        in3DMode: false,
        zoom: config.DEFAULT_ZOOM,
        maxZoom: config.MAX_ZOOM,
        minZoom: config.MIN_ZOOM,
        maxZoomDistance3D: config.MAX_ZOOM_DISTANCE_3D,
        minZoomDistance3D: config.MIN_ZOOM_DISTANCE_3D,
        center: config.DEFAULT_CENTER,
        extent: config.DEFAULT_EXTENT,
        projection: config.DEFAULT_PROJECTION,
        pixelHoverCoordinate: {
            lat: 0.0,
            lon: 0.0,
            x: 0,
            y: 0,
            isValid: false
        }
    },
    displaySettings: {
        enableTerrain: true,
        selectedScaleUnits: "metric"
    },
    alerts: []
});

export const layerModel = Immutable.fromJS({
    id: "",
    title: "",
    isActive: false,
    isChangingOpacity: false,
    isChangingPosition: false,
    opacity: 1.0,
    palette: {
        name: "",
        url: "",
        handleAs: "",
        min: 0,
        max: 0
    },
    min: 0,
    max: 0,
    units: "",
    time: config.DEFAULT_DATE.toISOString().split("T")[0],
    type: "",
    isDefault: false,
    wmtsOptions: null,
    thumbnailImage: "",
    fromJson: false,
    handleAs: "generic"
});

export const paletteModel = Immutable.fromJS({
    id: "",
    values: []
});