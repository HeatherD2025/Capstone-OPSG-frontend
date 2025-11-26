// import React, { useState } from "react";
// import SearchBar from "./SearchBar";
// import { getToken } from "../../utils/tokenService";
// import { Card, Row, Col } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import ReactiveButton from "reactive-button";

// export default function UserSearch({
//   showAllUsers = false,
//   onSearch = () => {},
//   onShowAll = () => {},
// }) {
//   const navigate = useNavigate();
//   const [term, setTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     onSearch(term);
//     const token = getToken();
//     if (!token) {
//       console.error("No token found");
//       return;
//     }

//     if (!term.trim()) {
//       alert("Please enter a search term");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const url = `https://opsg-backend.onrender.com/admin/search?term=${encodeURIComponent(
//         term
//       )}`;

//       const response = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const data = await response.json();
//       setResults(data.data || []);

//       if (onSearch) onSearch();
//     } catch (error) {
//       console.error("Search failed:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleShowAll = () => {
//     setResults([]);
//     setTerm("");
//     setError(null);
//     if (onShowAll) onShowAll();
//   };

//   return (
//     <div>
//       <SearchBar
//         value={term}
//         onChange={(e) => setTerm(e.target.value)}
//         placeholder="Search by name or email"
//       />
//       <Row className="g-2 mb-3">
//         <Col xs="auto">
//           <ReactiveButton
//             rounded
//             buttonState={loading ? "loading" : "idle"}
//             idleText={"SEARCH"}
//             loadingText={"Loading"}
//             variant="secondary"
//             className="button3"
//             type="button"
//             onClick={handleSearch}
//             style={{
//               width: "80px",
//               fontSize: "12px",
//               backgroundColor: "#558e89",
//               marginBottom: "10px",
//             }}
//           />
//         </Col>
//         {!showAllUsers && results.length > 0 && (
//           <Col xs="auto">
//             <ReactiveButton
//               onClick={onShowAll}
//               rounded
//               className="button3"
//               variant="secondary"
//               idleText="SHOW ALL USERS"
//               type="button"
//               style={{
//                 marginRight: "5px",
//                 width: "140px",
//                 fontSize: "12px",
//                 backgroundColor: "#558e89",
//               }}
//             />
//           </Col>
//         )}
//       </Row>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {!results.length > 0 && (
//         <Row xs={1} md={2} lg={3} className="g-4" style={{ marginTop: "5px" }}>
//           {/* {results.length === 0 ? (
//             <Col>
//               <p>No users found.</p>
//             </Col>
//           ) : ( */}
//           {results.map((user) => (
//             <Col key={user.id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title className="text-center">
//                     {user.firstName} {user.lastName}
//                   </Card.Title>
//                   <Card.Text className="text-center">({user.email})</Card.Text>
//                 </Card.Body>
//                 <Card.Footer className="text-center">
//                   <ReactiveButton
//                     rounded
//                     buttonState={loading ? "loading" : "idle"}
//                     idleText={"VIEW PROFILE"}
//                     loadingText={"Loading"}
//                     variant="secondary"
//                     className="button3"
//                     type="button"
//                     onClick={() => navigate(`user/${user.id}`)}
//                     style={{
//                       width: "160px",
//                       fontSize: "12px",
//                       backgroundColor: "#558e89",
//                     }}
//                   ></ReactiveButton>
//                 </Card.Footer>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// }

// // import React, { useState } from "react";
// // import SearchBar from "./SearchBar";
// // import { getToken } from "../../utils/tokenService";
// // import { Card, Row, Col } from "react-bootstrap";
// // import { Link, useNavigate } from "react-router-dom";
// // import ReactiveButton from "reactive-button";

// // export default function UserSearch({
// //   showAllUsers = false,
// //   onSearch = () => {},
// //   onShowAll = () => {},
// // }) {
// //   const navigate = useNavigate();
// //   const [term, setTerm] = useState("");
// //   const [results, setResults] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const handleSearch = async () => {
// //     onSearch(term);
// //     console.log("Search term triggered", term);

// //     const token = getToken();
// //     if (!token) {
// //       console.error("No token found");
// //       return;
// //     }

// //     if (!term.trim()) {
// //       alert("Please enter a search term");
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const url = `https://opsg-backend.onrender.com/admin/search?term=${encodeURIComponent(
// //         term
// //       )}`;

// //       const response = await fetch(url, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Server error: ${response.status}`);
// //       }

// //       const data = await response.json();

// //       setResults(data.data || []);
// //       if (onSearch) onSearch();
// //     } catch (error) {
// //       console.error("Search failed:", error);
// //       setError(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <SearchBar
// //         value={term}
// //         onChange={(e) => setTerm(e.target.value)}
// //         placeholder="Search by name or email"
// //       />
// //       <Row className="g-2 mb-3">
// //         <Col xs="auto">
// //           <ReactiveButton
// //             rounded
// //             buttonState={loading ? "loading" : "idle"}
// //             idleText={"SEARCH"}
// //             loadingText={"Loading"}
// //             variant="secondary"
// //             className="button3"
// //             type="button"
// //             onClick={handleSearch}
// //             style={{
// //               width: "80px",
// //               fontSize: "12px",
// //               backgroundColor: "#558e89",
// //               marginBottom: "10px",
// //             }}
// //           />
// //         </Col>
// //         {!showAllUsers && (
// //           <Col xs="auto">
// //             <ReactiveButton
// //               onClick={onShowAll}
// //               rounded
// //               className="button3"
// //               variant="secondary"
// //               idleText="SHOW ALL USERS"
// //               type="button"
// //               style={{
// //                 marginRight: "5px",
// //                 width: "140px",
// //                 fontSize: "12px",
// //                 backgroundColor: "#558e89",
// //               }}
// //             />
// //           </Col>
// //         )}
// //       </Row>

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {!showAllUsers && (
// //         <Row xs={1} md={2} lg={3} className="g-4" style={{ marginTop: "5px" }}>
// //           {results.length === 0 ? (
// //             <Col>
// //               <p>No users found.</p>
// //             </Col>
// //           ) : (
// //             results.map((user) => (
// //               <Col key={user.id}>
// //                 <Card>
// //                   <Card.Body>
// //                     <Card.Title className="text-center">
// //                       {user.firstName} {user.lastName}
// //                     </Card.Title>
// //                     <Card.Text className="text-center">
// //                       ({user.email})
// //                     </Card.Text>
// //                   </Card.Body>
// //                   <Card.Footer className="text-center">
// //                     <ReactiveButton
// //                       rounded
// //                       buttonState={loading ? "loading" : "idle"}
// //                       idleText={"VIEW PROFILE"}
// //                       loadingText={"Loading"}
// //                       variant="secondary"
// //                       className="button3"
// //                       type="button"
// //                       onClick={() => navigate(`user/${user.id}`)}
// //                       style={{
// //                         width: "160px",
// //                         fontSize: "12px",
// //                         backgroundColor: "#558e89",
// //                       }}
// //                     ></ReactiveButton>
// //                   </Card.Footer>
// //                 </Card>
// //               </Col>
// //             ))
// //           )}
// //         </Row>
// //       )}
// //     </div>
// //   );
// // }
