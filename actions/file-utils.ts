import { deleteFromCacheWithPrefix } from "@/app/_helpers/web/cache/cache";
import { errorMessage, niceBytes, handleSuccess, handleErrors } from "@/app/_helpers/web/formatters";
import { getCachData, requestHandler, gqlF, removeFromCache } from "@/app/_helpers/web/requestHandler";

export async function upload(files: any[], isPublic = true, maxSize = 23483023) {
  if (!files || files.length === 0) return;

  const formData = new FormData();

  let tooBigFiles = "";

  files.forEach((file: { fileSize: number; name: string; source: string | Blob }) => {
    if (file.fileSize > maxSize) tooBigFiles += file.name + ", ";
    else formData.append("file", file.source);
  });

  if (tooBigFiles) {
    errorMessage(`The following files are above ${niceBytes(maxSize)} and will not be uploaded: ${tooBigFiles}`);
  }

  const result = await fetch(`/api/upload?ispublic=${isPublic ? "true" : "false"}`, {
    method: "POST",
    body: formData,
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data?.errors) {
        errorMessage(data.message);
        throw data;
      }
      handleSuccess("Files uploaded successfully");

      deleteFromCacheWithPrefix("files");

      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      errorMessage("Something went wrong");
      throw error;
    });

  return result;
}

export const getFiles = async (page = 1, lastId = 0) => {
  const response = await requestHandler({
    route: "files?lastId=" + lastId + "&page=" + page,
    type: "GET",
    shouldCache: true,
    returnCache: true,
  });

  if (!response?.errors) {
    return response;
  } else {
    handleErrors(response);
    throw response;
  }
};

export const getRecentFiles = async (page = 1, lastId = 0) => {
  const response = await requestHandler({
    route: "files/recent?lastId=" + lastId + "&page=" + page,
    type: "GET",
    shouldCache: true,
    returnCache: true,
  });

  if (!response?.errors) {
    return response;
  } else {
    handleErrors(response);
    throw response;
  }
};

export const deleteFile = async (fileKey: any, isPublic = true) => {
  const request = await requestHandler({ type: "DELETE", route: `upload?key=${fileKey}${isPublic ? "&ispublic=true" : ""}` });
  if (request?.errors) {
    errorMessage(request.message);
    throw request;
  }

  return request;
};

export const deleteFiles = async (fileKeys: any, isPublic = true) => {
  const request = await requestHandler({ type: "DELETE", route: `upload${isPublic ? "?public=true" : ""}`, body: { fileKeys: fileKeys } });
  if (request?.errors) {
    errorMessage(request.message);
    throw request;
  }

  return request;
};

export const makeFilePublic = async (fileKey: any) => {
  const user = await getCachData("currentUser", true);

  const result = (await fetch(process.env.FILE_URL + `make-file-public/${fileKey}?id=${user?.userId}`, {
    method: "GET",
    credentials: "include",
  })) as any;
  const data = await result.json();

  if (data?.error) {
    errorMessage(data.error);
    throw data.error;
  }

  return data;
};

export const makeFilePrivate = async (fileKey: any) => {
  const user = await getCachData("currentUser", true);

  const result = (await fetch(process.env.FILE_URL + `make-file-private/${fileKey}?id=${user?.userId}`, {
    method: "GET",
    credentials: "include",
  })) as any;
  const data = await result.json();

  if (data?.error) {
    errorMessage(data.error);
    throw data.error;
  }

  return data;
};

export function downloadFile(url: RequestInfo | URL, fileName: string) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
}

export const sendEmail = async (body: any) => {
  const user = await getCachData("currentUser", true);

  const result = await fetch(process.env.FILE_URL + `send-email?id=${user?.userId}`, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await result.json();

  if (data?.error) {
    return errorMessage(data?.error || "Something went wrong");
  }

  handleSuccess("Email sent successfully");
  return data;
};
