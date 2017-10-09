/**********************************************************************
 Name: public class ccDownloadReportCTRL
======================================================
Description: Controller for Expenditure report - Sample Report 1
***********************************************************************/
public class ccDownloadReportCTRL{

    @auraEnabled
    public static String getDownloadReport(String selectedReport, String imgData, String name){
    	
    	// create new Kcol report Object from the reportparameters and the type
        Id reportId = ccReportService.createReport(selectedReport, name);

        //Method to create a chart attachment to include in the PDF
        ccReportService.createChartAttachment(reportId, imgData);             

        //future methode to generate the report asynchronous + send the email when it is a scheduled report
        ccReportService.createDownloadableReport(reportId);

        //return the KCOL report Id
        return reportId;
    }

}