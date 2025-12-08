import React, {useState } from "react";
// // import UserSearch from "../../../utils/searchBarComponents/UserSearch";
// import { getToken } from "../../utils/tokenService";
import AdminNav from "../../../components/navigations/AdminNav";
import { Card, Row, Col, Alert, Spinner, Container } from "react-bootstrap";
// import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";
import Footer from "../../../utils/footer";
import {
  useSearchUsersQuery,
  useGetAllUsersQuery,
} from "../../../features/api/adminApi"

export default function AdminSearch() {

  const navigate = useNavigate();

  const [term, setTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

// fetch all users on inital load
const {
  data: allUsers,
  isLoading: loadingAllUsers,
  error: allUsersError, 
} = useGetAllUsersQuery();

const {
  data: searchedUsers,
  isLoading: loadingSearch,
  error: searchError,
} = useSearchUsersQuery(term, {
  skip: !triggerSearch,
})

const handleSearch = () => {
  if (!term.trim()) {
    alert("Enter a search term");
    return;
  };
  setTriggerSearch(true);
};

const handleShowAll = () => {
  setTerm("");
  setTriggerSearch(false);
};

const loading = loadingAllUsers || loadingSearch;

const usersToShow = triggerSearch 
  ? searchResults?.data 
  : allUsers?.data;


//     const fetchAllUsers = async () => {
//       const token = getToken();
//       if (!token) return;

//       setLoading(true);
//       setError(null);

  return (
     <>
      <Container fluid style={{ backgroundColor: "#272932" }}>
        <Row className="g-0">
          <Col xs="auto" style={{ width: "10rem", marginLeft: "2rem" }}>
            <AdminNav />
          </Col>

           <Col style={{ backgroundColor: "#272932", minHeight: "100vh" }}>
             {/* Search bar and buttons */}
             <Row className="mt-3 mb-4">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Search by name or email"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="mb-3"
                />
              </Col>

              <Col xs="auto">
                <ReactiveButton
                  rounded
                  buttonState={loading ? "loading" : "idle"}
                  idleText={"SEARCH"}
                  loadingText={"Loading"}
                  variant="secondary"
                  className="button3"
                  type="button"
                  onClick={handleSearch}
                  style={{
                    width: "80px",
                    fontSize: "12px",
                    backgroundColor: "#558e89",
                    marginBottom: "10px",
                  }}
                />
              </Col>

              {usersToShow?.length > 0 && (
                <Col xs="auto">
                  <ReactiveButton
                    rounded
                    idleText="SHOW ALL USERS"
                    variant="secondary"
                    className="button3"
                    type="button"
                    onClick={handleShowAll}
                    style={{
                      width: "140px",
                      fontSize: "12px",
                      backgroundColor: "#558e89",
                    }}
                  />
                </Col>
              )}
            </Row>

            {/* Error messages */}
            {allUsersError && <Alert variant="danger">Failed to load users</Alert>}
            {searchError && <Alert variant="danger">Search failed</Alert>}
         

            {/* Users List */}
            <Row xs={1} md={2} lg={3} className="g-4">
              {loading ? (
                // <Col>
                  <Spinner animation="border" role="status" />
          
                // </Col>
              ) : !usersToShow || usersToShow.length === 0 ? (
                <Col>
                  <Alert variant="info">No users found.</Alert>
                </Col>
              ) : (
                usersToShow.map((user) => (
                  <Col key={user.id}>
                    <Card>
                      <Card.Body>
                        <Card.Title className="text-center">
                          {user.firstName} {user.lastName}
                        </Card.Title>
                        <Card.Text className="text-center">{user.email}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <ReactiveButton
                          rounded
                          buttonState="idle"
                          idleText={"VIEW PROFILE"}
                          variant="secondary"
                          className="button3"
                          type="button"
                          onClick={() => navigate(`/user/${user.id}`)}
                          style={{
                            width: "160px",
                            fontSize: "12px",
                            backgroundColor: "#558e89",
                          }}
                        />
                      </Card.Footer>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getToken } from "../../../utils/tokenService";
// import AdminNav from "../../../components/navigations/AdminNav";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Spinner,
//   Alert,
//   Form,
// } from "react-bootstrap";
// import ReactiveButton from "reactive-button";
// import Footer from "../../../utils/footer";

// export default function AdminSearch() {
//   const navigate = useNavigate();

//   const [usersArray, setUsersArray] = useState([]);
//   const [term, setTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [searchError, setSearchError] = useState(null);

//   // Fetch all users on mount
//   const fetchAllUsers = async () => {
//     const token = getToken();
//     if (!token) return;

//     setLoading(true);
//     setSearchError(null);

//     try {
//       const url = `https://opsg-backend.onrender.com/admin/users`;
//       const response = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error(`Server error ${response.status}`);

//       const data = await response.json();
//       setUsersArray(data.data || []);
//     } catch (error) {
//       console.error("Failed to load users", error);
//       setSearchError("Failed to load users. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   // Search users by term
//   const handleSearch = async () => {
//     const token = getToken();
//     if (!token) return;

//     if (!term.trim()) {
//       alert("Please enter a search term");
//       return;
//     }

//     setLoading(true);
//     setSearchError(null);

//     try {
//       const url = `https://opsg-backend.onrender.com/admin/search?term=${encodeURIComponent(
//         term
//       )}`;
//       const response = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error(`Server error ${response.status}`);

//       const data = await response.json();
//       setUsersArray(data.data || []);
//     } catch (error) {
//       console.error("Search failed", error);
//       setSearchError("Search failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset to show all users
//   const handleShowAll = () => {
//     setTerm("");
//     setSearchError(null);
//     fetchAllUsers();
//   };

//   return (
//     <>
//       <Container fluid style={{ backgroundColor: "#272932" }}>
//         <Row className="g-0">
//           <Col xs="auto" style={{ width: "10rem", marginLeft: "2rem" }}>
//             <AdminNav />
//           </Col>

//           <Col style={{ backgroundColor: "#272932", minHeight: "100vh" }}>
//             {/* Search bar and buttons */}
//             <Row className="mt-3 mb-4">
//               <Col>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search by name or email"
//                   value={term}
//                   onChange={(e) => setTerm(e.target.value)}
//                   className="mb-3"
//                 />
//               </Col>
//               <Col xs="auto">
//                 <ReactiveButton
//                   rounded
//                   buttonState={loading ? "loading" : "idle"}
//                   idleText={"SEARCH"}
//                   loadingText={"Loading"}
//                   variant="secondary"
//                   className="button3"
//                   type="button"
//                   onClick={handleSearch}
//                   style={{
//                     width: "80px",
//                     fontSize: "12px",
//                     backgroundColor: "#558e89",
//                     marginBottom: "10px",
//                   }}
//                 />
//               </Col>
//               {usersArray.length > 0 && term && (
//                 <Col xs="auto">
//                   <ReactiveButton
//                     rounded
//                     idleText="SHOW ALL USERS"
//                     variant="secondary"
//                     className="button3"
//                     type="button"
//                     onClick={handleShowAll}
//                     style={{
//                       width: "140px",
//                       fontSize: "12px",
//                       backgroundColor: "#558e89",
//                     }}
//                   />
//                 </Col>
//               )}
//             </Row>

//             {/* Error messages */}
//             {searchError && <Alert variant="danger">{searchError}</Alert>}

//             {/* Users List */}
//             <Row xs={1} md={2} lg={3} className="g-4">
//               {loading ? (
//                 <Col>
//                   <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </Spinner>
//                 </Col>
//               ) : usersArray.length === 0 ? (
//                 <Col>
//                   <Alert variant="info">No users found.</Alert>
//                 </Col>
//               ) : (
//                 usersArray.map((user) => (
//                   <Col key={user.id}>
//                     <Card>
//                       <Card.Body>
//                         <Card.Title className="text-center">
//                           {user.firstName} {user.lastName}
//                         </Card.Title>
//                         <Card.Text className="text-center">{user.email}</Card.Text>
//                       </Card.Body>
//                       <Card.Footer className="text-center">
//                         <ReactiveButton
//                           rounded
//                           buttonState="idle"
//                           idleText={"VIEW PROFILE"}
//                           variant="secondary"
//                           className="button3"
//                           type="button"
//                           onClick={() => navigate(`/user/${user.id}`)}
//                           style={{
//                             width: "160px",
//                             fontSize: "12px",
//                             backgroundColor: "#558e89",
//                           }}
//                         />
//                       </Card.Footer>
//                     </Card>
//                   </Col>
//                 ))
//               )}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </>
//   );
// }


