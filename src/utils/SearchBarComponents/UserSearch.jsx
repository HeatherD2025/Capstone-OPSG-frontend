import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { getToken } from "../../utils/tokenService";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactiveButton from "reactive-button";

export default function UserSearch({ showAllUsers, onSearch, onShowAll }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const token = getToken();
    if (!token) {
      console.error("No token found");
      return;
    }
    const url = `https://opsg-backend.onrender.com/auth/user/search?search=${encodeURIComponent(
      term
    )}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.users);
      if (onSearch) onSearch();
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div>
      <SearchBar
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search by name or email"
      />
      <Row className="g-2 mb-3">
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
        {!showAllUsers && (
          <Col xs="auto">
            <ReactiveButton
              onClick={onShowAll}
              rounded
              className="button3"
              variant="secondary"
              idleText="SHOW ALL USERS"
              type="button"
              style={{
                marginRight: "5px",
                width: "140px",
                fontSize: "12px",
                backgroundColor: "#558e89",
              }}
            />
          </Col>
        )}
      </Row>

      {!showAllUsers && (
        <Row xs={1} md={2} lg={3} className="g-4" style={{ marginTop: "5px" }}>
          {results.map((user) => (
            <Col key={user.id}>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                    {user.firstName} {user.lastName}
                  </Card.Title>
                  <Card.Text className="text-center">({user.email})</Card.Text>
                </Card.Body>
                <Card.Footer className="text-center">
                  <ReactiveButton
                    rounded
                    buttonState={loading ? "loading" : "idle"}
                    idleText={"VIEW PROFILE"}
                    loadingText={"Loading"}
                    variant="secondary"
                    className="button3"
                    type="button"
                    onClick={() => navigate(`user/${user.id}`)}
                    style={{
                      width: "160px",
                      fontSize: "12px",
                      backgroundColor: "#558e89",
                    }}
                  ></ReactiveButton>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
