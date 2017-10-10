({
    getData : function(cmp, helper) {
        

    	//Set report name 
    	cmp.set('v.name', 'Real-time Sensor Data Report');

    	var costChart2 =	Highcharts.setOptions({
							global: {
							    useUTC: false
							}
							});
            var costChart2 = new Highcharts.Chart('chart-container2', {
							        chart: {
                                        marginTop: 20,
							            width:1100,
							            type: 'spline',
            							animation: Highcharts.svg,
                                        events: {
								            load: function () {

								                // set up the updating of the chart each second
								                var series = this.series[0];
								                setInterval(function () {
								                    var x = (new Date()).getTime(), // current time
								                        y = Math.round(Math.random() * 100);
								                    series.addPoint([x, y], true, true);
								                }, 1000);
								            }
								        }
							        },
							        global: {
									    useUTC: false
									},
							        
								    tooltip: {
							            formatter: function () {
							                return '<b>' + this.series.name + '</b><br/>' +
							                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
							                    Highcharts.numberFormat(this.y, 0) + ' C';
							            }
							        },

							        title: {
								        style: {
								            display: 'none'
								        }
								    },
								    exporting: {
								        enabled: false
								    },
							        xAxis: {
										title: {
									        text: ''
									    },
									    labels: {
									        style: {
                                                fontSize:'12px'
                                            }
									    }
									},
									series: [{
								        name: 'Thermal Sensor Data',
								        data: (function () {
								            // generate an array of random data
								            var data = [],
								                time = (new Date()).getTime(),
								                i;

								            for (i = -20; i <= 0; i += 1) {
								                data.push([
								                    time + i * 1000,
								                    Math.round(Math.random() * 100)
								                ]);
								            }
								            console.log(data);
								            return data;
								        }())
								    }],
									colors: ['#148ed8' ],
                                   
                                    credits: {
                                        enabled: false
                                    }
							    });
              
                costChart2.setOptions({
							global: {
							    useUTC: false
							}
							});
          
    },
    downloadReport : function(component, helper){
    	console.log('rawImage');
    	//Get SVG element and then serialize it to convert to a stream of String
        var svg = document.getElementById('chart-container2').childNodes[0].childNodes[0];
        var serializer = new XMLSerializer();
        var svgString2 = serializer.serializeToString(svg);
        var canvas2 = document.getElementById("chartimgCanvas2");
        var render_width = 1000;
        var render_height = 600;

        //CHange/Set Canvas width/height attributes to reset origin-clean flag
        canvas2.height = render_height;
        canvas2.width = render_width;

        //Use canvg library to parse SVG and draw the image on given canvas
        canvg(canvas2, svgString2, {
            useCORS: true,
            scaleWidth: render_width,
            scaleHeight: render_height,
            ignoreDimensions: true,
            log: true
        });
        	 console.log(canvas2);	
        //Convert canvas to png formated dataURL and save the body of it
        var rawImage = canvas2.toDataURL("image/png");
        var dataArray = rawImage.split(',');            
        component.set('v.base64',dataArray[1]);
        console.log(rawImage);
        this.generateReport(component);

    },

    generateReport : function(component){
    	console.log('generateReport');
    	//Send data to generate Report
        var action = component.get('c.getDownloadReport');  
        action.setParams({
        	'selectedReport' : component.get('v.selectedReport'), 
        	'imgData' : component.get('v.base64'), 
        	'name' : component.get('v.name')
        });
        action.setCallback(this,function(response) {
            if (response.getState() === 'SUCCESS') {
                var result = response.getReturnValue();
                
                //Navigate to Report Store
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                  "url": "/reportdock"
                });
                urlEvent.fire();                 
            }
            else {
                console.log('ERROR: ', response.getError());
            }
        });
        $A.enqueueAction(action);
    } 
})