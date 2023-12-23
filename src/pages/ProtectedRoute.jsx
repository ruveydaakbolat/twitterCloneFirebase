import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    return () => unsub();
  }, []);

  if (isAuth === false) {
    return <Navigate to={'/'} replace={true} />
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
