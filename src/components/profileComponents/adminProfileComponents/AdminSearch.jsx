import { useEffect, useState } from "react";
import AdminNav from "../../navigations/AdminNav";
import {
  Card,
  Row,
  Col,
  Alert,
  Spinner,
  Container,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";
import Footer from "../../Footer";
import {
  useSearchUsersQuery,
  useGetAllUsersQuery,
} from "../../../features/api/adminApi";
import "../../../styles/app.css";

export default function AdminSearch({ onSelectUser }) {
  const navigate = useNavigate();

  const [term, setTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [error, setError] = useState("");

  // fetch all users on inital load
  const {
    data: allUsers,
    isLoading: loadingAllUsers,
    error: allUsersError,
  } = useGetAllUsersQuery();

  console.log(data);

  const {
    data: searchedUsers,
    isLoading: loadingSearch,
    error: searchError,
  } = useSearchUsersQuery(term, {
    skip: !triggerSearch,
  });

  const filteredUsers = searchedUsers.data?.results.filter((a) => 
    a.data?.toLowerCase.includes(term),
  ) ?? [];


  const handleSearch = () => {
    if (!term.trim()) {
      alert("Enter a search term");
      return;
    } 
    if (filteredUsers.length === 0) {
    setTriggerSearch([]);
    setError("No matching users found");
    return;
  }
    setTriggerSearch(true);
  };

  useEffect(() => {
    handleSearch();
  }, [term, searchedUsers.data]);

  const handleShowAll = () => {
    setTerm("");
    setTriggerSearch(false);
  };

  const loading = loadingAllUsers;
  const usersToShow = triggerSearch ? searchedUsers : allUsers;

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
                  className="submit-btn-custom"
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
                    className="submit-btn-custom"
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
            {allUsersError && (
              <Alert variant="danger">Failed to load users</Alert>
            )}
            {searchError && <Alert variant="danger">Search failed</Alert>}

            {/* Users List */}
            <Row xs={1} md={2} lg={3} className="g-4">
              {loading ? (
                // <Col>
                <Spinner animation="border" role="status" />
              ) : // </Col>
              !usersToShow || usersToShow.length === 0 ? (
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
                        <Card.Text className="text-center">
                          {user.email}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <ReactiveButton
                          rounded
                          buttonState="idle"
                          idleText={"VIEW PROFILE"}
                          variant="secondary"
                          className="btn-primary-soft"
                          type="button"
                          onClick={() => onSelectUser(user)}
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
