import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler } from "react";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import { login } from "../../api";
import { HOME, SIGNUP } from "../../app/routes";
import FormInput from "../../components/FormInput";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { ReactQueryKey } from "../../constants";
import { setSessionToken } from "../../utils";

const LoginPage: FC = () => {
  const history = useHistory();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { isLoading, mutate } = useMutation(ReactQueryKey.LOGIN, login, {
    onSuccess: (data) => {
      setSessionToken({
        id: data.user.id,
        name: data.user.name,
        username: loginForm.username,
      });
      history.push(HOME);
    },
  });

  const handleChange: ChangeEventHandler = (e) => {
    const { id, value } = e.target as HTMLInputElement;
    setLoginForm({ ...loginForm, [id]: value });
  };

  const handleSubmit = () => {
    mutate({ username: loginForm.username, password: loginForm.password });
  };

  const redirectToSignup = () => {
    history.push(SIGNUP);
  };

  return (
    <ResponsiveContainer className="flex flex-col flex-auto px-16 py-48 mt-4 bg-white">
      <div className=" text-3xl font-bold">Login</div>
      <div className="mt-8 space-y-4">
        <FormInput
          id="username"
          value={loginForm.username}
          placeholder="Username"
          type="text"
          onChange={handleChange}
        />
        <FormInput
          id="password"
          value={loginForm.password}
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
      </div>
      <button
        onClick={redirectToSignup}
        className="self-start mt-4 text-blue-600 underline"
      >
        Sign up
      </button>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="self-end p-3 mt-4 text-base font-bold bg-yellow-300 rounded-full min-w-48"
      >
        {isLoading ? (
          <div className="flex justify-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="w-5 h-5 animate-spin"
            />
          </div>
        ) : (
          <div>Login</div>
        )}
      </button>
    </ResponsiveContainer>
  );
};

export default LoginPage;
