
import Typewriter from 'typewriter-effect/dist/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


new Typewriter('#typewriter', {
  strings: ['Ciao!', 'I\'m Rinos and I\'m a Developer'],
  autoStart: true,
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


// Create wrapper container
let container = root.container.children.push(am5.Container.new(root, {
  width: am5.percent(100),
  height: am5.percent(100),
  layout: root.verticalLayout
}));


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
  centerStrength: 0.5
}));


// Generate and set data
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data

let data = {
  name: "Rinose",
  children: [{
      name: "WEB",
      value: 50,
      children: [{
          name: "HTML",
          value: 10
        },
        {
          name: "CSS",
          value: 10
        },
        {
          name: "JS",
          value: 50
        },
        {
          name: "PHP",
          value: 10
        },
        {
          name: "PYTHON",
          value: 50
        }
      ]
    },
    {
      name: "SYS",
      value: 30
    },
    {
      name: "CLOUD",
      value: 30,
      children: [{
          name: "AWS",
          value: 50
        },
        {
          name: "AZURE",
          value: 10
        },
        {
          name: "GCP",
          value: 50
        }
      ]
    },
    {
      name: "DB",
      value: 30,
      children: [{
          name: "MYSQL",
          value: 50
        },
        {
          name: "MONGODB",
          value: 10
        },
        {
          name: "POSTGRESQL",
          value: 80
        },
        {
          name: "SQLITE",
          value: 50
        },
        {
          name: "ORACLE",
          value: 20
        }
      ]
    },
    {
      name: "CODE",
      value: 50,
      children: [{
          name: "JAVA",
          value: 10
        },
        {
          name: "C++",
          value: 50
        },
        {
          name: "PYTHON",
          value: 50
        },
        {
          name: "SWIFT",
          value: 50
        },
        {
          name: "KOTLIN",
          value: 10
        },
        {
          name: "GO",
          value: 50
        },
      ]
    }
  ]
}


series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]);



// Make stuff animate on load
series.appear(1000, 100);