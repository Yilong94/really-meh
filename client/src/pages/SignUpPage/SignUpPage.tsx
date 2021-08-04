import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import { signup } from "../../api";
import { LOGIN } from "../../app/routes";
import FormInput from "../../components/FormInput";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { ReactQueryKey } from "../../constants";

const SignUpPage: FC = () => {
  const history = useHistory();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const { isLoading, mutate } = useMutation(ReactQueryKey.SIGNUP, signup, {
    onSuccess: () => {
      history.push(LOGIN);
    },
  });

  const handleChange: ChangeEventHandler = (e) => {
    const { id, value } = e.target as HTMLInputElement;
    setSignupForm({ ...signupForm, [id]: value });
  };

  const handleSubmit = () => {
    mutate({
      name: signupForm.name,
      email: signupForm.email,
      username: signupForm.username,
      password: signupForm.password,
      password2: signupForm.password,
    });
  };

  const redirectToLogin = () => {
    history.push(LOGIN);
  };

  return (
    <ResponsiveContainer className="flex flex-col flex-auto px-16 py-48 mt-4 bg-white">
      <div className=" text-3xl font-bold">Sign Up</div>
      <div className="mt-8 space-y-4">
        <FormInput
          id="name"
          value={signupForm.name}
          placeholder="Name"
          type="text"
          onChange={handleChange}
        />
        <FormInput
          id="email"
          value={signupForm.email}
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <FormInput
          id="username"
          value={signupForm.username}
          placeholder="Username"
          type="text"
          onChange={handleChange}
        />
        <FormInput
          id="password"
          value={signupForm.password}
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
      </div>
      <button
        onClick={redirectToLogin}
        className="self-start mt-4 text-blue-600 underline"
      >
        Login
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
          <div>Sign up</div>
        )}
      </button>
    </ResponsiveContainer>
  );
};

export default SignUpPage;
