({
	getData : function(component, event) {

		//get report records
        var action = component.get('c.getReportList');  
        action.setCallback(this,function(response) {
            if (response.getState() === 'SUCCESS') {
                var result = response.getReturnValue();
                console.log(result);  
                component.set('v.reportList',result);

                //Check if there is at least one report that is still processing
                var reportsNeedRefresh = [];
                for(var i = 0; i<result.length;i++) {
                    if(result[i].Status__c == 'Processing') {
                        reportsNeedRefresh.push(result[i].Id);
                    }
                }
                console.log('reportsNeedRefresh');
                console.log(reportsNeedRefresh);
                //Get the data again after 30 seconds when there is at least 1 report processing
                var that = this;
                if(reportsNeedRefresh.length > 0) {
                    window.setTimeout(
                        $A.getCallback(function() {
                            that.getData(component,event);
                        }), 5000       
                    );
                }

            }
            else {
                console.log('ERROR: ', response.getError());
            }
        });
        $A.enqueueAction(action);
	},
	cardActiveHelper : function(cmp, ev) {
        //Make hover element visible
        var elem = ev.target;
        var targetElem = null;
        for (var i = 0; i < elem.childNodes.length; i++) {
            if (elem.childNodes[i].className == "hover") {
              targetElem = elem.childNodes[i];
              targetElem.className += ' display-block';
              break;
            }
        }
    },
    deleteReportFile : function(cmp, reportId) {
        //Delete the report file
        var action = cmp.get('c.deleteReportById');
        action.setParams({'reportId' : reportId});
        action.setCallback(this,function(response){
            if (response.getState() === 'SUCCESS') {
                this.getData(cmp);
            }
            else {
                console.log('ERROR: ', response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})