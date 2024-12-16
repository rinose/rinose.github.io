
import Typewriter from 'typewriter-effect/dist/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import mydata from './data.json'

const myimage = new URL("../assets/5239975.png", import.meta.url)


const welcome_message = ['Ciao!', mydata["summary"], "Click on nodes to learn more!"];


const typewriter = new Typewriter('#typewriter', {
  strings: welcome_message,
  autoStart: true,
  delay: 1,
  deleteSpeed: 1
});


// set chartdiv width and height to 100%
document.getElementById("chartdiv").style.width = "100%";
document.getElementById("chartdiv").style.height = document.documentElement.clientHeight + "px";


/* Chart code */
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
let root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


let zoomableContainer = root.container.children.push(
  am5.ZoomableContainer.new(root, {
    width: am5.p100,
    height: am5.p100,
    wheelable: true,
    pinchZoom: true
  })
);

let zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
  target: zoomableContainer
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
let series = zoomableContainer.contents.children.push(am5hierarchy.ForceDirected.new(root, {
  maskContent:false, //!important with zoomable containers
  singleBranchOnly: false,
  downDepth: 1,
  initialDepth: 2,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  manyBodyStrength: -10,
  centerStrength: 0.8
}));



// Add an image to the root node
series.events.on("datavalidated", function(event) {
  let rootNode = series.dataItems[0];

  if (rootNode) {
    let image = am5.Picture.new(root, {
      width: 100,
      height: 100,
      centerX: am5.p50,
      centerY: am5.p50,
      scale: 1,
      src: myimage, // Replace with the path to your image
    });
    rootNode.get("node").children.push(image);
  }
});

// Add click event listener to nodes
series.nodes.template.events.on("click", function(event) {
  let dataItem = event.target.dataItem;
  console.log(event)
  if (dataItem.dataContext.description) {
    typewriter.deleteAll(1).pasteString(dataItem.dataContext.description).start();
  }
  // remove all listeners
  event.originalEvent.preventDefault();
  return false;
});


// Generate and set data
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data

let data = mydata["curriculum"];

series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default",
  "tooltipText": "{category}"
});


series.labels.template.set("minScale", 0);
series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]);



// Make stuff animate on load
series.appear(1000, 100);