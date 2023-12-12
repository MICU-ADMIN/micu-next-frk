import React from "react";

export const FormProvider = ({
  func,
  children,
}: {
  func: any;
  children: any;
}) => {
  return <form onSubmit={func}>{children}</form>;
};
