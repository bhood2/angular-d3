import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as t from 'topojson-client';
import { GeometryCollection, FeatureCollection } from 'geojson';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const width = 1080;
    const height = 1080;
    const projection = d3.geoNaturalEarth1(); // geoConicEqualArea();
    const svg = d3.select('#map').append('svg')
      .attr('width', width)
      .attr('height', height);
    const path = d3.geoPath().projection(projection);
    const g = svg.append('g');
    g.attr('class', 'map');

    d3.json('../../assets/countries-10m.json').then((topology) => {
      const mapFeatures: FeatureCollection = t.feature(topology, topology.objects.land);
      console.log('topology: ', topology);
      g.selectAll('path')
        // .data(topology.objects.land.geometries[0].arcs)
        .data(mapFeatures.features)
        .enter()
        .append('path')
        .attr('d', path);
    });
  }

}
