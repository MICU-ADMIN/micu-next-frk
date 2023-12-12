"use client";
import React, { useCallback } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Connection, Edge } from "reactflow";
import "reactflow/dist/base.css";
import CustomNode from "./CustomNode";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import Loader from "../Loader/Loader";

const nodeTypes = {
  custom: CustomNode,
};
type IsnadViewerProps = {
  close: () => void;
  isnadData: any;
};

export type ScholarNodeData = {
  id: number;
  name: string;
  bornAt: string;
  diedAt: string;
  icon?: any;
  designation: string;
  livedIn: string;
};

const IsnadViewer = ({ close, isnadData }: IsnadViewerProps) => {
  const [loading, setLoading] = React.useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  React.useEffect(() => {
    if (isnadData) {
      fetchNarrators(isnadData.isnad);
    }
  }, [isnadData]);

  const fetchNarrators = async (ids: number[]) => {
    setLoading(true);

    try {
      const data = (await requestHandler({
        route: "isnad-data?ids=" + JSON.stringify(ids),
        type: "get",
        shouldCache: true,
        returnCache: true,
      })) as ScholarNodeData[];

      const newNodes = [] as any;
      const newEdges = [] as any;

      let basePosition = 0;
      let index = 0;

      for (const d of data) {
        newNodes.push({
          id: d.id.toString(),
          type: "custom",
          data: d,
          position: { x: 0, y: basePosition },
        });

        newEdges.push({
          id: d.id.toString(),
          source: d.id.toString(),
          target: data[index + 1] ? data[index + 1].id.toString() : null,
        });

        basePosition += 80;
        index++;
      }
      setLoading(false);
      setNodes(newNodes);
      setEdges(newEdges);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <>
      <div className="w-full h-[50vh] border-l border-gray-100  border-t slideInDown hidden md:block relative">
        <p className="absolute top-[10px] right-4 cursor-pointer z-50" onClick={close}>
          X
        </p>
        {!loading ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={() => {}}
            nodeTypes={nodeTypes}
            edgesUpdatable={false}
            fitView
            className="bg-white"
            proOptions={{ hideAttribution: true }}
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        ) : (
          <Loader />
        )}
      </div>

      <div className="md:hidden block fixed top-0 left-0 w-full h-screen bg-white z-50 growIn">
        <p className="absolute top-2 right-2 cursor-pointer z-50" onClick={close}>
          X
        </p>
        <div className="h-screen w-screen border-l border-gray-100  border-t ">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            proOptions={{ hideAttribution: true }}
            fitView
            className="bg-white"
          >
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </>
  );
};

export default IsnadViewer;
