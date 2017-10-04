({
    getData : function(cmp, helper) {
        
    		var dataCategories = ['1-2016','2-2016','3-2016','4-2016','5-2016','6-2016','7-2016','8-2016','92016','10-2016','11-2016','12-2016'];
            var costValues = [30000, 10000, 45000, 65000,30000, 40000, 25000, 95000,30000, 10000, 75000, 55000,];

            var costChart = new Highcharts.Chart('chart-container', {
							        chart: {
                                        marginTop: 20,
							            type: 'column',
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
									colors: ['#4e92c1','#2d354c' ],
                                    navigation: {
                                        buttonOptions: {
                                            enabled: false
                                        }
                                    },
                                    credits: {
                                        enabled: false
                                    }
							    });
              
                
          
    }   
})