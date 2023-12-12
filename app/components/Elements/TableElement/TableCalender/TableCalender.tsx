import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "@/app/calender.css";

type Props = {
  model: any[];
  columns: any[];
  fields: any[];
  setClickMenuOptions: (options: any) => void;
};

function TableCalender({ model, columns, fields, setClickMenuOptions }: Props) {
  const [events, setEvents] = React.useState([]) as any[];

  React.useEffect(() => {
    const curEvents = [] as any[];
    for (const row of model) {
      const curRow = {
        ...row.model,
        start: row.createdAt,
        end: row.createdAt + 1000 * 60 * 60 * 24,
        id: row.id,
        createdAt: row.createdAt,
        value: row?.label || "",
        userId: row.userId,
      };
      curEvents.push(curRow);
    }
    setEvents(curEvents);
  }, [model]);

  function renderEventContent(eventInfo: {
    event: { id: any; title: any };
    extendedProps: { index: any; id: any; value: any };
    timeText: string;
  }) {
    return (
      <div
        className="flex flex-row items-center space-x-2  p-1 bg-primary-200 outline-none cursor-pointer hover:bg-primary-300 hover:shadow-lg"
        onClick={(e) => {
          const index = model.findIndex(
            (row: { id: any }) => row.id == eventInfo.extendedProps?.id
          );
          setClickMenuOptions({
            index: index,
            position: {
              x: e.clientX,
              y: e.clientY,
            },
            row: eventInfo.extendedProps,
          });
        }}
      >
        <div className="w-3 h-3 rounded-full bg-primary-500"></div>
        <b>{eventInfo.timeText}</b>
        <div className=" rounded p-1">
          <i
            dangerouslySetInnerHTML={{
              __html:
                eventInfo.extendedProps?.value ||
                eventInfo.extendedProps?.index ||
                "",
            }}
          ></i>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white border border-gray-200 rounded p-5">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}

// a custom render function

export default TableCalender;
