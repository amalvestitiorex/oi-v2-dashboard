import { RouterProvider } from "react-router-dom";
import { adminRouter, authRouter, userRouter } from "./routes/routes.tsx";
import { size } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store.ts";
import { useEffect } from "react";
import { hasExpiredToken } from "./utils/jwt.ts";
import { signOut } from "./redux/slices/auth.slice.ts";

export const App = () => {
  const { user, access } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (access) {
      if (hasExpiredToken(access)) {
        dispatch(signOut());
      }
    } else {
      dispatch(signOut());
    }
  }, [access, dispatch]);

  return (
    <RouterProvider
      router={
        size(user) > 0
          ? user.role === "admin"
            ? adminRouter
            : userRouter
          : authRouter
      }
    />
  );
};
