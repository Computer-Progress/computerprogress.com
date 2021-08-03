import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function Alert({open, close, setOpen, message, ...props}) {
    const handleClose = (event, reason) => {
        close();
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" {...props}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
  }