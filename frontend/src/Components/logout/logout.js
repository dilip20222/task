import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { resetStore } from '../../store/Logout/Action';

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