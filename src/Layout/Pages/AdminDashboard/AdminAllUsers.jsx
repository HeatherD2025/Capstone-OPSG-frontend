// import UserSearch from "../../../utils/searchBarComponents/UserSearch";
// import AdminNav from "../../../components/navigations/AdminNav";
// // import SearchBar from "../../../utils/searchBarComponents/SearchBar";
// import { useGetAllUsersQuery } from "../../../features/api/adminApi";
// import { getToken } from "../../../utils/tokenService";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ListGroup,
//   Spinner,
//   Container,
//   Row,
//   Col,
//   Card,
//   Alert,
// } from "react-bootstrap";
// import "../../../styles/adminElements/adminAllUsers.css";
// import ReactiveButton from "reactive-button";
// import Footer from "../../../utils/footer";

// export default function AdminAllUsers() {
//   const navigate = useNavigate();
//   const { data: usersResponse, error, isLoading } = useGetAllUsersQuery();
//   const [usersArray, setUsersArray] = useState([]);

//   // const [term, setTerm] = useState("");
//   // const [searching, setSearching] = useState(false);
//   const [loading, setLoading] = useState(false);
//   // const [searchError, setSearchError] = useState(null);
//   // const [showAllUsers, setShowAllUsers] = useState(true);

//   // extract the array
//   // const usersArray = usersResponse?.data || [];
//   useEffect(() => {
//     if (usersResponse?.data) setUsersArray(usersResponse.data);
//   }, [usersResponse]);

//   const handleSearchResults = (results) => {
//     setUsersArray(results);
//   };

//   //   const token = getToken();
//   // if (!token) return;

//   // if(!term.trim()) {
//   //   alert("Please enter a search term");
//   //   return;
//   // }

//   // setLoading(true);
//   // setSearchError(null);

//   //   try {
//   //     const url = `https://opsg-backend.onrender.com/admin/search?term=${encodeURIComponent(term)}`;
//   //     const response = await fetch(url, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });

//   //     if (!response.ok) throw new Error(`Server error ${response.status}`);

//   //     const data = await response.json();
//   //     setUsersArray(data.data || []);
//   //     setSearching(true);
//   //   } catch (error) {
//   //     console.error("Search failed", error);
//   //     setSearchError("Search failed, please try again");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleShowAll = () => {
//   //   if (usersResponse?.data) {
//   //     setUsersArray(usersResponse.data);
//   //   }
//   //   setSearchError(null);
//   //   // setTerm("");
//   //   // setSearching(false);
//   //   // setSearchError(null);
//   // };
//   const handleShowAll = async () => {
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
//       setUsersArray(data.data || []); // restore full list
//     } catch (error) {
//       console.error("Failed to load all users", error);
//       setSearchError("Failed to load users. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Container fluid style={{ backgroundColor: "#272932" }}>
//         <Row className="g-0">
//           <Col xs="auto" style={{ width: "10rem", marginLeft: "2rem" }}>
//             <AdminNav />
//           </Col>
//           <Col style={{ backgroundColor: "#272932", minHeight: "100vh" }}>
//             <Row className="mt-3 mb-4">
//               <Col>
//                 <UserSearch
//                   showAllUsers={true}
//                   onSearch={handleSearchResults}
//                   onShowAll={handleShowAll}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Col style={{ marginTop: "5px" }}>
//                 {isLoading ? (
//                   <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </Spinner>
//                 ) : usersArray.length === 0 ? (
//                   <Alert variant="info">No users found.</Alert>
//                 ) : (
//                   <Row xs={1} md={2} lg={3} className="g-4">
//                     {usersArray.map((user) => (
//                       <Col key={user.id}>
//                         <Card>
//                           <Card.Body>
//                             <Card.Title className="text-center">
//                               {user.firstName} {user.lastName}
//                             </Card.Title>
//                             <Card.Text className="text-center">
//                               {user.email}
//                             </Card.Text>
//                           </Card.Body>
//                           <Card.Footer className="text-center">
//                              <ReactiveButton
//                               rounded
//                               buttonState="idle"
//                               idleText={"VIEW PROFILE"}
//                               variant="secondary"
//                               className="button3"
//                               type="button"
//                               onClick={() => navigate(`/user/${user.id}`)}
//                               style={{ width: "160px", fontSize: "12px", backgroundColor: "#558e89" }}
//                             /></Card.Footer>
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 )}
//                 {error && <Alert variant="danger">Failed to load users.</Alert>}
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </>
//   );
// }
// //   return (
// //     <>
// //       <Container
// //         fluid
// //         data-bs-theme="dark"
// //         style={{ backgroundColor: "#272932" }}
// //       >
// //         <Row className="g-0">
// //           <Col
// //             xs="auto"
// //             className="flex-shrink-0"
// //             style={{ width: "10rem", marginLeft: "2rem" }}
// //           >
// //             <AdminNav />
// //           </Col>

