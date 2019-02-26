// Global variables defined outside of this script file to avoid the code editor reporting undefined variables.
/* global Chart */

const colorPalette = [
  /* from colorbrewer2.org */
  'rgb(179,0,0)',
  'rgb(227,74,51)',
  'rgb(252,141,89)',
  'rgb(253,204,138)',
  'rgb(254,240,217)'
];

function colorOpacity( color, opacity ){
  /* A helper function that takes an rgb color and adds opacity to it. */
  opacity = opacity || 0.5 /* If no value is passed to the function, 0.5 will be used as a default value. */;
  return color.replace('rgb', 'rgba').replace(')', ',' + opacity + ')');
}

/* Objects holding the data. */

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

const permitsByCountry = [
  {
    "country": "USA 🇺🇸",
    "permits": 40125
  },
  {
    "country": "UK 🇬🇧",
    "permits": 10
  },
  {
    "country": "Japan 🇯🇵",
    "permits": 8
  },
  {
    "country": "France 🇫🇷",
    "permits": 7
  },
  {
    "country": "Panama 🇵🇦",
    "permits": 7
  },
  {
    "country": "Canada 🇨🇦",
    "permits": 6
  },
  {
    "country": "Australia 🇦🇺",
    "permits": 5
  },
  {
    "country": "Netherlands 🇳🇱",
    "permits": 3
  },
  {
    "country": "Germany 🇩🇪",
    "permits": 1
  }
];

/* Extracting data and labels. */

const boroughLabels = permitsByBorough.map(  function(  dataPoint  ){
  return dataPoint.borough;
} );

const permitsByBoroughData = permitsByBorough.map(  function(  dataPoint  ){
  return dataPoint.permits;
}  );

const permitsByYearLabels = permitsByYear.map(  function(  dataPoint  ){
  return dataPoint.year;
}  );

const permitsByYearData = permitsByYear.map(  function(  dataPoint  ){
  return dataPoint.permits;
}  );

const permitsByTypeLabels = permitsByType.map(  function(  dataPoint  ){
  return dataPoint.type;
}  );

const permitsByTypeData = permitsByType.map(  function(  dataPoint  ){
  return dataPoint.permits;
}  );

const permitsByCountryLabels = permitsByCountry.map(  function(  dataPoint  ){
  return dataPoint.country;
}  );

const permitsByCountryData = permitsByCountry.map(  function(  dataPoint  ){
  return dataPoint.permits;
}  );

/* Inserting charts. */

const permitsByBoroughPie = document.getElementById( 'permits-by-borough-pie-chart' ).getContext( '2d' );
const permitsByBoroughPieChart = new Chart( permitsByBoroughPie, {
  type: 'pie',
  data: {
    labels: boroughLabels,
    datasets: [{
      data: permitsByBoroughData,
      backgroundColor: colorPalette.map( function( color ){
        return colorOpacity( color );
      } ),
      borderColor: colorPalette[1],
      borderWidth: 1
    }]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function( tooltipItem, data ) {
          var value = permitsByBorough[tooltipItem.index].permits;
          value = value.toString();
          value = value.split( /(?=(?:...)*$)/ );
          value = value.join( ',' );
          return permitsByBorough[tooltipItem.index].borough +  ': ' + value + ' permits';
        }
      }
    }
  }  
} );

const permitsByYearElement = document.getElementById( 'permits-by-year' ).getContext( '2d' );
const permitsByYearChart = new Chart( permitsByYearElement, {
  type: 'line',
  data: {
    labels: permitsByYearLabels,
    datasets: [{
      label: 'Permits issued',      
      data: permitsByYearData,
      backgroundColor: colorOpacity( colorPalette[1] ),
      borderColor: colorPalette[1],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true,
          userCallback: function( value, index, values ) {
              value = value.toString();
              value = value.split( /(?=(?:...)*$)/ );
              value = value.join( ',' );
              return value;
          }
          
        }
      }]
    },    
    tooltips: {
      callbacks: {
        label: function( tooltipItem, data ) {
          var value = permitsByYear[tooltipItem.index].permits;
          value = value.toString();
          value = value.split( /(?=(?:...)*$)/ );
          value = value.join( ',' );
          return value + ' permits';
        }
      }
    }
  }  
} );

