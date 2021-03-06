// Copyright 2002-2015, University of Colorado Boulder
define(function(require) {
    'use strict';
    function Environment() {
        this.droppables = [];
        this.addDroppable = function(node) {
            this.droppables.push(node);
        };

        this.onDrop = function(eventObject) {
            this.droppables.forEach(function(droppable) {
                if(isValidDrop(eventObject.model, droppable)){
                    if(collides(eventObject.bounds, droppable)) {
                        droppable.onReceiveDrop(eventObject.model);
                    }
                }
            });
        };

        var isValidDrop = function(model, droppable){
            return droppable.accepts && droppable.accepts.indexOf(model.type)>-1 ;
        };

        var collides = function(bounds, droppable){
            return typeof droppable.collidesWith === 'function' && droppable.collidesWith(bounds);
        };
    }
    return Environment;
});
