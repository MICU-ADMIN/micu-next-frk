"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import {
  checkRequiredAndErrs,
  handleErrors,
  handleSuccess,
} from "../../_helpers/web/formatters";
import { addToCache, requestHandler } from "../../_helpers/web/requestHandler";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import LoginPageLayout from "../../components/__Layouts/loginpagelayout";
import FormGroup from "../../components/Elements/Form/FormGroup";
import Spinner from "../../components/Elements/Spinner/Spinner";

const defaultModel = {
  email: "",
  password: "",
};

function Login() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [model, setModel] = React.useState(defaultModel);
  const [errors, setErrors] = React.useState({} as any);

  const onSubmit = () => {
    if (!checkRequiredAndErrs(model, setErrors, errors)) return;
    setLoading(true);

    requestHandler({ type: "post", body: model, route: "auth/login" }).then(
      (res) => {
        if (res.email) {
          addToCache("currentUser", res, true);

          if (res.orgs.length > 0) {
            addToCache(res.orgs[0].establishmentName, res.orgs[0], true);
            return router.push(
              "/dashboard/home/" + res.orgs[0].establishmentName
            );
          }

          return router.push("/dashboard");
        }
        setLoading(false);

        handleErrors(res);
      }
    );
  };

  return (
    <>
      <div className="h-full">
        <div className="flex min-h-full items-center justify-center px-4  sm:px-6 lg:px-8">
          <div className="w-full ">
            <div>
              {/* <img
              className="h-100 mx-auto w-auto"
              src={require('src/assets/Mosque2.png')}
              alt="Your Company"
            /> */}
              <h2 className="text-6xl font-bold tracking-tight text-primary-600">
                Sign In.
              </h2>

              <FormGroup
                className="w-full space-y-2  mt-10"
                errors={errors}
                setErrors={setErrors}
                submitAction={onSubmit}
                fields={[
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
                ]}
                model={model}
                setModel={setModel}
              />
            </div>

            {/*  */}

            <div className="items-center mt-5  justify-between space-y-3">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:border-primary-400 focus:ring-primary-200"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
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

            <div>
              <button
                type="button"
                onClick={onSubmit}
                className=" group relative  mt-5 flex w-full justify-center rounded-xl border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-primary-500 group-hover:text-primary-400"
                    aria-hidden="true"
                  />
                </span>
                {loading ? <Spinner className="ml-2" /> : "Sign In"}
              </button>
            </div>
            <div className="space-y-3 mt-5">
              <p className="mt-2 text-sm text-black">{`Don't have an account?`}</p>
              <Link
                href="/register"
                className="font-bold text-black underline hover:text-primary-800"
                prefetch
              >
                Create one now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
