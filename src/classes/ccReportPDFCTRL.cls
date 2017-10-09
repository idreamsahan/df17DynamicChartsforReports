/**********************************************************************
 Name: ccReportPDFCTRL
======================================================
Description: Controller for the report PDF page
***********************************************************************/
public without sharing class ccReportPDFCTRL
{
    public Report_Directory__c report {get;set;}
    public String fileId{get;set;}

    public ccReportPDFCTRL()
    {
        //get the Parameters from the KCOl report record
        ccReportSelector reportSelector = new ccReportSelector();
        reportSelector.sObjectFieldStringList = new List<String>{
                'Id','Type__c', 'Name', 'Status__c','(select Id, Name from attachments)'
        };
        List<Report_Directory__c> lsreport = reportSelector.selectById(new Set<Id>{ApexPages.currentPage().getParameters().get('id')});
        report = lsreport[0];

        List<Attachment> lscharts = report.attachments;
        if( lscharts != null && lscharts.size() > 0 ) {
            for(Attachment att : lscharts){
                if(att.Name == report.Id+'chart'+'.png'){
                fileId = lscharts[0].Id;
                }
            }
        }
    }    
}