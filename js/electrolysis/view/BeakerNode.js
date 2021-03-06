// Copyright 2002-2015, University of Colorado Boulder
define(function(require) {
    'use strict';
    var Node = require('SCENERY/nodes/Node');
    var inherit = require('PHET_CORE/inherit');
    var Image = require('SCENERY/nodes/Image');
    var Rectangle = require('SCENERY/nodes/Rectangle');
    var Vector2 = require('DOT/Vector2');

    var beakerImage = require('image!ELECTROLYSIS/beaker.svg');

    function BeakerNode(model, modelViewTransform, environment) {
        Node.call(this, {
            x: model.location.x,
            y: model.location.y
        });

        this.accepts = model.accepts;

        var rectangleNode = new Rectangle(
            model.liquidFillLocation.x,
            model.liquidFillLocation.y,
            model.liquidFillSize.width,
            model.liquidFillSize.height, 
            0, 0, {
            fill: '#000',
            lineWidth: 0
        });
        
        this.addChild(rectangleNode);
        model.electrolyteProperty.link(function(liquid) {
            rectangleNode.fill = liquid ? liquid.color : '';
        }.bind(this));

        var image = new Image(beakerImage, {
            x: 0,
            y: 0
        });
        this.addChild(image);

        this.onReceiveDrop = model.onReceiveDrop;
        environment.addDroppable(this);
        this.collidesWith = function(childBounds) {
            var within = function(position, bounds) {
                var inRange = function(value, lowerBound, upperBound) {
                    return lowerBound < value && value < upperBound;
                };
                return inRange(position.x, bounds.minX, bounds.maxX) && inRange(position.y, bounds.minY, bounds.maxY);
            };

            var bounds = this.getGlobalBounds();
            return within(new Vector2(childBounds.minX, childBounds.minY), bounds);
        }.bind(this);
    }

    return inherit(Node, BeakerNode);
});
