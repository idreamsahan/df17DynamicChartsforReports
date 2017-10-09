/**********************************************************************
 Name: ccSObjectsDMLService
======================================================
Description: Class to perform the DML statements for all of the objects.
The class will enforce Object and field level security.
***********************************************************************/
public without sharing class ccSObjectsDMLService
{
    
    //Method to perform the delete of the given list of records. The object and field level permissions are being checked.
    public List<Database.DeleteResult> deleteSObjects(List<SObject> lsObjects)
    {
        return Database.delete(lsObjects);
    }
}