// let the editor know that `Chart` is defined by some code
// included in another file (in this case, `index.html`)
// Note: the code will still work without this line, but without it you
// will see an error in the editor
/* global Chart */

// create data objects
const permitsByBorough = [
  {
    "borough": "Manhattan",
    "permits": 20302
  },
  {
    "borough": "Brooklyn",
    "permits": 12085
  },
  {
    "borough": "Queens",
    "permits": 6201
  },
  {
    "borough": "Bronx",
    "permits": 1083
  },
  {
    "borough": "Staten Island",
    "permits": 501
  }
];

const permitsByYear = [
  { 
    "year": 2012,
    "permits": 6928
  },
  { 
    "year": 2013,
    "permits": 8071
  },
  { 
    "year": 2014,
    "permits": 8002
  },
  { 
    "year": 2015,
    "permits": 8871
  }
];

const permitsByType = [
  {
    "type": "Television",
    "permits": 21175
  },
  {
    "type": "Film",
    "permits": 7282
  },
  {
    "type": "Theater",
    "permits": 3660
  },
  {
    "type": "Commercial",
    "permits": 3434
  },
  {
    "type": "Still Photography",
    "permits": 2609
  },
  {
    "type": "WEB",
    "permits": 1388
  },
  {
    "type": "Student",
    "permits": 267
  },
  {
    "type": "Documentary",
    "permits": 205
  },
  {
    "type": "Music Video",
    "permits": 152
  }
];

// create an array of continents to use as labels for the charts
const boroughs = permitsByBorough.map( function( dataPoint ){
  return dataPoint.borough;
} );

const permits = permitsByBorough.map( function( dataPoint ){
  return dataPoint.permits;
} );

const bar = document.getElementById('permits-by-borough-bar-chart').getContext('2d');
const barChart = new Chart(bar, {
  type: 'bar', // make it a bar chart
  data: {
    labels: boroughs,
    datasets: [{
      label: 'Permits issued',
      data: permits, // use the array of permits to draw bars
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // make the bars translucent red
      borderColor: 'rgba(255, 99, 132, 1)', // make the borders of the bars opaque red
      borderWidth: 1 // set the border width to 1 pixel
    }]
  },
  options: {
    // the y-axis should start at 0
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true,
          userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
          }
          
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var value = permitsByBorough.datasets[0].data[tooltipItem.index];
          value = value.toString();
          value = value.split(/(?=(?:...)*$)/);
          value = value.join(',');
          return value;
        }
      }
    }
  }
});

// initialize a chart and put it in the 'permits-by-borough-pie-chart' div
const permitsByBoroughPie = document.getElementById('permits-by-borough-pie-chart').getContext('2d');
const permitsByBoroughPiehart = new Chart(permitsByBoroughPie, {
  type: 'pie', // make it a pie chart
  data: {
    labels: boroughs, // use the array of boroughs to label each 
    datasets: [{
      data: permits, // use the array of boroughs to draw pie slices
      // set each pie slice to a translucent color
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      // set the border of each pie slice to the same color as the background
      // of the slice but opaque
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1 // set border width to 1 pixel
    }]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var value = permitsByBorough[tooltipItem.index].permits;
          value = value.toString();
          value = value.split(/(?=(?:...)*$)/);
          value = value.join(',');
          return value;
        }
      }
    }
  }  
});
