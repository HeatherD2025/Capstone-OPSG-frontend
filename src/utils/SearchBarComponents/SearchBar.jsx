import React from "react";
import Form from "react-bootstrap/Form";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search by name or email",
}) => {
  return (
    <Form.Control
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mb-3"
    />
  );
};

export default SearchBar;
