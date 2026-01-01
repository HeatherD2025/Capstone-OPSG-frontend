import ProfileHeader from "../ProfileHeader.jsx";
import UserNav from "../../navigations/UserNav.jsx";
import "../../../styles/userElements/userDashboard.css";
import useCompanyName from "../../qbComponentsAndHooks/useCompanyName.js";

export default function UserInvoice() {
  // const { authenticated } = useContext(userContext);
  const { company, isLoading, error } = useCompanyName();

  if (isLoading) return <p>Loading user invoice...</p>;
  if (error) return <p>Error loading user invoice. Please try again later.</p>;

  const streetAddress = company?.streetAddress || "123 Main St, Detroit, MI";
  const phoneNumber = company?.phoneNumber || "555 687-9344";
  const email = company?.email || "demo@example.com"

  return (
    <>
      <div className="dashboard-wrapper">
        <ProfileHeader />
        <UserNav />
      </div>

      <div className="invoiceContainer">
        <div className="card-header bg-black"></div>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <i className="far fa-building text-danger fa-6x float-start"></i>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <ul className="list-unstyled float-end">
                  <li
                    style={{
                      fontSize: "30px",
                      color: "red",
                    }}
                  >
                    {company?.name || "Demo Company"}
                  </li>
                  <li>{streetAddress}</li>
                  <li>{phoneNumber}</li>
                  <li>{email}</li>
                </ul>
              </div>
            </div>

            <div className="row text-center">
              <h3
                className="text-uppercase text-center mt-3"
                style={{ fontSize: "40px" }}
              >
                Invoice
              </h3>
              <p>123456789</p>
            </div>

            <div className="row mx-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ASC certification</td>
                    <td>
                      <i className="fas fa-dollar-sign"></i> 850.00
                    </td>
                  </tr>
                  <tr>
                    <td>SAM renewal</td>
                    <td>
                      <i className="fas fa-dollar-sign"></i> 300.00
                    </td>
                  </tr>
                  <tr>
                    <td>Q3 sanitation check</td>
                    <td>
                      <i className="fas fa-dollar-sign"></i> 500.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-xl-8">
                <ul className="list-unstyled float-end me-0">
                  <li>
                    {/* <span className="me-3 float-start">
                      Total Amount: {company.balanceValue}
                    </span> */}
                    <i className="fas fa-dollar-sign"></i>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-8" style={{ marginLeft: "60px" }}>
                <p
                  className="float-end"
                  style={{
                    fontSize: "30px",
                    color: "red",
                    fontWeight: "400",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  Total:
                  <span>
                    <i className="fas fa-dollar-sign"></i> 1,650.00
                  </span>
                </p>
              </div>
            </div>

            <div className="row mt-2 mb-5">
              <p className="fw-bold">
                Date: <span className="text-muted">November 23rd, 2025</span>
              </p>
              <p className="fw-bold mt-3">Signature:</p>
            </div>
          </div>
        </div>
        <div className="card-footer bg-black"></div>
      </div>
    </>
  );
}
