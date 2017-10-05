({
    doInit : function(component, event, helper) {
        component.set('v.body', []);
        component.set('v.selectedReport', 'report1');

    },
    setSelectedReport : function(component, event, helper) {
        
        component.set('v.selectedReport', event.currentTarget.id);
        console.log(component.get('v.selectedReport'));
    },
    generate : function(component,event){

    	//hide exiating markup
    	document.getElementById('report').style.display = "none";


    	var selected = component.get('v.selectedReport');
    	var reportcmp = '';

    	if(selected == 'report1'){
    		reportcmp = 'c:ccReport1';
    	}else if(selected == 'report2'){
    		reportcmp = 'c:ccReport2';
    	}else if(selected == 'report3'){
    		reportcmp = 'c:ccReport3';
    	}

	   $A.createComponent(
	        reportcmp,
	        '',
	        function(newComponent){
	            if (component.isValid()) {
	                component.set('v.body', [newComponent]);
	            }
	        }
	    );
		
    }
})