export default function About() {
  return (
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="styles.css" />
    </head>

  <body>
    <div id="page-container">
      <div id="content-wrap">
        <h2><u>Frequently Asked Questions</u></h2>
        <br/>
        <br/>
        <h6>What is DocDefender?</h6>
        <p>DocDefender is a fast and reliable encrypyion service that uses RSA
        and AES methods to provide a high degree of efficacy and reliability.</p>
        <br/>
        <br/>
        <h6>Does DocDefender cost anything?</h6>
        <p>No! DocDefender is a free to use file encryption system.</p>
        <br/>
        <br/>
        <h6>Can I encrypt any file?</h6>
        <p>Currently, DocDefender supports the encryption of documents and images.
        Supported image formats include .pdf, .jpeg, .jpg and .png.
        </p>
        <br/>
        <br/>
        <h6>Will my files be saved/stored when I upload them?</h6>
        <p>We value the privacy of our users. As such, all files uploaded to
        DocDefender are encrypted but not saved.
        </p>
        <br/>
        <br/>
        <h6>Am I the only one able to see my encrypted files?</h6>
        <p>Yes! Once a file is encrypted, only the user and others that the user
        has given permissions to may view the contents the file. DocDefender
        staff will not be able to see the contents of encrypted files.
        </p>
        <br/>
        <br/>
        <h6><a href = "mailto: docdefender@gmail.com">Contact Us!</a></h6>
        <p>For any inquiries, suggestions or support questions,
        click the link above!
        </p>
      </div>
      <footer id="footer">
        &#169;DocDefender 2022
      </footer>
    </div>
  </body>
  </html>
  );
}