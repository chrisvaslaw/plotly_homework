function charts (input_id) {

    // Load data from samples json
    d3.json("./samples.json").then(function(sampleData) {
        console.log(sampleData);
        // save the data into a variable
        var chart_data = sampleData.samples;
        
         // filter the data to for the input id
        var dataId = chart_data.filter(d => d.id == input_id);

         // get the first array of ids
        var ids = dataId[0].otu_ids;
        var labels = dataId[0].otu_labels;
        var values = dataId[0].sample_values;

         // create y values by slicing IDs and mapping to OTU and reversing
        var yValues = ids.slice(0, 10).map(d => "OTU" + d).reverse()

        // create x values by slicing values and reversing
        var xValues = values.slice(0, 10).reverse()

        // create text values by slicing labels and reversing
        var text = labels.slice(0, 10).reverse();

        // create traces and layout for horizontal bar_chart
        var dataTrace_chart = {
          x: xValues,     
          y: yValues,    
          text: text,   
          type: "bar", 
          orientation: "h" 
        };

        var chart_layout = {
            title: "Bacteria Levels"
          };
        
        var chart_data = [dataTrace_chart];
        
        // plot bar_chart
        Plotly.newPlot("bar", chart_data, chart_layout);

        // create traces and layout for bubble_chart
        var dataTrace_bubble = {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
              size: values,
              color: ids,
              colorscale: "Electric"
            }
          }

        var bubble_layout = {
            title: "Sample Bacteria Cultures",
            margin: {
              t: 30
            },
            hovermode: "closest",
            xaxis: {
              title: "ID"
            }
          }

        var bubble_data = [dataTrace_bubble]

        // plot bubble_chart
        Plotly.newPlot("bubble", bubble_data, bubble_layout);
        });
      }

function optionChanged (input_id) {

    // Load data from samples json
    d3.json("./samples.json").then(function(sampleData) {

        // save the data into a variable
        var drop_down_data = sampleData.names; 

        // select and then populate the drop_down menu
        drop_down_data.forEach((name) => {
            d3.select("#selDataset")
            .append("option")
            .text(name)
            .property("value", name);
          });
          //select one by default
          charts(input_id);
          demographics(input_id);
        });
      };

function vizualization_select(userInput) {
    // allow user to select chart type
    charts(userInput);

    // select div with panel body class
    var panelBody = d3.select(".panel-body");

    //clear panel body after change of input
    panelBody.html("");
    demoInfo(userInput);

    // default function so a chart is always displayed
    drop_down_default();
  };

function demographics(input_id) {  

   // Load data from samples json
   d3.json("./samples.json").then(function(sampleData) { 

    // select for metadata
    var demo_data = sampleData.metadata;

    // filter for input id
    var dataId = demo_data.filter(d => d.id == input_id);
    var result = dataId[0];
    html = d3.select("#sample-metadata");
    html.html("");
    Object.entries(result).forEach(([key, value]) => {
        html.append("p").text(`${key}:${value}`)    });
        render_gauge(result.wfreq);
    });

};

function drop_down_default() {

    // Load data from samples json
    d3.json("./samples.json").then(function(sampleData) { 

        // allow user to filter by name
        var default_data = sampleData.names;

         // select and then populate the drop_down menu
         default_data.forEach((name) => {
             d3.select("#selDataset")
               .append("option")
               .text(name)
               .property("value", name);    
            });

        //select either the charts or demographic informatio by default
        charts(default_data[0]);
        demographics(default_data[0]);
      
    });
  };
  
  // charts(input_id);
  drop_down_default();



