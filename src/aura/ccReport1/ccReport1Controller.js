({
    doInit : function(component, event, helper) {
        /*//Show the loading spinner
        helper.sendToggleLoadingSpinnerEvent(true);*/
        //Get the data
        helper.getData(component,helper);
    },
})