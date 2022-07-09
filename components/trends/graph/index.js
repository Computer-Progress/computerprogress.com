// This file must be imported before any other

// Dammit, I should have done all this in another way

import setupCanvas from "./canvas";
import setupControls from "./controls";
import setupUtils from './utils'
import setupPlotter from './plotter'
import setupObjects from './objects'

import buildTrendsGraph from "./graph";
export default function trendsGraph(container) {
  let mlp = { version: "0.1" };
  setupUtils(mlp);
  setupCanvas(mlp);
  setupControls(mlp);
  setupObjects(mlp)
  setupPlotter(mlp)
  console.log(mlp)
  buildTrendsGraph(container, mlp);
}
