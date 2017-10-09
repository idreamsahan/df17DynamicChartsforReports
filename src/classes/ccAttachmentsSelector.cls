/**********************************************************************
 Name: ccAttachmentsSelector
======================================================
Description: Class build queries on the Attachment sobject
***********************************************************************/
public without sharing class ccAttachmentsSelector extends ccSObjectsSelector{

    //Implementation of the abstract method to define the object to query on
    private Schema.SObjectType getSObjectType()
    {
        return Attachment.sObjectType;
    }

    //Constructor
    public ccAttachmentsSelector() {}

    //SELECTORS
    //Get the parameters from Name
    public List<Attachment> selectByName(String attachmentName)
    {
        soqlQuery = String.format(
                'SELECT {0} ' +
                        'FROM {1} ' +
                        'WHERE {3} ' +
                        '{2}',
                new List<String> {
                        getSelectString(),
                        getSObjectName(),
                        getOrderByString(),
                        'Name =: attachmentName'
                });
        return Database.query(soqlQuery);
    }
}