/**********************************************************************
 Name: public class ccReportListCTRL
======================================================
Description: Controller for Report List
***********************************************************************/
public with sharing class ccReportListCTRL {
	public ccReportListCTRL() {}

	@auraEnabled
    public static List<Report_Directory__c> getReportList(){
    	
    	// create new Kcol report Object from the reportparameters and the type
        List<Report_Directory__c> reportList = ccReportService.getReports();

        //return the KCOL report Id
        return reportList;
    }

    //Method to delete a generated report by id
    @AuraEnabled
    public static Boolean deleteReportById(Id reportId)
    {
        //Check the delete permissions before doing the delete
        ccSObjectsDMLService dmlService = new ccSObjectsDMLService();

        List<Database.DeleteResult> lsDeleteResults = new List<Database.DeleteResult>();

        lsDeleteResults = dmlService.deleteSObjects(new List<Report_Directory__c> {new Report_Directory__c(Id = reportId)});
       
        Boolean result = false;
        for(Database.DeleteResult deleteResult : lsDeleteResults)
        {
            if(deleteResult.isSuccess())
            {
                result = true;
            }
        }

        return result;
    }

    

}