({
    doInit : function(component, event, helper) {
        helper.getData(component,helper);
    },
    download : function(component, event, helper) {
    	helper.downloadReport(component,event,helper);
    }
    
})