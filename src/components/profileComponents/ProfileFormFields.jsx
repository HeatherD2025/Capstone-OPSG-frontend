  
  import { Col, Row, Form } from "react-bootstrap";
  import ReactiveButton from "reactive-button";

  export default function ProfileFormFields({
    formData,
    setFormData,
    onSubmit,
    onCancel,
    onDelete,
    setShowPwdForm,
    isAdmin,
    userId
  }) {

  return (
    <>
      <div className="rounded shadow edit-profile">
         
              <h6 className="edit-profile-header">Edit Profile</h6>

            <Form onSubmit={onSubmit}>
              {/* Profile block */}
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="firstName">
                      <Form.Label
                      >
                        First Name
                      </Form.Label>
                      <Form.Control
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            firstName: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                      <Form.Label
                      >
                        Last Name
                      </Form.Label>
                      <Form.Control
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            lastName: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} controlId="company">
                      <Form.Label
                      >
                        Company
                      </Form.Label>
                      <Form.Control
                        value={formData.company.name}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            company: {
                              ...f.company,
                              name: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} controlId="streetAddress">
                      <Form.Label>
                        Street Address
                      </Form.Label>
                      <Form.Control
                        value={formData.company.streetAddress}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            company: {
                              ...f.company,
                              streetAddress: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} controlId="city">
                      <Form.Label>
                        City
                      </Form.Label>
                      <Form.Control
                        value={formData.company.city}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            company: {
                              ...f.company,
                              city: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="state">
                      <Form.Label>
                        State
                      </Form.Label>
                      <Form.Control
                        value={formData.company.state}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            company: {
                              ...f.company,
                              state: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="zip">
                      <Form.Label>
                        Zip Code
                      </Form.Label>
                      <Form.Control
                        value={formData.company.zip}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            company: {
                              ...f.company,
                              zip: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} controlId="phoneNumber">
                      <Form.Label>
                        Phone
                      </Form.Label>
                      <Form.Control
                        value={formData.company.phoneNumber}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            company: {
                              ...f.company,
                              phoneNumber: e.target.value,
                            },
                          }))
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Row className="align-items-end mb-3">
                    <Col>
                      <Form.Group controlId="password">
                        <Form.Label>
                          Password
                        </Form.Label>
                        <Form.Control type="password" placeholder="********" readOnly/>
                      </Form.Group>
                    </Col>

                      <Col xs="auto">
                        <ReactiveButton
                          onClick={() => setShowPwdForm(true)}
                          type="button"
                          rounded
                          idleText="Change Password"
                          loadingText="Loading"
                          variant="secondary"
                          className="btn-primary-soft"
                          style={{
                            marginRight: "5px",
                            width: "150px",
                            fontSize: "12px",
                            backgroundColor: "#558e89",
                          }}
                        />
                      </Col>
                  </Row>

                  <div className="d-flex admin-edit-profile-button-container">
                    <ReactiveButton
                      type="submit"
                      rounded
                      idleText="Save Changes"
                      loadingText="Loading"
                      variant="secondary"
                      className="btn-primary-soft"
                      style={{
                        marginRight: "18px",
                        width: "150px",
                        fontSize: "12px",
                        backgroundColor: "#558e89",
                      }}
                    />
                    <ReactiveButton
                    type="button"
                      onClick={onCancel}
                      rounded
                      idleText="Cancel Changes"
                      loadingText="Loading"
                      variant="secondary"
                      className="btn-primary-soft"
                      style={{
                        width: "150px",
                        fontSize: "12px",
                        marginRight: "18px",
                        backgroundColor: "gray",
                      }}
                    />
                    {isAdmin && !!userId && (
                      <ReactiveButton
                        type="button"
                        rounded
                        idleText="Delete Profile"
                        loadingText="Loading"
                        variant="secondary"
                        className="btn-primary-soft"
                        onClick={onDelete}
                        style={{
                          marginLeft: "130px",
                          width: "150px",
                          fontSize: "12px",
                          backgroundColor: "#b37070ff",
                        }}
                      />
                    )}
                  </div>
            </Form>
        </div>
    </>
   )
}