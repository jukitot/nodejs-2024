import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { authService } from "../../services/authService";
import { authActions } from "../../redux/slices/authSlice";
import css from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { me } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  if (authService.getAccessToken() && !me) {
    dispatch(authActions.me());
  }
  return (
    <div className={css.Header}>
      {me ?
        <div>
          {me.name}
        </div>
        :
        <div>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>

      }</div>
)
;
}
;

export default Header;