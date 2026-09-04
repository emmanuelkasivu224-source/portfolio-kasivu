/**
 * GOOGLE APPS SCRIPT FOR CONTACT FORM INTEGRATION & EMAIL NOTIFICATION
 * 
 * Instructions:
 * 1. Open your Google Sheet (create a blank one if needed).
 * 2. Rename Sheet1 header row (Row 1) to: Timestamp | Name | Email | Subject | Message
 * 3. Click Extensions > Apps Script in the Google Sheet menu bar.
 * 4. Paste this code into Code.gs (replacing existing contents).
 * 5. Update RECIPIENT_EMAIL if needed (default: emmanuelkasivu224@gmail.com).
 * 6. Click Deploy > New deployment.
 * 7. Choose Select type > Web app.
 * 8. Execute as: Me
 * 9. Who has access: Anyone
 * 10. Click Deploy, authorize permissions, and copy the Web App URL!
 * 11. Paste your Web App URL into script.js (GOOGLE_SCRIPT_URL variable).
 */

var RECIPIENT_EMAIL = "emmanuelkasivu224@gmail.com";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    var rawData;
    if (e.postData && e.postData.contents) {
      try {
        rawData = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        rawData = e.parameter;
      }
    } else {
      rawData = e.parameter;
    }

    var timestamp = new Date();
    var name = rawData.name || "N/A";
    var email = rawData.email || "N/A";
    var subject = rawData.subject || "Portfolio Contact Form Inquiry";
    var message = rawData.message || "N/A";

    // 1. Save data to Google Sheet
    sheet.appendRow([timestamp, name, email, subject, message]);

    // 2. Send Email Notification via Google Mail
    var emailSubject = " New Portfolio Contact Message: " + subject;
    var emailBody = "You have received a new contact message from your Portfolio Website!\n\n" +
                    "--------------------------------------------------\n" +
                    " Sender Name: " + name + "\n" +
                    " Sender Email: " + email + "\n" +
                    " Subject: " + subject + "\n" +
                    " Date & Time: " + timestamp.toLocaleString() + "\n" +
                    "--------------------------------------------------\n\n" +
                    "Message:\n" + message + "\n\n" +
                    "--------------------------------------------------\n" +
                    "This message was automatically saved to your Google Sheet.";

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: emailSubject,
      body: emailBody,
      replyTo: email
    });

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "message": "Message sent successfully!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "message": "Google Apps Script Contact Endpoint is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}
