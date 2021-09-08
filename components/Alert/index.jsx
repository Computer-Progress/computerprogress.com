import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Creators as alertActions } from "../../store/ducks/alert";

export default function Alert({ ...props }) {
  const dispatch = useDispatch();
  const alertStatus = useSelector((state) => state.AlertReducer);

  const handleClose = (event, reason) => {
    dispatch(alertActions.closeAlert());
  };

  return (
    <>
      {alertStatus.type && (
        <Snackbar
          open={alertStatus.open}
          autoHideDuration={10000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={alertStatus.type}
            {...props}
          >
            {alertStatus.message}
          </MuiAlert>
        </Snackbar>
      )}
    </>
  );
}
