console.log("Welcome")

function drawGlobe(data) {


	let countries = [];
	let happinessRank = [];
	let happinessScore = [];

	for (let i=0; i < data.length; i++) {

		countries.push(data[i]["Country"])
		happinessRank.push(data[i]["Rank"])
		happinessScore.push(data[i]["Score"])
	
	}



	var dataGlobe = [{
	    type: 'choropleth',
	    locationmode: 'country names',
	    locations: countries,
	    z: happinessRank,
	    text: happinessScore,
	    autocolorscale: false,
	    reversescale: true,
	    colorscale: [
		    [0, 'rgb(0, 0, 139)'],
		    [1, 'rgb(144, 238, 144)']
	    ],
	    marker: {
		    line: {
			    color: 'rgb(180,180,180)',
			    width: 1
		    }
	    },
	    colorbar:{
	    	x:'0.8',
		    ticks:"inside",
		    tickwidth:'2',
		    ticklen:"7",
		    tickcolor:"#fff",
		    tickfont:{
		    	family:"'Barlow Condensed' , 'sans-serif'",
		    	size:'18',
		    	color:"#fff",
		    },
		    title:"<b>Happiness Rank</b>",
		    titlefont:{
		    	family:"'Barlow Condensed' , 'sans-serif'",
		    	size:'20',
		    	color:"#fff",
		    },
		    titleside:"right",
		    outlinewidth:"1",
		    outlinecolor:'#fff',
	    }
    
    }];

    var layoutGlobe = {
    	title:`<b>2021</b>`,
    	titlefont:{
    		family:"'Barlow Condensed' , 'sans-serif'",
	    	size:'20',
	    	color:"#fff",
    	},
	    geo: {
		    showocean: true,
		    oceancolor: 'rgba(74,128,245, 0.5)',
		    showlakes: true,
		    lakecolor: 'rgba(74,128,245, 0.5)',
		    showland: true,
		    landcolor: 'rgb(64, 64, 64)',
		    mapframe: false,
    
	    projection: {
		    type: 'orthographic'
	    },
	    bgcolor:"rgba(0,0,0,0)",
	    },
	    paper_bgcolor: 'rgba(0,0,0,0)',
    
    };

    Plotly.newPlot('globe', dataGlobe, layoutGlobe, {showLink: false},{responsive: true});

}

// function radar(data){
// 	var chart_labels = ['Avg GDP per Capita', 'Avg Social Support', 'Avg Life Expectancy', 'Avg Freedom', 'Avg Generosity', 'Avg Perception_of_Corruption'];
// 	var initial_label = ['Western Europe'];

// 	var allBackgroundColor = "rgb(114, 105, 204, 0.3)";
// 	var allBorderColor = "rgb(114, 105, 204, 0.1)";

// 	var radarChart = new Chart(document.getElementById("myChart").getContext('2d'), {
  
// 		type: 'radar',
	  
// 		data: {
// 		  labels: chart_labels,
		  
// 		  datasets: [
// 			{ 
// 			  data: ,
// 			  label: initial_label,
// 			  borderColor: allBorderColor,
// 			  backgroundColor: allBackgroundColor,
// 			  borderWidth: 0,
// 			  pointRadius: 0,
// 			  pointHitRadius: 8,
// 			}
// 		  ]
// 		},
// 		options: {
// 			legend: {
// 			  display: false,
// 			},
// 			responsive: true,
		
// 			scale:{
// 			  ticks: {
// 				beginAtZero: true,
// 				min: 0,
// 				max: 1.6,
// 				backdropColor: '#e9eaea',
// 				backdropPaddingX: 0,
// 				backdropPaddingY: 0,
// 			},
// 			  pointLabels: {
// 				display: true,
// 				fontSize: 10,
// 			  }
// 		  },
		
// 		  tooltips: {
// 			  callbacks: {
// 			   label: function(tooltipItem, data) {
// 							var label = data.datasets[tooltipItem.datasetIndex].label || '';
		
// 							if (label) {
// 								label += ': ';
// 							}
// 							label += Math.round(tooltipItem.yLabel * 1000) / 1000;
// 							return label;
// 				}
// 			  },
// 			  displayColors: false,
// 			},
		
// 		},
		
// 	});
// }

