/**********************************************************************
 Name: ccReportService
======================================================
Description: Service class to hold methodes used in reports.
***********************************************************************/
public without sharing class ccReportService
{

    //method to create a new KCOL report record for downloadable reports
    public static Id createReport(String selectedReport, String name){
        Report_Directory__c report = new Report_Directory__c();
        
        report.Type__c = selectedReport;
        report.Name = name;
        report.Status__c = 'Processing';

        insert report;

        return report.Id;
    }


    //Create new attachment for the kcol report to contain the chart
    public static void createChartAttachment(Id reportId, String imgData)
    {
    	System.debug('reportId : ' + reportId);
    	System.debug('imgData : ' + imgData);

        Report_Directory__c report;
        //get the Parameters from the KCOl report record
        ccReportSelector reportSelector = new ccReportSelector();
        reportSelector.sObjectFieldStringList = new List<String>{'Type__c','Name'};
        List<Report_Directory__c> lsreport = reportSelector.selectById(new Set<Id>{reportId});
        report = lsreport[0];
      
        //Create an Attachment for Chart Image
        imgData = imgData.substring(imgData.indexOf(',')+1,imgData.length());
        blob fileContent = EncodingUtil.base64Decode(imgData);

        //Create attachment with ImgData
        Attachment chartImg = new Attachment();
        chartImg.ParentId = reportId;
        chartImg.ContentType = 'image/png';
        chartImg.name = reportId+ 'chart' + '.png';
        chartImg.body = fileContent;

        insert chartImg;
        
    }


    @future(Callout = True)
    public static void createDownloadableReport(Id reportId){

        Report_Directory__c report;

        Attachment att = new Attachment();

        //get the Parameters from the KCOl report record
        ccReportSelector reportSelector = new ccReportSelector();
        reportSelector.sObjectFieldStringList = new List<String>{
                'Type__c','Name', 'Status__c'
        };
        List<Report_Directory__c> lsreport = reportSelector.selectById(new Set<Id>{reportId});
        report = lsreport[0];


        //Create PDF report
        Blob pdfbody;
        PageReference pdf = page.ccReport;
        pdf.getParameters().put('id',reportId);

        //Try to get the content of the pagereference
        try
        {
            pdfbody = pdf.getContentAsPDF();
        }
        catch (VisualforceException e)
        {
            pdfbody = Blob.valueOf('There was an error during generation of the pdf file');
        }

        //insert the attachment 
        att.body = pdfbody;
        att.name = report.Name + '.pdf';
        att.ContentType = 'application/pdf';
        att.ParentId = reportId;
        insert att;

        //Delete Image attachment after creating the report
        ccAttachmentsSelector chartSelector = new ccAttachmentsSelector();
        chartSelector.sObjectFieldStringList = new List<String>{'Id'};
        List<Attachment> lscharts = chartSelector.selectByName(reportId+ 'chart' + '.png');
        if( lscharts != null && lscharts.size() > 0 )
        {
            //Use the dml service to do the permission checks and the delete operation
            ccSObjectsDMLService dmlService = new ccSObjectsDMLService();
            dmlService.deleteSObjects(lscharts);
        }
        

        //update the report object
        report.Status__c = 'Done';
        update report;

    }


}