"use client";

import React from "react";
import HeaderItem from "./HeaderItem";
import Loader from "../Loader/Loader";
import AddTablePropertyMenu from "./menu/AddTablePropertyMenu";
import {
  AddColumn,
  ColumnInit,
  EditProperty,
  HandleSetRow,
  HandleTableFilter,
  OnBottomScrollHandler,
  RemoveProperty,
  RowDelete,
  RowsInit,
} from "./actions";
import EditPropertyMenu from "./menu/EditPropertyMenu";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableForm from "./TableForm/TableForm";
import TableClickMenu from "./menu/TableClickMenu";
import SelectionMenu from "./menu/SelectionMenu";
import AddNewRowCell from "./cell/AddNewRowCell";
import dynamic from "next/dynamic";
import Spinner from "../Spinner/Spinner";
import ColumnPopup from "./menu/ColumnPopup";

const FileViewerModal = dynamic(
  () => import("@/app/components/_Uploads/FileViewerModal"),
  { loading: () => <Spinner /> }
);
const FiltersBar = dynamic(() => import("./FiltersBar"), {
  loading: () => <Spinner />,
});
const TableCalender = dynamic(() => import("./TableCalender/TableCalender"), {
  loading: () => <Spinner />,
});
const TableCards = dynamic(() => import("./TableCards/TableCards"), {
  loading: () => <Spinner />,
});

type Props = {
  field: any;
  onAddRow?: (model: any, cb: (message?: any) => void) => void;
  onChange?: (v: any, field: any) => void;
  onChangeRow?: (v: any, column: any, cb: (message?: any) => void) => void;
  onChangeRows?: (
    rows: any,
    cb: (message?: any) => void,
    isIndexChange?: boolean
  ) => void;
  onChangeColumns?: (column: any, cb: (messsage?: any) => void) => void;
  onDeleteRow?: (id: any, index: any, cb: (message?: any) => void) => void;
  model?: any;
  route?: string;
  data: any;
  publicEstablishmentId?: string;
  showFloatingLabel?: boolean;
  onEndReached?: () => void;
  fetchHandler?: (
    lastId: number,
    cb: (data: any) => void,
    options?: any,
    page?: any
  ) => void;
  calenderFetchHandler?: (
    dateParams: { startDate: string; endDate: string },
    cb: (data: any) => void
  ) => void;
  requestTransformer?: (data: any) => any;
  view?: string;
};

