export default function About() {
  return (
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="styles.css" />
    </head>

  <body>
    <div id="page-container">
      <div id="content-wrap">
        <h2 style={{'font-family':''}}><u>Frequently Asked Questions</u></h2>
        <br/>
        <br/>
        <div class="row">
          <div class="col-md-4 cssanimation sequence fadeInBottom">
            <div class="card border-info text-white bg-dark mb-3" style={{'max-width': '25rem'}}>
              <div class="card-header fs-5">What is DocDefender?</div>
                <div class="card-body">
                <p class="card-text">DocDefender is a fast and reliable encrypyion service that uses RSA
                and AES methods to provide a high degree of efficacy and reliability.</p>
                </div>
              </div>
            </div>
          <div class="col-md-4 cssanimation sequence fadeInBottom">
            <div class="card border-info text-light bg-secondary mb-3" style={{'max-width': '25rem'}}>
              <div class="card-header fs-5">Does DocDefender cost anything?</div>
                <div class="card-body">
                <p class="card-text">No! DocDefender is a free to use file encryption system.
                No subscriptions or fees are required in order to register or maintain an account
                with us.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 cssanimation sequence fadeInBottom">
            <div class="card border-info text-light bg-dark mb-3" style={{'max-width': '50rem'}}>
              <div class="card-header fs-5">Can I encrypt any file?</div>
                <div class="card-body">
                <p class="card-text">Currently, DocDefender supports the encryption of documents and images.
                Supported image formats include .pdf, .jpeg, .jpg and .png.</p>
                </div>
              </div>
            </div>
          </div>
        <br/>
        <div class="row">
          <div class="col-md-4 cssanimation sequence fadeInBottom">
            <div class="card border-info text-light bg-secondary mb-3" style={{'max-width': '25rem'}}>
              <div class="card-header fs-5">Will my files be saved/stored when I upload them?</div>
                <div class="card-body">
                <p class="card-text">We value the privacy of our users. As such, all files uploaded to
                DocDefender are encrypted but not saved.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 cssanimation sequence fadeInBottom">
            <div class="card border-info text-light bg-dark mb-3" style={{'max-width': '25rem'}}>
              <div class="card-header fs-5">Am I the only one able to see my encrypted files?</div>
                <div class="card-body">
                <p class="card-text">Yes! Once a file is encrypted, only the user and others that the user
                has given permissions to may view the contents of the file. DocDefender
                staff will not be able to see the contents of encrypted files.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 cssanimation sequence fadeInBottom">
            <div class="card border-info text-light bg-secondary mb-3" style={{'max-width': '25rem'}}>
              <div class="card-header fs-5">I need help with my account!</div>
                <div class="card-body">
                <p class="card-text">We're always willing to help! For any questions about
                registration, account settings or terminating an account, send us an email
                using the link below. Users will typically receive a response within a few hours.</p>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class = "row justify-content-center">
          <div class="col-md-4 cssanimation sequence fadeInBottom">
            <div class="card border-info text-dark bg-warning mb-3" style={{'max-width': '25rem'}}>
              <div class="card-header fs-5">
                <a class="btn btn-primary" href="mailto:docdefender@gmail.com">Contact Us!</a>
                </div>
                <div class="card-body">
                <p class="card-text">We'd love to hear from you! For any inquiries or suggestions 
                please click the link above. For support questions, please
                make sure to have your account information ready as we'll need to verify your
                identity before we can proceed.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
        <footer id="footer">
          &#169;DocDefender 2022
        </footer>
      </div>
  </body>
  </html>
  );
}