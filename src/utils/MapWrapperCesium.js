/**
 * Copyright 2017 California Institute of Technology.
 *
 * This source code is licensed under the APACHE 2.0 license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import moment from "moment";
import * as appStringsCore from "_core/constants/appStrings";
import * as appStrings from "constants/appStrings";
import MapWrapperCesiumCore from "_core/utils/MapWrapperCesium";
import MapUtil from "utils/MapUtil";

/**
 * Wrapper class for Cesium
 *
 * @export
 * @class MapWrapperCesium
 * @extends {MapWrapper}
 */
export default class MapWrapperCesium extends MapWrapperCesiumCore {
    /**
     * Initialize static class references for this instance
     *
     * @param {string|domnode} container the container to render this map into
     * @param {object} options view options for constructing this map wrapper (usually map state from redux)
     * @memberof MapWrapperOpenlayers
     */
    initStaticClasses(container, options) {
        MapWrapperCesiumCore.prototype.initStaticClasses.call(this, container, options);
        this.mapUtil = MapUtil;
    }

    /**
     * Bring layer into view
     *
     * @param {ImmutableJS.Map} layer layer object from map state in redux
     * @memberof MapWrapperCesiumExtended
     * @returns {boolean} true if zooming succeeds
     */
    zoomToLayer(layer) {
        try {
            let mapLayers = this.getMapLayers(layer.get("handleAs"));
            let mapLayer = this.findLayerInMapLayers(mapLayers, layer);
            if (mapLayer) {
                this.map.flyTo(mapLayer, {
                    duration: 1,
                    offset: new this.cesium.HeadingPitchRange(0, -90, 0)
                });
                return true;
            }
            return false;
        } catch (err) {
            console.warn("Error in MapWrapperCesiumExtended.zoomToLayer:", err);
            return false;
        }
    }

    /**
     * update a layer on the map. This creates a new layer
     * and replaces the layer with a matching id
     *
     * @param {ImmutableJS.Map} layer layer object from map state in redux
     * @returns {boolean} true if it succeeds
     * @memberof MapWrapperCesium
     */
    updateLayer(layer) {
        try {
            if (
                layer.get("handleAs") === appStringsCore.LAYER_VECTOR_KML &&
                layer.get("vectorStyle") === appStrings.VECTOR_STYLE_STORM
            ) {
                let mapLayers = this.getMapLayers(layer.get("handleAs"));
                let mapLayer = this.findLayerInMapLayers(mapLayers, layer);
                if (mapLayer) {
                    this.setLayerRefInfo(layer, mapLayer);

                    let date = moment(this.mapDate).startOf("d");
                    let nextDate = moment(date).add(1, "d");

                    let features = mapLayer.entities.values;
                    for (let i = 0; i < features.length; ++i) {
                        let feature = features[i];
                        if (feature.kml.extendedData) {
                            feature.point.pixelSize = 10;
                            feature.point.outlineColor = this.cesium.Color.BLACK;

                            let featureTime = moment(
                                feature.kml.extendedData.dtg.value,
                                layer.get("timeFormat")
                            );
                            if (featureTime.isBetween(date, nextDate, null, "[)")) {
                                feature.point.pixelSize = 13;
                                feature.point.outlineColor = this.cesium.Color.WHITE;
                            }
                        }
                    }
                }
                return true;
            } else {
                return MapWrapperCesiumCore.prototype.updateLayer.call(this, layer);
            }
        } catch (err) {
            console.warn("Error in MapWrapperCesium.updateLayer:", err);
            return false;
        }
    }

    /**
     * create a vector cesium layer corresponding
     * to the given layer
     *
     * @param {ImmutableJS.Map} layer layer object from map state in redux
     * @returns {object|boolean} cesium layer object or false if it fails
     * @memberof MapWrapperCesium
     */
    createVectorLayer(layer) {
        try {
            let layerSource = MapWrapperCesiumCore.prototype.createVectorLayer.call(this, layer);
            if (layerSource && typeof layer.get("vectorStyle") !== "undefined") {
                layerSource.then(mapLayer => {
                    this.setVectorLayerFeatureStyles(layer, mapLayer);
                });
            }
            return layerSource;
        } catch (err) {
            console.warn("Error in MapWrapperCesium.createVectorLayer:", err);
        }
    }

    /**
     * Update the styles of a vector layer's set of entities
     *
     * @param {ImmutableJS.Map} layer layer object from map state in redux
     * @param {object} mapLayer cesium layer object
     * @returns {boolean} false if it fails
     * @memberof MapWrapperCesium
     */
    setVectorLayerFeatureStyles(layer, mapLayer) {
        try {
            let features = mapLayer.entities.values;
            if (layer.get("vectorStyle") === appStrings.VECTOR_STYLE_STORM) {
                for (let i = 0; i < features.length; ++i) {
                    let feature = features[i];
                    feature.billboard = undefined;
                    feature.label = undefined;
                    feature._layerId = layer.get("id");
                    if (feature.kml.extendedData) {
                        let category = this.mapUtil.getStormCategory(
                            parseInt(feature.kml.extendedData.intensity.value)
                        );
                        feature.point = new this.cesium.PointGraphics({
                            color: new this.cesium.Color.fromCssColorString(category.color),
                            pixelSize: 10,
                            outlineWidth: 1.25
                        });
                    }
                }
            }
            return true;
        } catch (err) {
            console.warn("Error in MapWrapperCesium.setVectorLayerFeatureStyles:", err);
            return false;
        }
    }

    /**
     * retrieves an array of feature data at a given coordinate/pixel
     *
     * @param {array} pixel  [x,y] screen coordinates
     * @returns {array} feature data objects
     * - layerId - {string} id of the layer this feature belongs to
     * - properties - {object} data properties of the feature (intensity, minSeaLevelPres, dtg)
     * - coords - {array} [lon,lat] map coordinates of the feature
     * @memberof MapWrapperCesium
     */
    getDataAtPoint(pixel) {
        try {
            let data = []; // the collection of pixel data to return

            let pickedObjects = this.map.scene.drillPick(
                new this.cesium.Cartesian2(pixel[0], pixel[1]),
                1
            );
            for (let i = 0; i < pickedObjects.length; ++i) {
                let entity = pickedObjects[i];
                if (entity.id && entity.id.kml && entity.id.kml.extendedData) {
                    data.push({
                        layerId: entity.id._layerId,
                        properties: {
                            intensity: parseInt(entity.id.kml.extendedData.intensity.value),
                            minSeaLevelPres: parseInt(
                                entity.id.kml.extendedData.minSeaLevelPres.value
                            ),
                            dtg: entity.id.kml.extendedData.dtg.value
                        },
                        coords: [
                            parseFloat(entity.id.kml.extendedData.lon.value),
                            parseFloat(entity.id.kml.extendedData.lat.value)
                        ]
                    });
                }
            }

            // pull just one feature to display
            return data.slice(0, 1);

            // return data;
        } catch (err) {
            console.warn("Error in MapWrapperCesium.getDataAtPoint:", err);
            return [];
        }
    }
}
