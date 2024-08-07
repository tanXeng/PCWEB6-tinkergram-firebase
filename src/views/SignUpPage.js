import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="my-3">Sign up for an account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <FormLabel>Password</FormLabel>
        <Form.Group className="mb-3" controlId="formBasicPassword">
           <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <FormLabel>Confirm password</FormLabel>
        <Form.Group className="mb-3" controlId="formBasicPassword">
           <Form.Control
            type="password"
            placeholder="Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <a href="/login">Have an existing account? Login here.</a>
        </Form.Group>
        <Button
        variant="primary"
        onClick={async (e) => {
          setError("");
          const canSignup = username && password;
          const isPasswordSame = (passwordConfirm === password);
          if (canSignup)
            if (isPasswordSame){
              try { 
              await createUserWithEmailAndPassword(auth, username, password);
              navigate("/");
            } catch (error) {
              setError(error.message);
            }} else {
              setError("the passwords are not the same!")
            }
        }}>Sign Up</Button>
      </Form>
      <p>{error}</p>
    </Container>
  );
}