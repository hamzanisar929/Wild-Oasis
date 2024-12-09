import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/authentication/useAuth";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import PropTypes from "prop-types";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useAuth();

  // 2. If not redirect to login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 3. If is loading show spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4.If logged in show app
  if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
