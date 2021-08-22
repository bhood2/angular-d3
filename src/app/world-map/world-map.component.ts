import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as t from 'topojson-client';
import { FeatureCollection } from 'geojson';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorldMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const mapDiv = document.getElementById('worldMap');
    const width = mapDiv.clientWidth;
    const height = mapDiv.clientHeight;
    const scale = width / 6.295;
    const projection = d3.geoMercator().translate([width / 2, height / 2]).scale(scale).center([0, 30]);
    // geoConicEqualArea(); geoNaturalEarth1();
    const svg = d3.select('#worldMap').append('svg')
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('preserveAspectRatio', 'xMidYMid meet');
    const path = d3.geoPath().projection(projection);
    const g = svg.append('g');
    g.attr('class', 'map');

    d3.json('../../assets/json/countries-10m.json').then((topo) => {
      const mapFeatures: FeatureCollection = t.feature(topo, topo.objects.land) as any as FeatureCollection;
      g.selectAll('path')
        .data(mapFeatures.features)
        .enter()
        .append('path')
        .attr('d', path);
      g.append('path')
        .datum(t.mesh(topo, topo.objects.countries, (a, b) => a !== b))
        .attr('d', path)
        .attr('class', 'countryBorder');
    });
  }

}
