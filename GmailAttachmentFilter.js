// Get data on what types of details you want to filter and output results to a doc or spreadsheet




function doGet()
{
  var ss = SpreadsheetApp.getActiveSheet();
  var range = ss.getRange("B2:B3");
  var patterns = range.getValues();
  Logger.clear();

  getDateToday();
  for(var i = 0; i < patterns.length; i++)
  {
    Logger.log("For pattern " + patterns[i]);
    getEmail(patterns[i]);
  }
  
}


function getEmail(pattern)
{
  
  //get unread emails from PMs and filter for word count
  var threads = GmailApp.search(pattern, 0, 50);
  Logger.log(threads.length)
  for (var i = 0; i < threads.length; i++) 
  {
    
       Logger.log(threads[i].getFirstMessageSubject()); // List the relevant thread
   
      var messages = threads[i].getMessages();
     
      var body = messages[0].getBody();
    Logger.log("Testing regex for comma between numbers:") + Logger.log(body.match(/\d?,?\d+\s(words)/gi)); // this works!!!!
        Logger.log(body.match(/wc\W+\d+/gi)); //assumes "wc" | "word" | "word count" then numbers 
        Logger.log(body.match(/(wordcount)\W+\d+/gi));//assumes "wordcount: #"
        Logger.log(body.match(/\d+\s?words/gi));//assumes " # words " or " # [string] words" 
        Logger.log(body.match(/(deadline)/gi)); // catches dates of deadlines later
      getJobAttachment(messages[0]);

      }
        
    //readAttachment
    //readAttachmentend
    
    //readAttachmentTitle
    //readAttachmentTitleEnd
    
    //getAttachmentTitleWebsite
    //getAttachmentTitleWebsiteend
    
        

     
}

        //getJobAttachment
//
function getJobAttachment(themessage)
{
        var attachments = themessage.getAttachments();
        for (var j=0; j<attachments.length; j++)
        if (attachments[j] != undefined)
        {
          Logger.log(attachments[j].getContentType());
          getAttachmentToDrive(attachments[j]);
         
        }
}
    //getJobAttachment end



//getAttachmenttoDrive

    function getAttachmentToDrive(theblob)
{
     var folders = DriveApp.getFoldersByName("TPT-PD");
     while (folders.hasNext())
     {
      var folder = folders.next();
      Logger.log(folder.getName());
     }

  
     var file = folder.createFile(theblob.getName(),theblob); //must adjust to ge the actual attachment
  
//getAttachmenttoDrive end
   
  
}

    //getAttachmentToDrive
 
  
function getDateToday()
{

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'/'+dd+'/'+yyyy;
Logger.log(today);
}
