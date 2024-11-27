import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabins-form">
          <Button> Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabins-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
