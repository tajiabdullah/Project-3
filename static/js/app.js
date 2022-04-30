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
		    tickcolor:"#000",
		    tickfont:{
		    	family:"'Barlow Condensed' , 'sans-serif'",
		    	size:'18',
		    	color:"#000",
		    },
		    title:"Happiness Rank",
		    titlefont:{
		    	family:"'Barlow Condensed' , 'sans-serif'",
		    	size:'20',
		    	color: '#000',
		    },
		    titleside:"right",
		    outlinewidth:"1",
		    outlinecolor:'#000',
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


function barchart(data1){
let countries = [];
	let happinessRank = [];
	let happinessScore = [];

	for (let i=0; i < data1.length; i++) {

		countries.push(data1[i]["Country"])
		happinessRank.push(data1[i]["Rank"])
		happinessScore.push(data1[i]["Score"])
	}


	var data = [ 	
		{
		  x: countries.slice(0,10),
		  y: happinessScore.slice(0,10),
		  type: 'bar'
		}
	  ]
	  Plotly.newPlot('barchart', data);
	}

function bubbleChart(data2){
      // Create a bubble chart that displays each sample.
      // 1. Use otu_ids for the x values.
      // 2. Use sample_values for the y values.
      // 3. Use sample_values for the marker size.
      // 4. Use otu_ids for the marker colors.
      // 5. Use otu_labels for the text values

      // Create the trace for the bubble chart

	  let countries = [];
	  let happinessScore = [];
	  let happinessRank = [];
	  let gdp = [];
	  let regions = [];
	  let lifeExpectancy = [];
	  let freedom =[];
  
	  for (let i=0; i < data2.length; i++) {
  
		  countries.push(data2[i]["Country"])
		  happinessScore.push(data2[i]["Score"])
		  happinessRank.push(data2[i]["Rank"])
		  gdp.push(data2[i]["GDP per Capita"])
		  regions.push(data2[i]["Region"])
		  lifeExpectancy.push(data2[i]["Healthy Life Expectancy"])
		  freedom.push(data2[i]["Freedom of Choice"] * 50)
	  }
	  console.log(happinessScore.slice(1,20).concat(happinessScore.slice(130,150)))

	  myColors = []
	  for (let i  = 0; i <= 39; i++){

		if(i<10){
			myColors.push('rgb(255, 144, 14)')

		}else if(i<=20){
			myColors.push('rgb(255, 65, 54)')
		}else if(i<=30){
			myColors.push('rgb(44, 160, 101)')
		}else if(i<=39){
			myColors.push('rgb(93, 164, 214)')
		}
	  }
      var trace2 = {
		x : happinessScore.slice(1,20).concat(happinessScore.slice(130,149)),
		y : gdp.slice(1,20).concat(gdp.slice(130,149)),
		text : countries.slice(1,20).concat(countries.slice(130,149)),
		mode : 'markers',
		marker : {
			color : myColors,
			size : freedom

		}   
	};

	// Create the layout for the bubble chart
	var layout2 = {
		title: '<b>Bubble Chart</b>',
		automargin: true,
		autosize: true,
		showlegend: false,
		 height: 500,
		 width: 1000,
		margin: {
			l: 150,
			r: 50,
			b: 50,
			t: 50,
			pad: 4
		  }
	};

	// Plot the new bubble chart using Plotly
	var data2 = [trace2];
	var config = {responsive:true}
	Plotly.newPlot('bubble', data2,layout2,config)
};


d3.json("http://localhost:5000/get_data").then(function(data){
	drawGlobe(data)
	barchart(data)
	bubbleChart(data);
})
