/**********************************************************************
 Name: ccSObjectsSelector
======================================================
Description: Abstract class for all the selectors
***********************************************************************/
public abstract class ccSObjectsSelector 
{
	//Implement this method to inform the base class of the SObject (custom or standard) to be queried    
    abstract Schema.SObjectType getSObjectType();

    //Method to return the name of the specified sobject
    @TestVisible
    protected String getSObjectName()
    {
    	return getSObjectType().getDescribe().getName(); 
    }

	//Constructor
	public ccSObjectsSelector()	{}

	//Public property to define the fields to be returned (defined as strings)
	public List<String> sObjectFieldStringList {private get; set;}			

	//Method to create the select string of the query
	protected String getSelectString()
	{
		Map<String, Schema.SobjectField> allFields = getSObjectType().getDescribe().fields.getMap();

		//A list of fields (strings) has been defined, so append the strings and return the string
		if(sObjectFieldStringList != null && !sObjectFieldStringList.isEmpty())
		{
			return String.join(sObjectFieldStringList, ', ');
		} //Otherwise only return the Id
		else return 'Id';
	}	

	//Public property to define the fields to sort on (defined as strings)
	public List<String> orderByFieldList {get; set;}	

	//Method to return the order by string
	protected String getOrderByString()
	{
		//The order by string has been defined
		if(orderByFieldList!= null && !orderByFieldList.isEmpty())
		{		
			//Return the formatted string
			return String.format('ORDER BY {0}', new List<String> { String.join(orderByFieldList, ', ') });	
		}
		return '';
	}	

    //Public property to define the fields to be returned (defined as strings)
    public List<String> groupByFieldList {get; set;}    

    //Method to return the group by string
    protected String getGroupByString()
    {
        //The order by string has been defined
        if(groupByFieldList!= null && !groupByFieldList.isEmpty())
        {       
            //Return the formatted string
            return String.format('GROUP BY {0}', new List<String> { String.join(groupByFieldList, ', ') }); 
        }
        return '';
    }
  

}