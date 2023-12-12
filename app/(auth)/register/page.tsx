"use client";

import React from "react";
import {
  checkRequiredAndErrs,
  handleErrors,
  handleSuccess,
} from "../../_helpers/web/formatters";
import { requestHandler } from "../../_helpers/web/requestHandler";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormGroup from "../../components/Elements/Form/FormGroup";
import Spinner from "../../components/Elements/Spinner/Spinner";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const defaultModel = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [model, setModel] = React.useState(defaultModel);
  const [errors, setErrors] = React.useState({} as any);
  //   const { signUp } = useAuth();

  const onSubmit = () => {
    if (!checkRequiredAndErrs(model, setErrors, errors)) return;
    if (model.password !== model.confirmPassword)
      return setErrors((errors: any) => ({
        ...errors,
        confirmPassword: "Passwords do not match",
      }));
    setLoading(true);

    requestHandler({ type: "post", body: model, route: "auth/register" }).then(
      (res) => {
        setLoading(false);
        if (res.success) {
          handleSuccess("Successfully Registered");
          return router.push("/login");
        }
        handleErrors(res);
      }
    );
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-full items-center justify-center px-4 py-0 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="h-100 mx-auto w-auto"
              src={require('src/assets/Mosque2.png')}
              alt="Your Company"
            /> */}
            <h2 className="mt-0 text-6xl font-bold tracking-tight text-primary-600">
              Register.
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <FormGroup
              className="w-full mt-10"
              errors={errors}
              setErrors={setErrors}
              submitAction={onSubmit}
              fields={[
                {
                  name: "firstName",
                  placeholder: "First Name",
                  type: "input",
                  maxLength: 90,
                },
                {
                  name: "lastName",
                  placeholder: "Last Name",
                  type: "input",
                  maxLength: 90,
                },
                {
                  name: "email",
                  placeholder: "Email",
                  subType: "email",
                  type: "input",
                  maxLength: 255,
                },
                {
                  name: "password",
                  placeholder: "Password",
                  type: "input",
                  subType: "password",
                  minLength: 8,
                  maxLength: 255,
                },
                {
                  name: "confirmPassword",
                  placeholder: "Confirm Password",
                  type: "input",
                  subType: "password",
                  minLength: 8,
                  maxLength: 255,
                },
              ]}
              model={model}
              setModel={setModel}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-400 focus:ring-primary-400"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-black"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-black hover:text-primary-500"
                >
                  Password help?
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <p className="mt-2 text-sm text-black">{`Already have an account?`}</p>
              <a
                href="/login"
                className="font-bold text-black underline hover:text-primary-800"
              >
                Sign In
              </a>
            </div>
            <div>
              <button
                onClick={onSubmit}
                className=" group relative flex w-full justify-center rounded-xl border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-primary-500 group-hover:text-primary-400"
                    aria-hidden="true"
                  />
                </span>
                {loading ? <Spinner className="ml-2" /> : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
