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
    const width = 1975;
    const height = 1000;
    const projection = d3.geoMercator().translate([width / 2, height / 2]).scale(310).center([5, 30]);
    // geoConicEqualArea(); geoNaturalEarth1();
    const svg = d3.select('#map').append('svg')
      .attr('width', width)
      .attr('height', height);
    const path = d3.geoPath().projection(projection);
    const g = svg.append('g');
    g.attr('class', 'map');

    d3.json('../../assets/countries-10m.json').then((topo) => {
      const mapFeatures: FeatureCollection = t.feature(topo, topo.objects.land) as any as FeatureCollection;
      g.selectAll('path')
        .data(mapFeatures.features)
        .enter()
        .append('path')
        .attr('d', path);
      g.append('path')
        .datum(t.mesh(topo, topo.objects.countries, (a, b) => a !== b))
        .attr('d', path)
        .attr('class', 'border-glow');
    });
  }

}
