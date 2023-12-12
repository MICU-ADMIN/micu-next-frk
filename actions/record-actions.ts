import { deleteFromCacheWithPrefix } from "@/app/_helpers/web/cache/cache";
import { handleErrors } from "@/app/_helpers/web/formatters";
import { requestHandler } from "@/app/_helpers/web/requestHandler";

const manageSorts = (sorts: { type: any; orderBy: string }) => {
  switch (sorts.type) {
    case "id":
      sorts.orderBy = "id";
      break;
    case "createdAt":
      sorts.orderBy = "createdAt";
      break;
    case "updatedAt":
      sorts.orderBy = "updatedAt";
      break;
    case "index":
      sorts.orderBy = "index";
      break;
  }

  if (sorts.orderBy === "value") sorts.orderBy = "label";

  return sorts;
};

//fetch next records
export const fetchRecords = async (lastId: any, recordId: any, setLoading: (v: boolean) => void, loading: boolean, cb: any, sorts?: any) => {
  if (loading) return;
  setLoading(true);

  if (sorts) sorts = manageSorts(sorts);

  let route = `recordData?lastId=${lastId}&recordId=${recordId}${sorts?.dir ? "&dir=" + sorts.dir : ""}${sorts?.orderBy ? "&orderBy=" + sorts.orderBy : ""}`;
  requestHandler({ type: "get", route, shouldCache: true, returnCache: true }).then((res) => {
    setLoading(false);
    if (res.errors) {
      // return handleSuccess("Record updated successfully");
      handleErrors(res);
    }
    cb(res);
  });
};

let lastFilerString = "";
//fetch filtered rows
export const fetchFilteredRecords = async (
  lastId: any,
  recordId: any,
  setLoading: (v: boolean) => void,
  loading: boolean,
  cb: any,
  sorts?: any,
  filters?: any[]
) => {
  if (loading || !filters) return;
  else if (lastFilerString === JSON.stringify(filters)) return;
  setLoading(true);

  if (sorts) sorts = manageSorts(sorts);

  let route = `recordData/multiple?lastId=${lastId}&recordId=${recordId}${sorts?.dir ? "&dir=" + sorts.dir : ""}${
    sorts?.orderBy ? "&orderBy=" + sorts.orderBy : ""
  }`;

  const sqlFilters = [];
  const jsonFilters = [];

  for (let filter of filters) {
    if (!filter.value) continue;

    filter.value = filter.value.toString().toLowerCase();
    if (filter.column === "value") filter.type = "label";
    if (filter.type === "id") filter.type = "index";
    if (filter.type === "index" || filter.type === "createdAt" || filter.type === "updatedAt" || filter.type === "label" || filter.type === "userId") {
      sqlFilters.push(filter);
    } else jsonFilters.push(filter);
  }

  if (!sqlFilters.length && !jsonFilters.length) return setLoading(false);

  requestHandler({
    type: "post",
    route,
    body: { sqlFilters, jsonFilters: jsonFilters },
  }).then((res) => {
    setLoading(false);
    if (res.errors) {
      // return handleSuccess("Record updated successfully");
      handleErrors(res);
    }
    cb(res);
  });

  lastFilerString = JSON.stringify([...filters, sorts ? sorts : {}]);
};

// update a row in recordData
export const updateRecordDataRow = async (model: any, setLoading: (v: boolean) => void, loading: boolean, cb: any) => {
  if (!model || loading) return;
  let label = model.label || model.value;
  if (label) label = label.slice(0, 50);
  setLoading(true);
  requestHandler({ type: "put", route: "recordData", body: { id: model.id, label, model: JSON.stringify(model) } }).then((res) => {
    setLoading(false);
    if (res.errors) {
      // return handleSuccess("Record updated successfully");
      handleErrors(res);
    }
    cb(res);
    deleteFromCacheWithPrefix("recordData");
  });
};

