import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  // const [open, setOpen] = React.useState(false);

  
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handlerclose}>
        <Alert onClose={props.handlerclose} severity="success" sx={{ width: '100%' }}>
          Successfull !
        </Alert>
      </Snackbar>
    </Stack>
  );
}
