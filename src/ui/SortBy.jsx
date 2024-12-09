import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";
import PropTypes from "prop-types";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("SortBy") || "";
  function handleChange(e) {
    searchParams.set("SortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      type="white"
      value={sortBy}
    />
  );
}

SortBy.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SortBy;
