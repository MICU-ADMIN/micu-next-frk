"use client";

import React from "react";
import TableElement from "../../Elements/TableElement/TableElement";
import {
  UpdateRecord,
  addRecordData,
  deleteRecordData,
  fetchRecords,
  updateRecordDataIndexes,
  updateRecordDataRow,
  updateRecordDataRows,
} from "@/actions/record-actions";
import Loader from "../../Elements/Loader/Loader";
import { addToCache } from "@/app/_helpers/web/requestHandler";
import { FetchCalenderRecordData } from "@/actions/record-calender-actions";

type Props = {
  record: any;
  properties: any;
  navOpen: boolean;
  setLoading: (v: boolean) => void;
  loading: boolean;
  publicEstablishmentId: string;
  view: boolean;
};

function RecordLayout({ record, properties, navOpen, setLoading, loading, setRecord, publicEstablishmentId, view }: Props) {
  const [model, setModel] = React.useState(null) as any[];
  const [columns, setColumns] = React.useState([]) as any[];
  const [fetching, setFetching] = React.useState(false);
  let changeTimeout = React.useRef<any>(null);
  let rowTimeouts = React.useRef<any>({}); //for row changes

  React.useEffect(() => {
    if (model) return;
    if (record?.data) {
      const curData = [] as any[];

      setTimeout(() => {
        addToCache("recordData?lastId=0&recordId=" + record.id, record.data);
      }, 0);

      for (const row of record.data) {
        const curRow = { ...row.model, id: row.id, userId: row.userId, createdAt: row.createdAt, updatedAt: row.updatedAt, index: row.index };
        curData.push(curRow);
      }
      setModel(curData);
    }
  }, []);

  React.useEffect(() => {
    if (properties) {
      setColumns(properties);
    } else {
      setColumns([
        {
          name: "value",
          placeholder: "Value",
          width: "150px",
          type: "editor",
          placeholderView: true,
        },
      ]);
    }
  }, []);

  return (
    <>
      {fetching && (
        <div className="relative bottom-[150px]">
          <Loader />
        </div>
      )}
      <div className="m-5 mt-1">
        <TableElement
          publicEstablishmentId={publicEstablishmentId}
          field={{
            height: navOpen ? "calc(100vh - 193px)" : "calc(100vh - 110px)",
            columns: columns,
            cellSelection: true,
            editColumns: true,
            rowViewable: true,
          }}
          onChangeRows={(rows: any, cb, indexChange) => {
            if (indexChange) updateRecordDataIndexes(rows, setLoading, loading, cb);
            else updateRecordDataRows(rows, setLoading, loading, cb);
          }}
          onChangeRow={(row: any, _column: any, cb) => {
            rowTimeouts.current[row.id] && clearTimeout(rowTimeouts.current[row.id]);
            rowTimeouts.current[row.id] = setTimeout(() => {
              updateRecordDataRow({ ...row }, setLoading, loading, cb);
            }, 500);
          }}
          onChangeColumns={(columns: any, cb: any) => {
            changeTimeout.current && clearTimeout(changeTimeout.current);
            changeTimeout.current = setTimeout(() => {
              UpdateRecord([...columns], setLoading, loading, record, cb);
            }, 500);
          }}
          onAddRow={(row: any, cb) => {
            addRecordData(row, cb, setLoading, loading, record);
          }}
          onDeleteRow={(id: any, _index: any, cb: (arg0: { success: boolean }) => void) => {
            deleteRecordData(id, cb, setLoading, loading);
          }}
          fetchHandler={(lastId: number, cb: (arg0: any) => void, options?: any) => {
            console.log("fetching", options);
            !options || options.length < 2 ? fetchRecords(lastId, record.id, setFetching, fetching, cb, options) : null;
          }}
          requestTransformer={(data: any) => {
            const curData = [] as any[];
            for (const row of data) {
              const curRow = { ...row.model, id: row.id, userId: row.userId, createdAt: row.createdAt, updatedAt: row.updatedAt, index: row.index };
              curData.push(curRow);
            }
            return curData;
          }}
          calenderFetchHandler={(dateParams: { startDate: string; endDate: string }, cb: (arg0: any) => void) => {
            FetchCalenderRecordData(record.id, dateParams, cb);
          }}
          data={model || []}
          view={view}
        />
      </div>
    </>
  );
}

export default RecordLayout;
