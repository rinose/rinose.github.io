
import Typewriter from 'typewriter-effect/dist/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import mydata from './data.json'

const myimage = new URL("../assets/5239975.png", import.meta.url)


const welcome_message = ['Ciao!', mydata["summary"]];


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
  minRadius: 30,
  downDepth: 1,
  initialDepth: 2,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  centerStrength: 0.5
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
    typewriter.deleteAll(1).typeString(dataItem.dataContext.description).start();
  }
  // remove all listeners
  event.originalEvent.preventDefault();
  return false;
});


// Generate and set data
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Setting_data

let data = {
  "name": "Gennaro Setola",
  "description": "Expert in programming, software development, and teaching in the STEM sector",
  "children": [
    {
      "name": "WEB",
      "value": 40,
      "description": "Expert in modern web development using technologies like HTML, CSS, JavaScript, and Python. Skilled in creating dynamic and responsive websites.",
      "children": [
        {
          "name": "HTML",
          "value": 10
        },
        {
          "name": "CSS",
          "value": 10
        },
        {
          "name": "JS",
          "value": 10
        },
        {
          "name": "PHP",
          "value": 5
        },
        {
          "name": "PYTHON",
          "value": 50
        }
      ]
    },
    {
      "name": "SYS",
      "value": 30,
      "description": "Experienced in working with embedded systems such as Arduino and Raspberry Pi, focusing on hardware integration and programming."
    },
    {
      "name": "CLOUD",
      "value": 30,
      "description": "Proficient in cloud technologies including AWS, Azure, and GCP, with a focus on data management and deployment strategies.",
      "children": [
        {
          "name": "AWS",
          "value": 20
        },
        {
          "name": "AZURE",
          "value": 10
        },
        {
          "name": "GCP",
          "value": 10
        }
      ]
    },
    {
      "name": "DB",
      "value": 40,
      "description": "Experienced in managing relational and non-relational databases, optimizing performance, and ensuring data integrity.",
      "children": [
        {
          "name": "MYSQL",
          "value": 30
        },
        {
          "name": "MONGODB",
          "value": 10
        },
        {
          "name": "POSTGRES",
          "value": 40
        },
        {
          "name": "SQLITE",
          "value": 30
        },
        {
          "name": "ORACLE",
          "value": 20
        }
      ]
    },
    {
      "name": "CODE",
      "value": 50,
      "description": "Advanced proficiency in multiple programming languages, with strong problem-solving skills and software development expertise.",
      "children": [
        {
          "name": "JAVA",
          "value": 20
        },
        {
          "name": "C++",
          "value": 30
        },
        {
          "name": "PYTHON",
          "value": 50
        },
        {
          "name": "SWIFT",
          "value": 10
        },
        {
          "name": "KOTLIN",
          "value": 10
        },
        {
          "name": "GO",
          "value": 10
        }
      ]
    },
    {
      "name": "TEACHING",
      "value": 40,
      "description": "Extensive experience in conducting STEM courses, including programming in Python, AI applications, and robotics, catering to diverse age groups.",
      "children": [
        {
          "name": "STEM Courses",
          "value": 20,
          "description": "Docenza di corsi su Python, intelligenza artificiale e programmazione di robot"
        },
        {
          "name": "Educational Workshops",
          "value": 20,
          "description": "Laboratori pratici con Raspberry Pi, Arduino e progettazione robotica"
        }
      ]
    },
    {
      "name": "EDUCATION",
      "value": 50,
      "description": "Comprehensive academic background in Mathematics and Scientific Computing, complemented by certifications in Python and backend development.",
      "children": [
        {
          "name": "Laurea in Matematica",
          "value": 20,
          "description": "Laurea magistrale presso la Seconda Università degli studi di Napoli"
        },
        {
          "name": "Master in Calcolo Scientifico",
          "value": 20,
          "description": "Master di secondo livello presso l'Università La Sapienza di Roma"
        },
        {
          "name": "Certificazioni Informatiche",
          "value": 10,
          "description": "Certificazioni su Python, database relazionali e sviluppo backend"
        }
      ]
    }
  ]
}

series.nodes.template.setAll({
  toggleKey: "none",
  cursorOverStyle: "default",
  "tooltipText": "{category}"
});



series.data.setAll([data]);
series.set("selectedDataItem", series.dataItems[0]);



// Make stuff animate on load
series.appear(1000, 100);