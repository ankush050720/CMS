import { useNavigate } from 'react-router-dom';

export const useRoleBasedRedirect = () => {
  const navigate = useNavigate();

  const redirectUser = (role) => {
    switch (role) {
      case 'guest':
        navigate('/guest'); // Generic guest page
        break;
      case 'chairperson':
      case 'vicechairperson':
        navigate('/chairperson'); // Generic chairperson page
        break;
      case 'faculty mentor':
        navigate('/faculty-mentor'); // Generic faculty mentor page
        break;
      case 'admin':
        navigate('/admin'); // Admin dashboard or page
        break;
      default:
        navigate('/member');
    }
  };

  return redirectUser;
};
