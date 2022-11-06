import upload from "./upload.png";
import encrypt from "./encrypt.png";
import view from "./view.png";

export default function Home() {
  return (
    <div id="page-container">
      <header
        style={{
          marginTop: "2%",
        }}
        className="bg-dark py-5"
      >
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2">
                  Welcome to DocDefender.org
                </h1>
                <p className="lead text-white-50 mb-4">
                  Quickly upload, display, and download your very own encrypted
                  files with us. Hosted securely and efficiently using the most
                  powerful servers, your files will always be protected and
                  stored properly.
                </p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  <a
                    className="btn btn-primary btn-lg px-4 me-sm-3"
                    href="#features"
                  >
                    Get Started
                  </a>
                  <a
                    className="btn btn-outline-light btn-lg px-4"
                    style={{ marginLeft: "2%", marginRight: "2%" }}
                    href="/about"
                  >
                    Learn More
                  </a>
                  <a
                    className="btn btn-primary btn-lg px-4 me-sm-3"
                    href="/sign-in"
                  >
                    Register | Login
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="py-5 border-bottom" id="features">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-collection"></i>
              </div>
              <img className="homepage-images" src={upload} alt="" />
              <h2 className="h4 fw-bolder">Secure Upload</h2>
              <p>
                All of our website transmissions are encrypted using our default
                SSL certificate. The transmission of any and all files are
                secured using an encryption algorithm to scramble data in
                transit, which prevents hackers from reading it as it is sent
                over the connection.
              </p>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-building"></i>
              </div>
              <img className="homepage-images" src={encrypt} alt="" />
              <h2 className="h4 fw-bolder">Fast Encryption</h2>
              <p>
                All files uploaded are securely stored in a encrypted storage
                container. Each file is only accessible by its owner and anyone
                else who was granted viewing access. Files can deleted and added
                as needed and/or as often as the user would like.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-toggles2"></i>
              </div>
              <img className="homepage-images" src={view} alt="" />
              <h2 className="h4 fw-bolder">Reliable Access</h2>
              <p>
                All files stored within our site will be accessible to their
                respective owners and authorized members. We guarantee a 99.99%
                uptime and reliable hardware such that you will always be able
                to access your files whenever need be.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-5 border-bottom">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder">Completely Free Service</h2>
            <p className="lead mb-0">With our ultimate servers running 24/7</p>
            <p className="lead mb-0">
              Also with an option to upgrade your storage plans
            </p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6 col-xl-4">
              <div className="card mb-5 mb-xl-0">
                <div className="card-body p-5">
                  <div className="small text-uppercase fw-bold text-muted">
                    Free Member
                  </div>
                  <div className="mb-3">
                    <span className="display-4 fw-bold">$0</span>
                    <span className="text-muted">/ mo.</span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      <strong>10 Files</strong>
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      1GB Storage
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Server-Side Encryption (SSE)
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Addition of "Friends List" functionality
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Dedicated support
                    </li>
                    <li className="text-muted">
                      <i className="bi bi-x"></i>
                      Audit Logs for checking Access
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
              <div className="card mb-5 mb-xl-0">
                <div className="card-body p-5">
                  <div className="small text-uppercase fw-bold">
                    <i className="bi bi-star-fill text-warning"></i>
                    Pro Member
                  </div>
                  <div className="mb-3">
                    <span className="display-4 fw-bold">$5</span>
                    <span className="text-muted">/ mo.</span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      <strong>Unlimited Files</strong>
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Unlimited Storage
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Advanced Server-Side Encryption (A-SSE)
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Addition of "Friends List" functionality
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Can add other members to your friends list for easy
                      sending and receiving
                    </li>
                    <li className="text-muted">
                      <i className="bi bi-x"></i>
                      Complete Audit Log of access checks with additional
                      security features
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 border-bottom">
        <div className="container px-5 my-5 px-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder">Member Testimonials</h2>
            <p className="lead mb-0">Our members love using our application</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="card mb-4">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                    </div>
                    <div className="ms-4">
                      <p className="mb-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus in faucibus sapien, ut varius nisi. Praesent
                        eget mi quis dolor lobortis suscipit. Nam ac mauris et
                        sem rutrum finibus eu eget ante.
                      </p>
                      <div className="small text-muted">
                        - Member Name, WhoIs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="bi bi-chat-right-quote-fill text-primary fs-1"></i>
                    </div>
                    <div className="ms-4">
                      <p className="mb-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus in faucibus sapien, ut varius nisi. Praesent
                        eget mi quis dolor lobortis suscipit. Nam ac mauris et
                        sem rutrum finibus eu eget ante.
                      </p>
                      <div className="small text-muted">
                        - Member Name, WhoIs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-5">
        <div className="container px-5 my-5 px-5">
          <div className="text-center mb-5">
            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
              <i className="bi bi-envelope"></i>
            </div>

            <h2 className="fw-bolder">
              <a style={{ textDecoration: "none" }} href="#contact-us">
                Contact Us
              </a>
            </h2>
            <p className="lead mb-0">We'd love to hear from you</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    data-sb-validations="required"
                  />
                  <label htmlFor="name">Full name</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    A name is required.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    data-sb-validations="required,email"
                  />
                  <label htmlFor="email">Email address</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:required"
                  >
                    An email is required.
                  </div>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="email:email"
                  >
                    Email is not valid.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    data-sb-validations="required"
                  />
                  <label htmlFor="phone">Phone number</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="phone:required"
                  >
                    A phone number is required.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    id="contact-message"
                    className="form-control"
                    placeholder="Enter your message here..."
                    rows="5"
                    cols="50"
                  ></textarea>
                  <label htmlFor="message">Message</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="message:required"
                  >
                    A message is required.
                  </div>
                </div>
                <div className="d-none" id="submitSuccessMessage">
                  <div className="text-center mb-3">
                    <div className="fw-bolder">Form submission successful!</div>
                    To activate this form, sign up at
                    <br />
                    <a href="https://startbootstrap.com/solution/contact-forms">
                      https://startbootstrap.com/solution/contact-forms
                    </a>
                  </div>
                </div>
                <div className="d-none" id="submitErrorMessage">
                  <div className="text-center text-danger mb-3">
                    Error sending message!
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-lg disabled"
                    id="submitButton"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer">&#169;DocDefender 2022</footer>
    </div>
  );
}
