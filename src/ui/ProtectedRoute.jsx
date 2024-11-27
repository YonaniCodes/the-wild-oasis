import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex,
  align-items: center,
  justify-content: center
`;
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  // Redirect to login page if the user is not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
    console.log(isAuthenticated);
  }, [isLoading, isAuthenticated, navigate]);

  // Show a spinner while loading
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // Render the children if the user is authenticated
  return isAuthenticated ? children : null;
}
