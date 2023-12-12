import React from "react";

import { getCacheData } from "../requestHandler";

import { useRouter } from "next/navigation";

export type CurrentEstablishment = {
  id: number;
  role: string;
  establishmentName: string;
  name?: string;
  publicId?: string;
};

export function useEstablishment(orgUsers = null) {
  const [currentEstablishment, setCurrentEstablishment] = React.useState(null);
  const [publicId, setPublicId] = React.useState(null) as any;
  const [isLoading, setLoading] = React.useState(false);
  const [noEstablishment, setNoEstablishment] = React.useState(false);
  const [error, setError] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    checkAuthorization();
  }, [orgUsers]);

  const checkAuthorization = async () => {
    //check current user
    const currentUser = await getCacheData("currentUser", true);
    if (!currentUser) return router.push("/login");

    if (orgUsers) {
      hadleEstablishmentLogin(orgUsers);
    } else {
      hadleEstablishmentLogin();
    }
  };

  const hadleEstablishmentLogin = async (orgUsers = null) => {
    //check if there is a  param in the route
    setLoading(true);
    const routeSplit = window.location.pathname.split("/");
    const publicId = routeSplit[routeSplit.length - 1];

    setPublicId(publicId);

    //check if publicId is in the cache
    const cachedEstablishment = await getCacheData(publicId, true);
    console.log("cachedEstablishment", cachedEstablishment);
    if (cachedEstablishment) {
      setCurrentEstablishment(cachedEstablishment);
      return setLoading(false);
    } else {
      return router.push("/login");
    }
  };

  return {
    currentEstablishment: currentEstablishment as CurrentEstablishment | null,
    loading: isLoading,
    error,
    noEstablishment,
    publicEstablishmentId: publicId,
  };
}
