import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import PropTypes from "prop-types";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";

import Modal from "../../ui/Modal.jsx";
import Menus from "../../ui/Menus.jsx";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showEdit, setShowEdit] = useState(false);

  const { deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        {/* <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <FaCopy />
          </button>
          <button onClick={() => setShowEdit((show) => !show)}>
            {" "}
            <MdModeEdit />
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <MdDelete />
          </button>
        </div> */}

        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>
            <Menus.Button
              icon={<HiPencil />}
              onClick={() => setShowEdit((show) => !show)}
            >
              Edit
            </Menus.Button>
            <Menus.Button
              icon={<HiTrash />}
              onClick={() => deleteCabin(cabinId)}
            >
              Delete
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </TableRow>
      {showEdit && (
        <Modal onClose={() => setShowEdit(false)}>
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal>
      )}
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number, // Optional prop, so it's not required
    image: PropTypes.string, // Optional prop, so it's not required
    description: PropTypes.string,
  }).isRequired,
};

export default CabinRow;
