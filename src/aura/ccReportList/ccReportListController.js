({
	doInit : function(component, event, helper) {
		helper.getData(component,event);
	},
    cardActive : function(component, event, helper) {
        event.stopPropagation();
        helper.cardActiveHelper(component, event);
    },
    deleteReportFile : function(component, event, helper) {
        var reportId = event.currentTarget.id;
        helper.deleteReportFile(component, reportId);
    }
})