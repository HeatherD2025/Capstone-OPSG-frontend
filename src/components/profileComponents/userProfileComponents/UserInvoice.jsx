import { useSelector } from "react-redux";
import ProfileHeader from "../ProfileHeader.jsx";
import UserNav from "./UserNav.jsx";
import "../../../styles/dashboard.css";
import "../../../styles/invoices.css";
import { useBalance } from "../BalanceProvider.jsx";
import useCompanyName from "../../qbComponentsAndHooks/useCompanyName.js";
import Dashboard from "../Dashboard.jsx";
// import { useGetCurrentUserQuery } from "../../../features/api/userApi.js";

export default function UserInvoice() {
  const { balance } = useBalance();
  const { company, companyIsLoading, companyError } = useCompanyName();
  const { user } = useSelector((state) => state.auth);

  // generate random invoice number
  function getRandomInvoiceNum(max) {
    return Math.floor(Math.random() * max);
  }
  const randomInvoiceNumber = getRandomInvoiceNum(5000);

  // generate random invoice date
  // I can generate random numbers for day and month
  function randomDate() {{
    return Date.now() - Math.floor(Math.random() * 10000000000);
  }}

  const randomAmount1 = Math.floor(Math.random() * balance);
  const randomAmount2 = Math.floor(Math.random() * (balance - randomAmount1));
  const randomAmount3 = balance - randomAmount1 - randomAmount2;  

  return (
    <>
      <div className="dashboard dark-theme">
        <ProfileHeader />
         <UserNav />
          <Dashboard />

        <div className="invoice-container">
          <div className="row">
            <div className="col-xl-12">
              <i className="far fa-building fa-6x float-start"></i>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <ul className="list-unstyled float-end">
                <li
                  style={{
                    fontSize: "30px",
                    color: "black",
                  }}
                >
                  {user.company?.name || "Demo Company"}
                </li>
                <li>{user.company?.streetAddress}</li>
                <li>{user.company?.phoneNumber}</li>
                <li>{user.company?.email}</li>
              </ul>
            </div>
          </div>

          <div className="row text-center">
            <h3
              className="text-uppercase text-center mt-3"
              style={{ fontSize: "40px", color: "black" }}
            >
              Invoice
            </h3>
            <p>{randomInvoiceNumber}</p>
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
                    <i className="fas fa-dollar-sign"></i>{randomAmount1}
                  </td>
                </tr>
                <tr>
                  <td>SAM renewal</td>
                  <td>
                    <i className="fas fa-dollar-sign"></i>{randomAmount2}
                  </td>
                </tr>
                <tr>
                  <td>Q3 sanitation check</td>
                  <td>
                    <i className="fas fa-dollar-sign"></i>{randomAmount3}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-xl-8">
              <ul className="list-unstyled float-end me-0">
                <li>
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
                Balance Due:
                <span>
                  <i className="fas fa-dollar-sign"></i>${Number(balance).toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          <div className="row mt-2 mb-5">
            <p className="fw-bold">
              Date: <span className="text-muted">{randomDate}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
