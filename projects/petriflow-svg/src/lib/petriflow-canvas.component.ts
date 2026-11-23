import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {PetriflowCanvasService} from './petriflow-canvas.service';
import {PetriflowCanvas} from './petriflow-canvas';
import {GridConfiguration} from './grid-configuration';
import Panzoom, {PanzoomOptions} from '@panzoom/panzoom';

@Component({
    selector: 'petriflow-svg-canvas',
    templateUrl: './petriflow-canvas.component.html',
    // @netgrif/petri.svg draws its elements with presentation attributes (fill="white", stroke="black"),
    // CSS overrides them, so the colors can be themed with custom properties (defaults = original colors):
    // --petriflow-svg-element-fill, --petriflow-svg-element-stroke, --petriflow-svg-text-color
    // (+ --petriflow-svg-canvas-background and --petriflow-svg-grid-color in the template)
    // :where() = no specificity: the variables replace the colors petri.svg sets as SVG attributes,
    // state classes of the application (e.g. .svg-transition-enabled of the simulation) still win
    styles: [`
        :where(petriflow-svg-canvas [fill="white"]) {
            fill: var(--petriflow-svg-element-fill, white);
        }

        :where(petriflow-svg-canvas [stroke="white"]) {
            stroke: var(--petriflow-svg-element-fill, white);
        }

        :where(petriflow-svg-canvas [stroke="black"]) {
            stroke: var(--petriflow-svg-element-stroke, black);
        }

        :where(petriflow-svg-canvas text) {
            fill: var(--petriflow-svg-text-color, black);
        }
    `],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PetriflowCanvasComponent implements AfterViewInit {

    @ViewChild('canvas') canvasElement: ElementRef | undefined;
    @ViewChild('canvasDefs') canvasDefsElement: ElementRef | undefined;
    @ViewChild('canvasGrid') canvasGridElement: ElementRef | undefined;
    @Input() gridConfiguration: GridConfiguration = new GridConfiguration();
    @Input() panzoomConfiguration: PanzoomOptions = {
        canvas: true,
        contain: 'outside',
        cursor: 'auto',
        maxScale: 10,
        minScale: 0.5,
        step: 0.2
    };
    private _canvas: PetriflowCanvas | undefined;

    constructor(private _canvasService: PetriflowCanvasService) {
    }

    ngAfterViewInit() {
        this._canvas = new PetriflowCanvas(this.canvasElement?.nativeElement, this.canvasDefsElement?.nativeElement);
        this._canvasService.canvas = this._canvas;
        this._canvasService.panzoom = Panzoom(this.canvasElement?.nativeElement, this.panzoomConfiguration);
        this.canvasElement?.nativeElement.parentElement.addEventListener('wheel', this._canvasService.panzoom.zoomWithWheel);
    }

    get canvas(): PetriflowCanvas | undefined {
        return this._canvas;
    }

    // TODO: PF-48 where hotkeys?
}
