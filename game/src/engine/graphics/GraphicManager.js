import { ServiceLocator } from '../ServiceLocator.js';
import { GraphicFactory } from './GraphicFactory.js';
import * as Manip from './Context2DManip.js';
import { palettes } from './ColorPalettes.js';


export class GraphicManager {
    constructor() {
        this._graphics = new Map();
        this._palette = palettes.find((p) => p.name == "icecream");
        this._spectrum = Manip.createSharpSpectrum(this._palette.colors);
    }


    create(type, node, layer) {
        //console.log("GraphicFactory create \"" + type + "\"...", node);

        return GraphicFactory.create(type, node, layer);
    }


    draw(context) {
        ServiceLocator.FPSCounter.update()
        //drawing in Y order then by layer
        // for (let i = 0; i <= ServiceLocator.context.canvas.height/ServiceLocator.scale; i++) {
        //     for (let layerKey of this._graphics.keys()) {
        //         for (let graphicKey of this._graphics.get(layerKey).keys()) {
        //             let graphic = this._graphics.get(layerKey)[graphicKey];
        //         //this._graphics.get(layerKey).forEach((graphic) => {
        //             if (graphic.node.scene.drawable &&
        //                 graphic.node.enabled &&
        //                 graphic.enabled) {
        //                 if(graphic.node.globalPosition.y <= i &&
        //                     graphic.node.globalPosition.y > i-1) {
        //                         context.scale(ServiceLocator.scale, ServiceLocator.scale);
        //                         context.translate(
        //                             Math.round(graphic.node.globalPosition.x),
        //                             Math.round(graphic.node.globalPosition.y)
        //                         );
        //                         graphic.draw(context);
        //                         context.resetTransform();
        //                 }
        //             }
        //         }
        //     }
        // }
        // drawing by layer
        this._graphics.forEach((layer) => {
            layer.forEach((graphic) => {
                if (graphic.enabled &&
                    graphic.node.enabled &&
                    graphic.node.scene &&
                    graphic.node.scene.drawable) {
                    context.scale(ServiceLocator.scale, ServiceLocator.scale);
                    context.translate(graphic.node.globalPosition.x, graphic.node.globalPosition.y);
                    graphic.draw(context);
                    context.resetTransform();
                }
            });
        });
    }

    changePalette(name){
        this._palette = palettes.find((p) => p.name == name);
        this._spectrum = Manip.createSharpSpectrum(this._palette.colors);
    }

    applyShaders(context) {
        let canvas = context.canvas;
        let ImgData = context.getImageData(0, 0, canvas.width, canvas.height);
        Manip.grayscale(ImgData.data);

        for (let i = 0; i < ImgData.data.length / 4; i++) {
            let light = ImgData.data[i * 4];
            ImgData.data[i * 4] = this._spectrum[light].r;
            ImgData.data[i * 4 + 1] = this._spectrum[light].g;
            ImgData.data[i * 4 + 2] = this._spectrum[light].b;
        }
        
        context.putImageData(ImgData, 0, 0);
    }


    addGraphic(graphic, layer) {
        graphic.layer = layer;
        if (!this._graphics.has(layer)) {
            this._graphics.set(layer, []);
            this._graphics = new Map([...this._graphics.entries()].sort());
        }

        this._graphics.get(layer).push(graphic);
    }


    removeGraphic(graphic) {
        if (!this._graphics.has(layer)) return;

        let layer = this._graphics.get(graphic.layer);
        let i = layer.indexOf(graphic);

        if (i >= 0)
            layer.splice(i, 1);
    }
}
