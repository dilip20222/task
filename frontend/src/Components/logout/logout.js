import { useHistory } from 'react-router';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { resetStore } from '../../store/store';


function Logout() {

  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('token');
    dispatch(resetStore());
    history.push('/SignIn');
  };
  return (
    <div>
      <button className="btn btn-primary"
        onClick={logoutHandler}
      ><LogoutIcon/>
      </button>
    </div>
  );
}
export default Logout;