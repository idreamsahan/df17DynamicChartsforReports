({
    getData : function(cmp, helper) {
        	
    		//Set report name 
    		cmp.set('v.name', 'Expenditure Report');

    		var dataCategories = ['1-2016','2-2016','3-2016','4-2016','5-2016','6-2016','7-2016','8-2016','92016','10-2016','11-2016','12-2016'];
            var costValues = [30000, 10000, 45000, 65000,30000, 40000, 25000, 95000,30000, 10000, 75000, 55000,];

            var costChart1 = new Highcharts.Chart('chart-container1', {
							        chart: {
                                        marginTop: 20,
							            type: 'column',
							            width:1100,
                                        events:{
                                            click:function(e){
                                                if (e.xAxis[0].value < 0) {
                                                    helper.barClick(cmp,dataCategories[0]);
                                                }else{
                                                    helper.barClick(cmp,dataCategories[Math.round(e.xAxis[0].value)]);
                                                }
                                            }
                                        }
							        },
							        title: {
								        style: {
								            display: 'none'
								        }
								    },
							        xAxis: {
										categories: dataCategories ,
										title: {
									        text: ''
									    },
									    labels: {
									        style: {
                                                fontSize:'12px'
                                            }
									    }
									},
									tooltip: {
								        style: {
								            display: 'none'
								        }
								    },
									yAxis: {
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
										name: '',
										cursor: 'pointer',
										
										//Pass the values through chartValues attribute
										data: costValues ,
										showInLegend: false,
                                        minPointLength:2
									}],
									colors: ['#148ed8' ],
                                    navigation: {
                                        buttonOptions: {
                                            enabled: false
                                        }
                                    },
                                    credits: {
                                        enabled: false
                                    }
							    });
              
                console.log(costChart1);
          
    },
    downloadReport : function(component, helper){
    	
    	//Get SVG element and then serialize it to convert to a stream of String
        var svg = document.getElementById('chart-container1').childNodes[0].childNodes[0];
        var serializer = new XMLSerializer();
        var svgString = serializer.serializeToString(svg);
        var canvas = document.getElementById("chartimgCanvas1");
        var render_width = 1000;
        var render_height = 600;

        //CHange/Set Canvas width/height attributes to reset origin-clean flag
        canvas.height = render_height;
        canvas.width = render_width;

        //Use canvg library to parse SVG and draw the image on given canvas
        canvg(canvas, svgString, {
            useCORS: true,
            scaleWidth: render_width,
            scaleHeight: render_height,
            ignoreDimensions: true,
            log: true
        });

        //Convert canvas to png formated dataURL and save the body of it
        var rawImage = canvas.toDataURL("image/png");
        var dataArray = rawImage.split(',');            
        component.set('v.base64',dataArray[1]);
        console.log(rawImage);
        this.generateReport(component);

    },

    generateReport : function(component){
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
                console.log(result);                
            }
            else {
                console.log('ERROR: ', response.getError());
            }
        });
        $A.enqueueAction(action);
    } 
})