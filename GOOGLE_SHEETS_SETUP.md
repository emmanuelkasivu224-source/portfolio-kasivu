# Google Sheet & Email Notification Setup Guide

Follow these quick 5 steps to connect your portfolio contact form to a Google Sheet and automatically receive email notifications whenever a visitor submits a inquiry.

---

## Step 1: Open Google Sheets
1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Title your Google Sheet: `Portfolio Contact Submissions`.
3. In **Row 1**, enter the following headers across columns A to E:
   - `A1`: `Timestamp`
   - `B1`: `Name`
   - `C1`: `Email`
   - `D1`: `Subject`
   - `E1`: `Message`

---

## Step 2: Open Apps Script Editor
1. In the Google Sheet top menu, click **Extensions** > **Apps Script**.
2. Delete any default code inside `Code.gs`.
3. Open the `google-script.gs` file in this repository, copy all the code, and paste it into the Apps Script editor.

---

## Step 3: Deploy as Web App
1. At the top right of the Apps Script window, click **Deploy** > **New deployment**.
2. Click the gear icon next to *Select type* and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Portfolio Contact Form API`
   - **Execute as**: `Me (your email)`
   - **Who has access**: **`Anyone`** *(Crucial step so your website visitors can submit the form)*
4. Click **Deploy**.

---

## Step 4: Authorize Script
1. Google will prompt you to **Authorize access**.
2. Click **Authorize access**, select your Google account.
3. If shown a warning *"Google hasn't verified this app"*, click **Advanced** > **Go to Untitled project (unsafe)**.
4. Click **Allow**.
5. Copy the **Web App URL** generated (it will look like: `https://script.google.com/macros/s/.../exec`).

---

## Step 5: Connect URL to script.js
1. Open `script.js` in your portfolio project folder.
2. Near the top of the contact form script section, locate:
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace `"YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"` with your copied Web App URL!
4. Save `script.js`.

---

## How It Works
- When a user fills out the contact form on your portfolio website and clicks **Send Message**:
  1. The form data is sent to your Google Apps Script Web App URL.
  2. Google Apps Script adds a new row to your `Portfolio Contact Submissions` Google Sheet.
  3. Google automatically sends an instant email notification to `emmanuelkasivu224@gmail.com` with the sender's name, email, subject, and full message!
  4. The sender sees a green success message on your website confirming submission.