// update a rows in recordData
export const updateRecordDataRows = async (rows: any, setLoading: (v: boolean) => void, loading: boolean, cb: any) => {
  if (!rows || loading) return;

  const curRows = [] as any;
  for (const row of rows) {
    row.label = row?.label || row?.value ? (row?.label || row?.value).slice(0, 50) : "";
    curRows.push({ id: row.id, label: row.label, model: JSON.stringify(row) });
  }

  setLoading(true);
  requestHandler({ type: "put", route: "recordData/multiple", body: { records: curRows } }).then((res) => {
    setLoading(false);
    if (res.errors) {
      // return handleSuccess("Record updated successfully");
      handleErrors(res);
    }
    cb(res);
    deleteFromCacheWithPrefix("recordData");
  });
};

// update a rows in recordData
export const updateRecordDataIndexes = async (rows: any, setLoading: (v: boolean) => void, loading: boolean, cb: any) => {
  if (!rows || loading) return;

  const curRows = [] as any;
  for (const row of rows) {
    curRows.push({ id: row.id, index: row.index });
  }

  setLoading(true);
  requestHandler({ type: "put", route: "recordData/indexes", body: { records: curRows } }).then((res) => {
    setLoading(false);
    if (res.errors) {
      // return handleSuccess("Record updated successfully");
      handleErrors(res);
    }
    cb(res);
    deleteFromCacheWithPrefix("recordData");
  });
};

export const UpdateRecord = (columns: any, setLoading: (v: boolean) => void, loading: boolean, record: any, cb: any) => {
  if (!columns || loading) return;
  //remove last column
  columns.pop();
  setLoading(true);
  // body.label, body.description, body.thumbnail, date, body?.properties, body?.additionalData, body.id, session.establishmentId;
  requestHandler({
    type: "put",
    route: "records",
    body: {
      id: record.id,
      properties: JSON.stringify(columns),
      label: record.label,
      description: record?.description,
      thumbnail: record?.thumbnail,
      date: record?.date,
      additionalData: record?.additionalData ? JSON.stringify(record?.additionalData) : null,
    },
  }).then((res) => {
    setLoading(false);
    if (res.errors) {
      // return handleSuccess("Record updated successfully");
      handleErrors(res);
    }
    cb(res);
  });
};

//Update Recordlabel
export const UpdateRecordLabel = (label: string, setLoading: (v: boolean) => void, loading: boolean, record: any) => {
  if (!label || loading) return;
  setLoading(true);
  requestHandler({ type: "put", route: "records/label", body: { id: record.id, label } }).then((res) => {
    setLoading(false);
    if (res.errors) {
      // return handleSuccess("Record updated successfully");
      handleErrors(res);
    }
  });
};

//Add new recordData row
export const addRecordData = async (
  model: any,
  cb: (arg0: { success: boolean; id: any }) => void | undefined,
  setLoading: (v: boolean) => void,
  loading: boolean,
  record: any
) => {
  if (!model || loading) return;
  setLoading(true);
  requestHandler({ type: "post", route: "recordData", body: { recordId: record.id, label: model?.value || null, model: JSON.stringify(model) } }).then(
    (res) => {
      setLoading(false);
      if (res.errors) {
        cb(res);
        return handleErrors(res);
      }
      cb({ success: true, id: res.id });
      deleteFromCacheWithPrefix("recordData");

      // remove record from model      }
    }
  );
};

//delete recordData row
export const deleteRecordData = async (id: any, cb: (arg0: { success: boolean }) => void | undefined, setLoading: (v: boolean) => void, loading: boolean) => {
  if (!id || loading) return;
  setLoading(true);
  requestHandler({ type: "delete", route: "recordData", body: { id } }).then((res) => {
    setLoading(false);
    if (res.errors) {
      cb(res);
      return handleErrors(res);
    }
    cb({ success: true });
    deleteFromCacheWithPrefix("recordData");
  });
};
