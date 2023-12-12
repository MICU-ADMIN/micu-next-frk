import { handleErrors } from "@/app/_helpers/web/formatters";
import { requestHandler } from "@/app/_helpers/web/requestHandler";

export const FetchCalenderRecordData = async (id: any, params: any, cb: (res: any) => void) => {
  //get first date of this month if not provided
  let startDate = params.startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  let endDate = params.endDate || new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  requestHandler({ type: "post", route: "recordData/calender?recordId=" + id, body: { startDate, endDate } }).then((res) => {
    if (res?.errors || !res) {
      // return handleSuccess("Record updated successfully");
      handleErrors(res);
    }
    cb(res);
  });
};
