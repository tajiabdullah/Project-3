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
		    	size:'18',
		    	color:"#000",
		    },
		    title:"Happiness Rank",
		    titlefont:{
		    	size:'20',
		    	color: '#000',
		    },
		    titleside:"right",
		    outlinewidth:"1",
		    outlinecolor:'#000',
	    }
    
    }];

    var layoutGlobe = {
    	title:`<b>Our Happy Planet</b>`,
    	titlefont:{
	    	size:'20',
	    	color:"#000",
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
		  x: countries.slice(0,20),
		  y: happinessScore.slice(0,20),
		  name: '<b>Top 20 Happiest Countries in 2021</b>',
		  type: 'bar'
		}
	  ]
	
	  var layout = {
		  title: '<b>Top 20 Happiest Countries in 2021</b>',
		  yaxis: {
			title: 'Happiness Score'

		  }
	  }
	
	  Plotly.newPlot('barchart', data, layout);
	}
	d3.selectAll("#countries").on("change", updatebarchart);	
function updatebarchart(){
	var dropdownMenu = d3.select("#countries");
  // Assign the value of the dropdown menu option to a variable
  var countryName = dropdownMenu.property("value");
console.log(countryName)
	d3.json("http://localhost:5000/get_data").then(function(data){
		function selectCountry(c) {
			console.log(countryName)
			return c["Region"] == countryName;
		  }
		  
		  // filter() uses the custom function as its argument
		  let filteredData = data.filter(selectCountry);
		  
		
			let countries = [];
				let happinessRank = [];
				let happinessScore = [];
			
				for (let i=0; i < filteredData.length; i++) {
			
					countries.push(filteredData[i]["Country"])
					happinessRank.push(filteredData[i]["Rank"])
					happinessScore.push(filteredData[i]["Score"])
				}
				Plotly.restyle("barchart", "x", [countries]);
				Plotly.restyle("barchart", "y", [happinessScore]);
			  
	})
}

function barchart2(data10){
		let countries = [];
		let happinessRank = [];
		let happinessScore = [];
		
			for (let i=0; i < data10.length; i++) {
		
				countries.push(data10[i]["Country"])
				happinessRank.push(data10[i]["Rank"])
				happinessScore.push(data10[i]["Score"])
			}
		
		
			var data10 = [ 	
				{
				  x: countries.slice(129,149),
				  y: happinessScore.slice(129,149),
				  name: '<b>Top 20 Least Happiest Countries in 2021</b>',
				  type: 'bar'
				}
			  ]
			
			  var layout10 = {
				  title: '<b>Top 20 Least Happiest Countries in 2021</b>',
				  yaxis: {
					title: 'Happiness Score'
		
				  }
			  }
			
			  Plotly.newPlot('barchart2', data10, layout10);
			}

