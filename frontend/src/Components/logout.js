import { useHistory } from 'react-router';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';

function Logout() {
    const [user, setUser] = useState(
        localStorage.getItem('token')
    );
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem('token');
    setUser(user);
    history.push('/SignIn');
  };
  return (
    <div>
      <button className="btn btn-primary"
        onClick={() => {
          logoutHandler();
        }}
      >Log out</button>
    </div>
  );
}
export default Logout;