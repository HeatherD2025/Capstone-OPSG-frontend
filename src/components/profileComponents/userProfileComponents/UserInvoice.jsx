import { useMemo } from "react"; // Add this for stable math
import ProfileHeader from "../ProfileHeader.jsx";
import UserNav from "./UserNav.jsx";
import "../../../styles/dashboard.css";
import "../../../styles/invoices.css";
import opsgLogo from "../../../assets/images/opsg-logo.webp";
import { useBalance } from "../BalanceProvider.jsx";
import useCompanyName from "../../qbComponentsAndHooks/useCompanyName.js";
import { Container } from "react-bootstrap";

export default function UserInvoice() {
  const { balance, loading } = useBalance();
  const {
    company,
    isLoading: companyLoading,
    error: companyError,
  } = useCompanyName();

  if (companyLoading)
    return (
      <div className="profile-header">
        <Container className="header-container text-center">
          <p>Loading company info...</p>
        </Container>
      </div>
    );

  if (companyError)
    return (
      <div className="profile-header">
        <Container className="header-container text-center">
          <p>Failed to load company info</p>
        </Container>
      </div>
    );

  const companyName = company?.name || "Your Company";
  const companyStreetAddress = company?.streetAddress || "123 Main St";
  const companyCity = company?.city || "Anytown";
  const companyState = company?.state || "CA";
  const companyZip = company?.zip || "12345";
  // stabilize the Balance
  const safeBalance = balance || 1000;

  // useMemo so the math only happens when the balance actually changes
  const amounts = useMemo(() => {
    const r1 = Math.floor(
      Math.random() * (balance ? balance : safeBalance) * 0.6,
    );
    const r2 = Math.floor(
      Math.random() * (balance ? balance : safeBalance - r1) * 0.5,
    );
    const r3 = (balance ? balance : safeBalance) - r1 - r2;
    return { r1, r2, r3 };
  }, [balance, safeBalance]);

  // stabilize Invoice Details
  const invoiceData = useMemo(
    () => ({
      num: Math.floor(Math.random() * 10000),
      date: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000),
      ).toLocaleDateString(),
    }),
    [],
  ); // Empty dependency means this stays same until page refresh

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // if (loading) return <div>Loading Invoice...</div>;
  console.log("Invoice Render - Company Object:", company);

  return (
    <>
      <div className="dashboard dark-theme">
        <ProfileHeader />
        <UserNav />

        <div className="invoice-container">
          {/* ... Brand Header ... */}
          <div className="logo-wrapper">
            <img
              src={opsgLogo}
              alt="OPSG logo"
              className="opsg-navbar-logo"
            ></img>
            <div>OnPoint</div>
          </div>

          <div className="invoice-header-container">
            <h4 className="text-uppercase mt-3">Invoice</h4>
            <p>#{invoiceData.num}</p>
          </div>

          <div className="user-company-info-container">
            <p>{companyName}</p>
            <p className="invoice-address">{companyStreetAddress}</p>
            <p className="invoice-address">
              {companyCity}, {companyState}
            </p>
            <p className="invoice-address">{companyZip}</p>
            <p className="fw-bold">
              Date: <span>{invoiceData.date}</span>
            </p>
          </div>

          <div className="row">
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
                  <td>{formatter.format(amounts.r1)}</td>
                </tr>
                <tr>
                  <td>SAM renewal</td>
                  <td>{formatter.format(amounts.r2)}</td>
                </tr>
                <tr>
                  <td>Q3 sanitation check</td>
                  <td>{formatter.format(amounts.r3)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="balance-due">
            Balance Due: <span>{formatter.format(safeBalance)}</span>
          </p>
        </div>
      </div>
    </>
  );
}