/* function lineChart(data){
    // convert the dictionary to array
    let date = Object.values(data.Date)
    let temp = Object.values(data.Temp)
    let mintemp = Object.values(data.Temp_Min)
    let maxtemp = Object.values(data.Temp_Max)
    // convert the date from unix timestamp to actual date/time
    date = date.map(x=>new Date(x).toLocaleTimeString("en-US"))
    
    let trace1 = {
        x: date,
        y: temp,
        type: 'scatter',
        name: 'temp'
      };
      let trace2 = {
        x: date,
        y: mintemp,
        type: 'scatter',
        name: 'min temp'
      };  let trace3 = {
        x: date,
        y: maxtemp,
        type: 'scatter',
        name: 'max temp'
      };

      
      var data = [trace1,trace2,trace3];
      
      Plotly.newPlot('lineplot', data);
}
 */


d3.json("http://localhost:5000/get_data").then(function(data){
	drawGlobe(data)
/*     console.log(data.Date)
    lineChart(data) */
})

 
// // Call updatePlotly2 and updateDemoInfo functions to change the bar chart, bubble chart, demographic info, and gauge chart upon selection of id in dropdown menu
// function optionChanged(id) {
// 	updatePlotly2(id);
// 	updateDemoInfo(id)
//   };
  
//   // Create init() function so page loads on first dropdown option when going to the html page
//   function init() {
// 	d3.json("samples.json").then((data) => {
// 		// Create array to hold all names (all ID names)
// 		var names = data.samples.map(x=>x.id)
// 		// Append an option in the dropdown for each name in names (each ID name)
// 		names.forEach(function(name) {
// 			d3.select('#selDataset')
// 				.append('option')
// 				.text(name);
// 			});
// 	// Create arrays for sample_values, OTU ids, and OTU labels        
// 	var sample_values = data.samples.map(x=> x.sample_values);
// 	var otu_ids = data.samples.map(x=> x.otu_ids);
// 	var otu_label = data.samples.map(x=> x.otu_labels);
	
// 	// Get the top 10 OTU for the selected ID
// 	var sorted_test = sample_values.sort(function(a, b){return b-a});
// 	var top_ten = sorted_test.map(x => x.slice(0,10));
// 	var sorted_ids = otu_ids.sort(function(a, b){return b-a});
// 	var top_ids = sorted_ids.map(x =>x.slice(0,10));
// 	var sorted_labels = otu_label.sort(function(a, b){return b-a});
// 	var top_labels = sorted_labels.map(x =>x.slice(0,10));
  
// 	// Get the first ID to display on page on load
// 	var firstID = data.metadata[0]// first id
// 	var sampleMetadata1 = d3.select("#sample-metadata").selectAll('h1')
	
// 	//-------------------------------------------------
// 	// Display the first ID's demographic information
// 	var sampleMetadata = sampleMetadata1.data(d3.entries(firstID))
// 	sampleMetadata.enter()
// 					.append('h1')
// 					.merge(sampleMetadata)
// 					.text(d => `${d.key} : ${d.value}`)
// 					.style('font-size','12px')
  
// 	sampleMetadata.exit().remove()
	
// 	//-------------------------------------------------
// 	// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
// 	// 1. Use sample_values as the values for the bar chart
// 	// 2. Use otu_ids as the labels for the bar chart
// 	// 3. Use otu_labels as the hovertext for the chart
  
// 	// Create trace for bar chart
// 	var trace1 = {
// 		x : top_ten[0],
// 		y : top_ids[0].map(x => "OTU" + x),
// 		text : top_labels[0],
// 		type : 'bar',
// 		orientation : 'h',
// 		transforms: [{
// 			type: 'sort',
// 			target: 'y',
// 			order: 'descending'
// 		}]
// 	};
// 	// Create layout for bar chart
// 	var layout1 = {
// 		title : '<b>Top 10 OTU</b>'
// 	};
  
// 	// Create bar chart
// 	var data = [trace1];
// 	var config = {responsive:true}
// 	Plotly.newPlot('bar', data, layout1,config);
  
// 	//-------------------------------------------------
// 	// Create a bubble chart that displays each sample.
// 	// 1. Use otu_ids for the x values.
// 	// 2. Use sample_values for the y values.
// 	// 3. Use sample_values for the marker size.
// 	// 4. Use otu_ids for the marker colors.
// 	// 5. Use otu_labels for the text values
  
// 	// Create the trace for the bubble chart
// 	var trace2 = {
// 		x : otu_ids[0],
// 		y : sample_values[0],
// 		text : otu_label[0],
// 		mode : 'markers',
// 		marker : {
// 			color : otu_ids[0],
// 			size : sample_values[0]
// 		}
// 	};
  
// 	// Create layout for the bubble chart
// 	var layout2 = {
// 		title: '<b>Bubble Chart</b>',
// 		automargin: true,
// 		autosize: true,
// 		showlegend: false,
// 		// height: 500,
// 		// width: 900,
// 			margin: {
// 				l: 150,
// 				r: 50,
// 				b: 50,
// 				t: 50,
// 				pad: 4
// 			  }
// 	};
// 	var config = {responsive:true}
  
