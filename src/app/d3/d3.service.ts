import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable()
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */
  constructor() { }

  /** A method to bind a pan and zoom behavior to an svg element */
  applyZoomableBehavior(svgElement, containerElement) {
    const svg = d3.select(svgElement);
    const container = d3.select(containerElement);
    const zoomed = () => {
      const transform = d3.event.transform;
      container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
    };
    const zoom = d3.zoom().on('zoom', zoomed);
    svg.call(zoom);
  }

}
