import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar(props) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.notification} autoHideDuration={2000} onClose={props.handlerclose}>
        <Alert onClose={props.handlerclose} severity="error" sx={{ width: '100%' }}>
     Please Enter All Valid Input's !
        </Alert>
      </Snackbar>
    </Stack>
  );
}

