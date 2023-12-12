import { handleErrors } from "@/app/_helpers/web/formatters";
import { addToCache, getCachData, requestHandler } from "@/app/_helpers/web/requestHandler";

var fetchingContacts = false;

export const fetchUsers = async (cb: any) => {
  if (fetchingContacts) {
    return setTimeout(() => {
      fetchUsers;
    }, 250);
  }

  fetchingContacts = true;
  const request = await requestHandler({ type: "get", route: "users", shouldCache: true, returnCache: true });
  fetchingContacts = false;
  if (!request || request.errors) return handleErrors(request);
  //check if user map already exists
  const cachedUserMap = await getCachData("userMap");
  if (cachedUserMap) return cb(request, cachedUserMap);

  const userMap = {} as any;
  request.forEach((user: { id: string | number }) => {
    userMap[user.id] = user;
  });

  addToCache("userMap", userMap);

  cb(request, userMap);
};

export const getCurrentUser = async () => {
  const user = await getCachData("currentUser", true);
  return user;
};