const permitsByTypeElement = document.getElementById( 'permits-by-type' ).getContext( '2d' );
const permitsByTypeChart = new Chart( permitsByTypeElement, {
  type: 'bar',
  data: {
    labels: permitsByTypeLabels,
    datasets: [{
      label: 'Permits issued',      
      data: permitsByTypeData,
      backgroundColor: colorOpacity( colorPalette[1] ),
      borderColor: colorPalette[1],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      xAxes: [{
          type: 'category',
          ticks: {
            autoSkip: false,
          }
      }],      
      yAxes: [{
        type: 'logarithmic',
        ticks: {
          stepSize: 10000,          
          beginAtZero:true,
          userCallback: function( value, index, values ) {
              value = value.toString();
              value = value.split( /(?=(?:...)*$)/ );
              value = value.join( ',' );
              return value;
          }          
        },
        afterBuildTicks: function( chart ) {    
            chart.ticks = [];
            chart.ticks.push( 100 );
            chart.ticks.push( 200 );
            chart.ticks.push( 500 );
            chart.ticks.push( 2000 );
            chart.ticks.push( 5000 );
            chart.ticks.push( 10000 );
          }
        
      }]
    },    
    tooltips: {
      callbacks: {
        label: function( tooltipItem, data ) {
          var value = permitsByType[tooltipItem.index].permits;
          value = value.toString();
          value = value.split( /(?=(?:...)*$)/ );
          value = value.join( ',' );
          return value + ' permits';
        }
      }
    }
  }  
} );

const permitsByCountryElement = document.getElementById( 'permits-by-country' ).getContext( '2d' );
const permitsByCountryChart = new Chart( permitsByCountryElement, {
  type: 'bar',
  data: {
    labels: permitsByCountryLabels,
    datasets: [{
      label: 'Permits issued',      
      data: permitsByCountryData,
      backgroundColor: colorOpacity( colorPalette[1] ),
      borderColor: colorPalette[1],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      xAxes: [{
          type: 'category',
          ticks: {
            autoSkip: false,
          }
      }],      
      yAxes: [{
        type: 'logarithmic',
        ticks: {
          stepSize: 10000,          
          beginAtZero:true,
          userCallback: function( value, index, values ) {
              value = value.toString();
              value = value.split( /(?=(?:...)*$)/ );
              value = value.join( ',' );
              return value;
          }          
        },
        afterBuildTicks: function( chart ) {    
            chart.ticks = [];
            chart.ticks.push( 1 );
            chart.ticks.push( 10 );
            chart.ticks.push( 1000 );
            chart.ticks.push( 40000 );
          }
      }]
    },    
    tooltips: {
      callbacks: {
        label: function( tooltipItem, data ) {
          var value = permitsByCountry[tooltipItem.index].permits;
          value = value.toString();
          value = value.split( /(?=(?:...)*$)/ );
          value = value.join( ',' );
          return value + ' permits';
        }
      }
    }
  }  
} );

/* Clicking on a section title scrolls the section into view and updates the URL linking directly to the section */

const sectionHeaders = document.getElementsByTagName( 'h2' );

for (  let sectionHeaderIndex = 0; sectionHeaderIndex < sectionHeaders.length; sectionHeaderIndex++  ){
  sectionHeaders[sectionHeaderIndex].onclick = function(  ev  ){
    try{
      ev.target.scrollIntoView( {
        behavior: 'smooth',
        block: 'start',
        inline: 'start'        
      } );
      if (window.history.replaceState) {
         window.history.replaceState( null, null, '#' + ev.target.id );
      }
    } catch( err ){ /* noop */ }
  }
}

var logScaleNotes = document.getElementsByClassName( 'note-log-scale' );

for ( let i = 0; i < logScaleNotes.length; i++ ){
  logScaleNotes[i].style.display = 'initial';
}

let canvasCharts = document.querySelectorAll('.chart-container canvas');

for ( let i = 0; i < canvasCharts.length; i++ ){
  let fallbackContent = canvasCharts[i].textContent;
  let currentLabel = canvasCharts[i].getAttribute( 'aria-label' );
  canvasCharts[i].setAttribute( 'aria-label',  `${ currentLabel }: ${ fallbackContent }` );
}

