// let the editor know that `Chart` is defined by some code
// included in another file (in this case, `index.html`)
// Note: the code will still work without this line, but without it you
// will see an error in the editor
/* global Chart */

// create an object with world population data
const data = [
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

// create an array of continents to use as labels for the charts
const boroughs = data.map( function( dataPoint ){
  return dataPoint.borough;
} );

const permits = data.map( function( dataPoint ){
  return dataPoint.permits;
} );

const bar = document.getElementById('barChart').getContext('2d');
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
          var value = data.datasets[0].data[tooltipItem.index];
          value = value.toString();
          value = value.split(/(?=(?:...)*$)/);
          value = value.join(',');
          return value;
        }
      }
    }
  }
});

// initialize a chart and put it in the 'pieChart' div
const pie = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pie, {
  type: 'pie', // make it a pie chart
  data: {
    labels: boroughs, // use the array of continents to label each 
    datasets: [{
      data: permits, // use the array of populations to draw pie slices
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
    // the y-axis should start at 0
    // scales: {
    //   yAxes: [{
    //     ticks: {
    //       beginAtZero:true,
    //       userCallback: function(value, index, values) {
    //           value = value.toString();
    //           value = value.split(/(?=(?:...)*$)/);
    //           value = value.join(',');
    //           return value;
    //       }
    //     }
    //   }]
    // },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var value = data.datasets[0].data[tooltipItem.index];
          value = value.toString();
          value = value.split(/(?=(?:...)*$)/);
          value = value.join(',');
          return value;
        }
      }
    }
  }  
});