// //           <Col
// //             data-bs-theme="dark"
// //             className="flex-grow-1"
// //             style={{ backgroundColor: "#272932", minHeight: "100vh" }}
// //           >
// //             <Row className="mt-3 mb-4">
// //               <Col>
// //                 {/* <SearchBar
// //                   value={term}
// //                   onChange={(e) => setTerm(e.target.value)}
// //                   placeholder="Search by email or name"
// //                 /> */}
// //                 <UserSearch
// //                   showAllUsers={true}
// //                   onSearch={handleSearchResults}
// //                   onShowAll={handleShowAll}
// //                 />
// //               </Col>
// //               <Col xs="auto">
// //                 <ReactiveButton
// //                   rounded
// //                   buttonState={loading ? "loading" : "idle"}
// //                   idleText={"SEARCH"}
// //                   loadingText={"Loading"}
// //                   variant="secondary"
// //                   className="button3"
// //                   type="button"
// //                   onClick={handleSearch}
// //                   style={{ width: "80px", fontSize: "12px", backgroundColor: "#558e89", marginBottom: "10px" }}
// //                 />
// //               </Col>
// //               {searching && (
// //                 <Col xs="auto">
// //                   <ReactiveButton
// //                     rounded
// //                     idleText="SHOW ALL USERS"
// //                     variant="secondary"
// //                     className="button3"
// //                     type="button"
// //                     onClick={handleShowAll}
// //                     style={{ width: "140px", fontSize: "12px", backgroundColor: "#558e89" }}
// //                   />
// //                 </Col>
// //               )}
// //             </Row>

// //             {/* Error messages */}
// //             {searchError && <Alert variant="danger">{searchError}</Alert>}
// //             {error && <Alert variant="danger">Failed to load users: {error?.data?.message || error.message}</Alert>}

// //             {/* Users List */}
// //             <Row>
// //               <Col style={{ marginTop: "5px" }}>
// //                 {isLoading ? (
// //                   <Spinner animation="border" role="status">
// //                     <span className="visually-hidden">Loading...</span>
// //                   </Spinner>
// //                 ) : usersArray.length === 0 ? (
// //                   <Alert variant="info">No users found.</Alert>
// //                 ) : (
// //                   <Row xs={1} md={2} lg={3} className="g-4">
// //                     {usersArray.map((user) => (
// //                       <Col key={user.id}>
// //                         <Card>
// //                           <Card.Body>
// //                             <Card.Title className="text-center">{user.firstName} {user.lastName}</Card.Title>
// //                             <Card.Text className="text-center">{user.email}</Card.Text>
// //                           </Card.Body>
// //                           <Card.Footer className="text-center">
// //                             <ReactiveButton
// //                               rounded
// //                               buttonState="idle"
// //                               idleText={"VIEW PROFILE"}
// //                               variant="secondary"
// //                               className="button3"
// //                               type="button"
// //                               onClick={() => navigate(`/user/${user.id}`)}
// //                               style={{ width: "160px", fontSize: "12px", backgroundColor: "#558e89" }}
// //                             />
// //                           </Card.Footer>
// //                         </Card>
// //                       </Col>
// //                     ))}
// //                   </Row>
// //                 )}
// //               </Col>
// //             </Row>
// //           </Col>
// //         </Row>
// //       </Container>
// //       <Footer />
// //     </>
// //   );
// // }
// {
//   /* </Row>
//             {showAllUsers && (
//               <Row>
//                 <Col style={{ marginTop: "5px" }}>
//                   {isLoading ? (
//                     <Spinner animation="border" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </Spinner>
//                     ) : error ? (
//                     <Alert variant="danger">
//                       Error fetching users: {error?.data?.message || error.message || "Unknown error"}
//                     </Alert>
//                   ) : usersArray.length === 0 ? (
//                     <Alert variant="info">No users found.</Alert>
//                   ) : (
//                     <ListGroup>
//                       {usersArray.map((user) => (
//                         <ListGroup.Item
//                           action
//                           href={`/user/${user.id}`}
//                           key={user.id}
//                         >
//                           {user.firstName} {user.lastName} — {user.email}
//                           {user.isAdmin && " (Admin)"}
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   )}
//                 </Col>
//               </Row>
//             )}
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </>
//   );
// }
// //                   ) : error ? (
// //                     <ListGroup>
// //                       {users.map((user) => (
// //                         <ListGroup.Item
// //                           action
// //                           href={`/user/${user.id}`}
// //                           key={user.id}
// //                         >
// //                           {user.firstName} {user.lastName} — {user.email}
// //                         </ListGroup.Item>
// //                       ))}
// //                     </ListGroup>
// //                   )}
// //                 </Col>
// //               </Row>
// //             ) : null}
// //           </Col>
// //         </Row>
// //       </Container>
// //     </>
// //   );
// // } */
// }
