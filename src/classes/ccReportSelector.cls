/**********************************************************************
 Name: ccReportSelector
======================================================
Description: Class build queries on the Report Directory object
***********************************************************************/
public without sharing class ccReportSelector extends ccSObjectsSelector{

	//Implementation of the abstract method to define the object to query on
	private Schema.SObjectType getSObjectType()
	{
		return Report_Directory__c.sObjectType;
	}

	//Constructor
	public ccReportSelector() {}

	//SELECTORS
    //Get the parameters via the id
    public List<Report_Directory__c> selectById(Set<Id> reportId)
    {
        soqlQuery = String.format(
                'SELECT {0} ' +
                        'FROM {1} ' +
                        'WHERE {3} ' +
                        '{2} ',
                new List<String> {
                        getSelectString(),
                        getSObjectName(),
                        getOrderByString(),
                        'Id IN: reportId'
                });
        System.debug('reportId : ' + reportId);
        System.debug('soqlQuery : ' + soqlQuery);
        return Database.query(soqlQuery);
    }
}