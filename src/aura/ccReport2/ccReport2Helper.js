({
    getData : function(cmp, helper) {
        

    	console.log(Highcharts);

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

								            for (i = -99; i <= 0; i += 1) {
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
          
    }   
})