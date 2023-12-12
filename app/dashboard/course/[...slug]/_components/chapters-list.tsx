"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { CourseChapter } from "@/_types/dbTypes";
import Badge from "@/app/components/Elements/Badge/Badge";
import dynamic from "next/dynamic";
import { request } from "http";
import { requestHandler } from "@/app/_helpers/web/requestHandler";

// const DragDropContext = dynamic(() => import("@hello-pangea/dnd").then((mod) => mod.DragDropContext), { ssr: false });
// const Droppable = dynamic(() => import("@hello-pangea/dnd").then((mod) => mod.Droppable), { ssr: false });
// const Draggable = dynamic(() => import("@hello-pangea/dnd").then((mod) => mod.Draggable), { ssr: false });
// const DropResult = dynamic(() => import("@hello-pangea/dnd").then((mod) => mod.DropResult), { ssr: false });

// import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  items: CourseChapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: number) => void;
}

const ChaptersList = ({ items, onReorder, onEdit }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id == chapter.id),
    })) as { id: number; position: number }[];

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable key={chapter.id} draggableId={chapter.positionInCourse.toString()} index={index}>
                {(provided) => (
                  <div
                    className={`flex items-center gap-x-2 bg-indigo-100  rounded-md mb-4 text-sm ${
                      chapter.isPublished ? "bg-indigo-200 text-indigo-500 border border-indigo-300" : "text-gray-700"
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={`px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition ${
                        chapter.isPublished ? " hover:bg-indigo-200 border-r border-r-indigo-300" : ""
                      }`}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree ? <Badge>Free</Badge> : null}
                      <Badge className={` text-white bg-indigo-500 ${chapter.isPublished ? "bg-green-500" : ""}`}>
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil onClick={() => onEdit(chapter.id)} className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