// 	// Create the bubble chart
// 	var data2 = [trace2];
// 	Plotly.newPlot('bubble',data2,layout2,config);
  	
  
// 	}); //Ends d3.json
//   }; // Ends init() function
  
  
//   // Call init function so page loads on the first ID selection
//   init();
  
  
//   // Update the bar chart and bubble chart 
//   function updatePlotly2(id) {
// 	d3.json("samples.json").then((data) => {
// 		// Get the sample data for the selected ID in the dropdown menu
// 		var test = data.samples.filter(x => x.id === id);
  
// 		// Get the top 10 sample values
// 		var sample_values = test.map(x => x.sample_values).sort(function(a, b){return b-a});
// 		var top_values = sample_values.map(x => x.slice(0,10));
  
// 		// Get the top ten IDs
// 		var otu_ids = test.map(x=> x.otu_ids).sort(function(a, b){return b-a});
// 		var top_ids = otu_ids.map(x => x.slice(0,10));
  
// 		// Get the top ten labels
// 		var otu_label = test.map(x=> x.otu_labels).sort(function(a, b){return b-a});
// 		var top_labels = otu_label.map(x => x.slice(0,10));
  
// 		//-------------------------------------------------
// 		// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
// 		// 1. Use sample_values as the values for the bar chart
// 		// 2. Use otu_ids as the labels for the bar chart
// 		// 3. Use otu_labels as the hovertext for the chart
  
// 		// Create the trace for the bar chart
// 		var trace = {
// 			x : top_values[0],
// 			y : top_ids[0].map(x => "OTU" + x),
// 			text : top_labels[0],
// 			type : 'bar',
// 			orientation : 'h',
// 			transforms: [{
// 				type: 'sort',
// 				target: 'y',
// 				order: 'descending'
// 			  }]
// 		};
  
// 		// Create the layout for the bar chart
// 		var layout1 = {
// 			title: "<b>Top 10 OTU</b>"
// 		};
// 		var data1 = [trace];
// 		var config = {responsive:true}
  
// 		// Plot the bar chart using Plotly
// 		Plotly.newPlot('bar', data1,layout1,config);
  
// 		//-------------------------------------------------
// 		// Create a bubble chart that displays each sample.
// 		// 1. Use otu_ids for the x values.
// 		// 2. Use sample_values for the y values.
// 		// 3. Use sample_values for the marker size.
// 		// 4. Use otu_ids for the marker colors.
// 		// 5. Use otu_labels for the text values
  
// 		// Create the trace for the bubble chart
// 		var trace2 = {
// 			x : test.map(x=> x.otu_ids)[0],
// 			y : test.map(x => x.sample_values)[0],
// 			text : test.map(x=> x.otu_labels),
// 			mode : 'markers',
// 			marker : {
// 				color : test.map(x=> x.otu_ids)[0],
// 				size : test.map(x => x.sample_values)[0]
// 			}   
// 		};
  
// 		// Create the layout for the bubble chart
// 		var layout2 = {
// 			title: '<b>Bubble Chart</b>',
// 			automargin: true,
// 			autosize: true,
// 			showlegend: false,
// 			// height: 500,
// 			// width: 500,
// 			// width: 900,
// 			margin: {
// 				l: 150,
// 				r: 50,
// 				b: 50,
// 				t: 50,
// 				pad: 4
// 			  }
// 		};
  
// 		// Plot the new bubble chart using Plotly
// 		var data2 = [trace2];
// 		var config = {responsive:true}
// 		Plotly.newPlot('bubble', data2,layout2,config)
// 	});
//   };
  
//   // Update the demographic information and gauge chart when a new ID is selected
//   function updateDemoInfo(id) {
// 	d3.json("samples.json").then((data) => {
  
// 		// Filter for the selected ID
// 		var metadataSamples = data.metadata.filter(x => x.id === +id)[0];
  
// 		// Get the demographic information for the selected ID
// 		var sampleMetadata1 = d3.select("#sample-metadata").selectAll('h1')
// 		var sampleMetadata = sampleMetadata1.data(d3.entries(metadataSamples))
// 		sampleMetadata.enter().append('h1').merge(sampleMetadata).text(d => `${d.key} : ${d.value}`).style('font-size','12px');
  
// 		// Get the wash frequency for the current ID            
// 		var wFreq = metadataSamples.wfreq;
// 		var wFreqDeg = wFreq * 20;
  
// 	});
//   };