function bubbleChart(data2){

	  let countries = [];
	  let happinessScore = [];
	  let happinessRank = [];
	  let gdp = [];
	  let regions = [];
	  let lifeExpectancy = [];
	  let freedom =[];
  
	  for (let i=0; i < data2.length; i++) {
  
		  countries.push(data2[i]["Country"])
		  happinessScore.push(data2[i]["Score"] *5)
		  happinessRank.push(data2[i]["Rank"])
		  gdp.push(data2[i]["GDP per Capita"])
		  regions.push(data2[i]["Region"])
		  lifeExpectancy.push(data2[i]["Healthy Life Expectancy"])
		  freedom.push(data2[i]["Freedom of Choice"])
	  }
	  console.log(happinessScore.slice(1,20).concat(happinessScore.slice(130,150)))

	  myColors = []
	  for (let i  = 0; i <= 39; i++){

		if(i<10){
			myColors.push('rgb(44, 160, 101)')
		}else if(i<=20){
			myColors.push('rgb(93, 164, 214)')
		}else if(i<=30){
			myColors.push('rgb(255, 144, 14)')
		}else if(i<=39){
			myColors.push('rgb(255, 65, 54)')
		}
	  }
      var trace2 = {
		x : lifeExpectancy.slice(1,20).concat(lifeExpectancy.slice(130,149)),
		y : gdp.slice(1,20).concat(gdp.slice(130,149)),
		text : countries.slice(1,20).concat(countries.slice(130,149)),
		mode : 'markers',
		marker : {
			color : myColors,
			size : happinessScore

		}   
	};

	var layout2 = {
		title: '<b>GDP Per Capita v. Life Expectancy, 2021</b>',
		yaxis: {
			title: "GDP per Capita in billions"
		},
		xaxis: {
			title: "Life Expectancy in years"
		},
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



	var data2 = [trace2];
	var config = {responsive:true}
	Plotly.newPlot('bubble', data2,layout2,config)
};

function bubbleChart2(data3){

	let countries = [];
	let happinessScore = [];
	let happinessRank = [];
	let regions = [];
	let perception = [];
	let freedom =[];

	for (let i=0; i < data3.length; i++) {

		countries.push(data3[i]["Country"])
		happinessScore.push(data3[i]["Score"] *5)
		happinessRank.push(data3[i]["Rank"])
		regions.push(data3[i]["Region"])
		perception.push(data3[i]["Perception of Corruption"])
		freedom.push(data3[i]["Freedom of Choice"])
	}
	console.log(happinessScore.slice(1,20).concat(happinessScore.slice(130,150)))

	myColors = []
	for (let i  = 0; i <= 39; i++){

		if(i<10){
			myColors.push('rgb(44, 160, 101)')
		}else if(i<=20){
			myColors.push('rgb(93, 164, 214)')
		}else if(i<=30){
			myColors.push('rgb(255, 144, 14)')
		}else if(i<=39){
			myColors.push('rgb(255, 65, 54)')
		}
	}
	var trace3 = {
	  x : perception.slice(1,20).concat(perception.slice(130,149)),
	  y : freedom.slice(1,20).concat(freedom.slice(130,149)),
	  text : countries.slice(1,20).concat(countries.slice(130,149)),
	  mode : 'markers',
	  marker : {
		  color : myColors,
		  size : happinessScore

	  }   
  };

  var layout3 = {
	  title: '<b>Freedom of Choice v. Perception of Corruption, 2021</b>',
	  yaxis: {
		  title: "Freedom of Choice"
	  },
	  xaxis: {
		  title: "Perception of Corruption"
	  },
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



  var data3 = [trace3];
  var config = {responsive:true}
  Plotly.newPlot('bubble2', data3, layout3,config)
};

function bubbleChart3(data4){

	let countries = [];
	let happinessScore = [];
	let happinessRank = [];
	let regions = [];
	let social = [];
	let generosity =[];

	for (let i=0; i < data4.length; i++) {

		countries.push(data4[i]["Country"])
		happinessScore.push(data4[i]["Score"] *5)
		happinessRank.push(data4[i]["Rank"])
		regions.push(data4[i]["Region"])
		social.push(data4[i]["Social Support"])
		generosity.push(data4[i]["Generosity"])
	}
	console.log(happinessScore.slice(1,20).concat(happinessScore.slice(130,150)))

	myColors = []
	for (let i  = 0; i <= 39; i++){

		if(i<10){
			myColors.push('rgb(44, 160, 101)')
		}else if(i<=20){
			myColors.push('rgb(93, 164, 214)')
		}else if(i<=30){
			myColors.push('rgb(255, 144, 14)')
		}else if(i<=39){
			myColors.push('rgb(255, 65, 54)')
		}
	}
	var trace4 = {
	  x : generosity.slice(1,20).concat(generosity.slice(130,149)),
	  y : social.slice(1,20).concat(social.slice(130,149)),
	  text : countries.slice(1,20).concat(countries.slice(130,149)),
	  mode : 'markers',
	  marker : {
		  color : myColors,
		  size : happinessScore

	  }   
  };

  var layout4 = {
	  title: '<b>Social Support v. Generosity, 2021</b>',
	  yaxis: {
		  title: "Social Support"
	  },
	  xaxis: {
		  title: "Generosity"
	  },
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



  var data4 = [trace4];
  var config = {responsive:true}
  Plotly.newPlot('bubble3', data4, layout4,config)
};

d3.json("http://localhost:5000/get_data").then(function(data){
	drawGlobe(data)
	barchart(data)
	barchart2(data)
	bubbleChart(data)
	bubbleChart2(data)
	bubbleChart3(data);
})
