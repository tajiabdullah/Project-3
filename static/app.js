console.log("Welcome")

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


d3.json("http://localhost:5000/world_happiness").then(function(data){
    console.log(data)
/*     console.log(data.Date)
    lineChart(data) */
})