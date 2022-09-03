// function myFunction() {

// }

function doGet(e) {
  //Displays the text on the webpage.
  const json = {};
  const tweetRows = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("tweets")
    .getDataRange()
    .getValues()
    .slice(1);

  json["tweets"] = tweetRows.map((row) => {
    return {
      id: row[0],
      created_at: row[1],
      text: row[2],
    };
  });

  const emailRows = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("emails")
    .getDataRange()
    .getValues();

  json["emails"] = emailRows ? emailRows.flat() : null;

  return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var emailSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("emails");
  //Parsing the request body
  var body = JSON.parse(e.postData.contents);

  if (body.emails) {
    body.emails.forEach((email) => {
      emailSheet.appendRow([email]);
    });
  } else {
    body.forEach((tweet) => {
      sheet.appendRow([tweet.id, tweet["created_at"], tweet.text]);
    });
  }

  return ContentService.createTextOutput(JSON.stringify({ body })).setMimeType(
    ContentService.MimeType.JSON
  );
}
