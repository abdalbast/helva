<<<<<<< ours
<<<<<<< ours
import { useEffect } from 'react';
=======
import { useLayoutEffect } from 'react';
>>>>>>> theirs
=======
import { useLayoutEffect } from 'react';
>>>>>>> theirs
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

<<<<<<< ours
<<<<<<< ours
  useEffect(() => {
=======
  useLayoutEffect(() => {
>>>>>>> theirs
=======
  useLayoutEffect(() => {
>>>>>>> theirs
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
