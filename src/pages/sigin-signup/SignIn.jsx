import { useEffect, useRef, useState } from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { CustomInput } from "../../components/customInpute/CustomInput";
import { toast } from "react-toastify";
import { userSignInAction } from "../../features/users/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const emailRef = useRef("");
  const passRef = useRef("");
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userInfo);
  console.log(location);

  const sendTo = location?.state?.from?.location?.pathname || "/dashboard";

  useEffect(() => {
    if (user?._id) navigate(sendTo);
  }, [user?._id, navigate, sendTo]);

  const [isAdmin, setIsAdmin] = useState(false); // Track if admin or student

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (!email || !password) {
      return toast.error("Both fields must be filled");
    }

    dispatch(userSignInAction({ email, password }));
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "Sam@email.com",
      inputRef: emailRef,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "*******",
      inputRef: passRef,
    },
  ];

  // Set default credentials for admin and student
  useEffect(() => {
    if (isAdmin) {
      emailRef.current.value = "a@a.com";
      passRef.current.value = "123";
    } else {
      emailRef.current.value = "b@b.com";
      passRef.current.value = "123";
    }
  }, [isAdmin]);

  return (
    <DefaultLayout>
      <Row>
        <Col md={6} className="m-auto">
          <Card className="shadow-lg border p-4 rounded mt-4">
            <Card.Body>
              <Card.Title>Test Credentials</Card.Title>
              <Card.Text>
                <strong>Admin Sign-In:</strong>
                <br />
                Email: <code>a@a.com</code>
                <br />
                Password: <code>123</code>
                <br />
                <br />
                <strong>Student Sign-In:</strong>
                <br />
                Email: <code>b@b.com</code>
                <br />
                Password: <code>123</code>
              </Card.Text>
            </Card.Body>
          </Card>
          <Form
            onSubmit={handleOnSubmit}
            className="shadow-lg border p-5 rounded m-auto mt-4"
            style={{ width: "450px" }}
          >
            <h1>Welcome back!</h1>
            <hr />
            <Form.Group>
              <Form.Check
                type="radio"
                label="Admin"
                name="role"
                onChange={() => setIsAdmin(true)}
                checked={isAdmin}
              />
              <Form.Check
                type="radio"
                label="Student"
                name="role"
                onChange={() => setIsAdmin(false)}
                checked={!isAdmin}
              />
            </Form.Group>
            {inputs.map((input, i) => (
              <CustomInput key={i} {...input} />
            ))}

            <div className="d-grid">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
};

export default SignIn;
