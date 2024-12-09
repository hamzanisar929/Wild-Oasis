import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

function DataItem({ icon, label, children }) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

DataItem.propTypes = {
  icon: PropTypes.element, // Expects a valid React element, like an SVG or JSX element
  label: PropTypes.string.isRequired, // Expects a non-optional string for the label
  children: PropTypes.node, // Expects any renderable React content
};

DataItem.defaultProps = {
  icon: null, // Default value for the icon if not provided
  children: null, // Default value for children if not provided
};

export default DataItem;