function TableElement({
  field,
  onChange,
  data,
  showFloatingLabel,
  onChangeRow,
  onChangeColumns,
  onAddRow,
  onDeleteRow,
  route,
  publicEstablishmentId,
  onChangeRows,
  onEndReached,
  fetchHandler,
  requestTransformer,
  calenderFetchHandler,
  view = "table",
}: Props) {
  const [columns, setColumns] = React.useState([]) as any;
  const [cellSelected, setCellSelected] = React.useState(null);
  const [selectedIds, setSelectedIds] = React.useState([]) as any;
  const [model, setModel] = React.useState([]) as any;
  const [firstRender, setFirstRender] = React.useState(true);
  const [dragOptions, setDragOptions] = React.useState({
    rowIsDragging: false,
    rowDragIndex: -1,
    columnIsDragging: false,
    columnDragIndex: -1,
    isResizing: false,
  }) as any;
  const [formOptions, setFormOptions] = React.useState({
    open: false,
    row: null,
    index: -1,
  }) as any;
  const [menuOptions, setMenuOptions] = React.useState({
    addProperty: false,
    editPropertyIndex: null,
    columnEditIndex: null,
    columnTarget: null,
  }) as any;
  const [clickMenuOptions, setClickMenuOptions] = React.useState({
    position: { x: 0, y: 0 },
    row: null,
    type: null,
  }) as any;
  const [filters, setFilters] = React.useState([]) as any;
  const [openFile, setOpenFile] = React.useState(null);
  const [noMoreData, setNoMoreData] = React.useState(false);

  const scrollTimeout = React.useRef<any>(null);
  const wrapperRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (field.columns) {
      ColumnInit(field, setColumns);
    }
  }, [field.columns]);

  React.useEffect(() => {
    if (firstRender) return;

    if (view === "calender") {
      if (calenderFetchHandler) {
        calenderFetchHandler(
          { startDate: model[0].date, endDate: model[model.length - 1].date },
          (data: any) => {
            if (data?.errors) return;
            setModel(data);
          }
        );
      }
    } else {
      refetch();
    }
  }, [view]);

  React.useEffect(() => {
    RowsInit(data, field, setModel, firstRender, setFirstRender);
  }, [data]);

  React.useEffect(() => {
    if (filters.length > 0) {
      HandleTableFilter(
        filters,
        setModel,
        fetchHandler,
        requestTransformer,
        setNoMoreData
      );
    }
  }, [filters]);

  const onScroll = (e: any) => {
    if (noMoreData) return;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      OnBottomScrollHandler(
        e,
        model,
        setModel,
        setNoMoreData,
        onEndReached,
        fetchHandler,
        filters,
        requestTransformer
      );
    }, 100);
  };

  const refetch = () => {
    if (fetchHandler) {
      fetchHandler(0, (data: any) => {
        if (data?.errors) return;
        else if (requestTransformer) data = requestTransformer(data);
        setModel(data);
      });
    }
  };

  return (
    <>
      {firstRender && (
        <div className="relative bottom-[155px]">
          <Loader />
        </div>
      )}
      <TableHeader
        field={field}
        model={model}
        setModel={setModel}
        onChange={onChange}
        showFloatingLabel={showFloatingLabel}
      />
      {formOptions.open && (
        <TableForm
          field={field}
          publicEstablishmentId={publicEstablishmentId}
          close={() =>
            setFormOptions((prev: any) => ({ ...prev, open: false }))
          }
          row={model[formOptions.index]}
          columns={columns}
          onValChange={(row: any, column, err) => {
            HandleSetRow(
              row,
              column,
              formOptions.index,
              err,
              setModel,
              onChangeRow
            );
          }}
        />
      )}
      <div
        id={"table" + field.title}
        ref={wrapperRef}
        style={{
          height: field?.height || "auto",
          maxHeight: field?.height || "auto",
        }}
        className=" rounded-md shadow-sm p-1 bg-gray-50 overflow-y-auto border border-gray-100 relative overflow-x-auto "
        onClick={() => setCellSelected(null)}
        onScroll={(e: any) => onScroll(e)}
      >
        {selectedIds.length > 0 && (
          <SelectionMenu
            onChangeRows={onChangeRows}
            columns={columns}
            route={route}
            setModel={setModel}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        )}
        {menuOptions.editPropertyIndex !== null &&
          menuOptions.editPropertyIndex !== undefined && (
            <EditPropertyMenu
              property={columns[menuOptions.editPropertyIndex]}
              index={menuOptions.editPropertyIndex}
              onDeleteProperty={() => {
                RemoveProperty(
                  menuOptions.editPropertyIndex,
                  columns,
                  setColumns,
                  onChangeColumns
                );
                setMenuOptions((prev: any) => ({
                  ...prev,
                  editPropertyIndex: null,
                }));
              }}
              close={() =>
                setMenuOptions((prev: any) => ({
                  ...prev,
                  editPropertyIndex: null,
                }))
              }
              wrapperRef={wrapperRef}
              onEditProperty={(property: any) => {
                EditProperty(
                  property,
                  columns,
                  setColumns,
                  menuOptions.editPropertyIndex,
                  setMenuOptions,
                  onChangeColumns
                );
              }}
            />
          )}
        {menuOptions.addProperty && (
          <AddTablePropertyMenu
            onAddProperty={(type: string, inputType?: string) => {
              AddColumn(
                type,
                columns,
                setColumns,
                inputType,
                onChangeColumns,
                setMenuOptions
              );
            }}
            close={() =>
              setMenuOptions((prev: any) => ({ ...prev, addProperty: false }))
            }
            wrapperRef={wrapperRef}
          />
        )}

        {menuOptions?.columnTarget && (
          <ColumnPopup
            setPropertyIndex={() =>
              setMenuOptions({
                editPropertyIndex: menuOptions.columnEditIndex,
                columnTarget: null,
              })
            }
            onEditProperty={(property: any) => {
              EditProperty(
                property,
                columns,
                setColumns,
                menuOptions.columnEditIndex,
                setMenuOptions,
                onChangeColumns
              );
            }}
            column={columns[menuOptions.columnEditIndex]}
            close={() =>
              setMenuOptions((prev: any) => ({ ...prev, columnTarget: null }))
            }
            target={menuOptions.columnTarget}
            setFilters={setFilters}
          />
        )}

        {filters.length > 0 && (
          <FiltersBar
            refetch={refetch}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        {view === "table" && (
          <table className="w-full rounded-md bg-white overflow-x-scroll relative table-fixed">
            <thead className="sticky top-[0] z-50 bg-white border-b border-gray-200 border-t">
              <tr>
                {columns.map(
                  (
                    column: {
                      name: string;
                    },
                    index: number
                  ) => {
                    return (
                      <HeaderItem
                        setColumns={setColumns}
                        selectAll={() => {
                          setSelectedIds(model.map((row: any) => row.id));
                        }}
                        deselectAll={() => setSelectedIds([])}
                        editColumns={field.editColumns ? true : false}
                        setCurrentProperty={(index: number) =>
                          setMenuOptions((prev: any) => ({
                            ...prev,
                            editPropertyIndex: index,
                          }))
                        }
                        setMenuOptions={setMenuOptions}
                        selectedIds={selectedIds}
                        column={column}
                        index={index}
                        key={column.name}
                        isResizing={dragOptions.isResizing}
                        setIsResizing={(v: any) =>
                          setDragOptions((prev: any) => ({
                            ...prev,
                            isResizing: v,
                          }))
                        }
                        setDragIndex={(index: number) =>
                          setDragOptions((prev: any) => ({
                            ...prev,
                            columnDragIndex: index,
                          }))
                        }
                        dragIndex={dragOptions.columnDragIndex}
                        onChangeColumns={onChangeColumns}
                        isHorizontalScroll={
                          wrapperRef.current?.scrollWidth >
                          wrapperRef.current?.clientWidth
                        }
                      />
                    );
                  }
                )}
              </tr>
            </thead>
            <tbody className="border border-gray-100">
              {model &&
                (model[field?.name] || model).map((row: any, index: number) => {
                  return (
                    <TableRow
                      key={row?.id || index}
                      row={row}
                      index={index}
                      field={field}
                      onSetCurrentDragIndex={(index: number) =>
                        setDragOptions((prev: any) => ({
                          ...prev,
                          rowDragIndex: index,
                        }))
                      }
                      currentDragIndex={dragOptions.rowDragIndex}
                      model={model}
                      columns={columns}
                      onChangeRow={onChangeRow}
                      onChange={onChange}
                      errors={{}}
                      cellSelected={cellSelected}
                      setCellSelected={setCellSelected}
                      setModel={setModel}
                      setClickMenuOptions={setClickMenuOptions}
                      setSelectedIds={setSelectedIds}
                      selectedIds={selectedIds}
                      setOpenFile={setOpenFile}
                      onChangeRows={onChangeRows}
                    />
                  );
                })}
              {onAddRow && (
                <tr className="border-t border-gray-100 hover:bg-gray-100 p-2 text-primary-300 hover:text-primary-600 cursor-pointer hover:shadow-md rounded-md bg-[rgba(255, 255, 255, 0.754)] backdrop-filter backdrop-blur-sm border ">
                  <AddNewRowCell
                    columns={columns}
                    onAddRow={onAddRow}
                    setModel={setModel}
                  />
                </tr>
              )}
            </tbody>
          </table>
        )}
        {view === "calender" && (
          <TableCalender
            model={model}
            columns={columns}
            fields={field}
            setClickMenuOptions={setClickMenuOptions}
          />
        )}
        {view === "cards" && (
          <TableCards
            setFormOptions={setFormOptions}
            model={model}
            columns={columns}
            fields={field}
            setClickMenuOptions={setClickMenuOptions}
          />
        )}
      </div>

      {openFile && (
        <FileViewerModal file={openFile} close={() => setOpenFile(null)} />
      )}

      {clickMenuOptions.position.x !== 0 && (
        <>
          <TableClickMenu
            close={() =>
              setClickMenuOptions({
                position: { x: 0, y: 0 },
                row: null,
                type: null,
              })
            }
            setShowForm={() =>
              setFormOptions((prev: any) => ({
                ...prev,
                open: true,
                row: clickMenuOptions.row,
                index: clickMenuOptions.index,
              }))
            }
            clickMenuOptions={clickMenuOptions}
            deleteRow={() => {
              model.length === 1
                ? alert("You can't delete the last row")
                : RowDelete(
                    setModel,
                    clickMenuOptions,
                    setClickMenuOptions,
                    onDeleteRow
                  );
            }}
          />
          <div
            onClick={() =>
              setClickMenuOptions({
                position: { x: 0, y: 0 },
                row: null,
                type: null,
              })
            }
            style={{ background: "transparent" }}
            className="modal-overlay"
          ></div>
        </>
      )}
    </>
  );
}

export default TableElement;
