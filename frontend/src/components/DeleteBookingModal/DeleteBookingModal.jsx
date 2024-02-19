import PropTypes from "prop-types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

function DeleteBookingModal({ userBook, deleted, setDeleted }) {
  const deleteBooking = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/booking/${
          userBook.bookId
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      setDeleted(!deleted);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button type="button" className="bookCancel">
          Annuler la réservation
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Êtes-vous vraiment sûr de vouloir supprimer cette réservation?
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            Cette action va supprimer définitivement votre réservation et elle
            ne sera pas remboursée
          </AlertDialog.Description>
          <footer className="chooseButton">
            <AlertDialog.Cancel asChild>
              <button type="button" className="carButtonDelete">
                Annuler
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                type="button"
                className="carButtonDelete"
                onClick={() => {
                  deleteBooking();
                }}
              >
                Oui
              </button>
            </AlertDialog.Action>
          </footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

DeleteBookingModal.propTypes = {
  userBook: PropTypes.shape({
    station_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    adress: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    max_power: PropTypes.number.isRequired,
    bookId: PropTypes.number.isRequired,
  }).isRequired,
  deleted: PropTypes.bool.isRequired,
  setDeleted: PropTypes.func.isRequired,
};

export default DeleteBookingModal;
