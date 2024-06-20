import React, { useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import { GraphLink, GraphNode } from "../../../types";
import { toast } from "react-toastify";
import ToggleSwitch from "../../../components/Button/ToggleSwitch";

interface GraphViewProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

const GraphView: React.FC<GraphViewProps> = ({ nodes, links }) => {
  const [is3D, setIs3D] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const nodesCopy: GraphNode[] = nodes.map((node) => ({ ...node }));
    const linksCopy: GraphLink[] = links.map((link) => ({ ...link }));

    const colorCenters: { [color: string]: { y: number } } = {};
    const colorGroups: { [color: string]: GraphNode[] } = {};

    nodesCopy.forEach((node) => {
      if (!colorGroups[node.color]) {
        colorGroups[node.color] = [];
      }
      colorGroups[node.color].push(node);
    });

    let i = 0;
    const colors = Object.keys(colorGroups);
    const yStep = 100;

    // Assign y positions for each color group and distribute x positions
    colors.forEach((color) => {
      const yPosition = i * yStep;
      colorCenters[color] = { y: yPosition };
      const group = colorGroups[color];

      // Distribute nodes along the x-axis
      const xStart = -((group.length - 1) * 50) / 2;
      group.forEach((node, index) => {
        node.fx = xStart + index * 50; // fixed x position
        node.fy = yPosition; // fixed y position
      });

      i++;
    });

    setGraphData({ nodes: nodesCopy, links: linksCopy });
  }, [nodes, links]);

  const nodeCanvasObject = React.useCallback(
    (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      if (node === undefined) return;
      const label = node.id;
      const fontSize = 12 / globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.fillStyle = node.color;
      if (node.type === "coach") {
        // Draw coach node as a rectangle
        ctx.fillRect(node.x - 6, node.y - 6, 12, 12);
      } else {
        // Draw other nodes as circles
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.stroke();
      }
      ctx.fillStyle = "#000000";
      ctx.fillText(label, node.x + 10, node.y + 3);
    },
    []
  );

  const nodeThreeObject = React.useCallback((node: GraphNode) => {
    if (node.type === "coach") {
      // Draw coach node as a box
      const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
      const material = new THREE.MeshBasicMaterial({ color: node.color });
      return new THREE.Mesh(geometry, material);
    } else {
      // Draw other nodes as spheres
      const geometry = new THREE.SphereGeometry(5);
      const material = new THREE.MeshBasicMaterial({ color: node.color });
      return new THREE.Mesh(geometry, material);
    }
  }, []);

  const linkThreeObject = React.useCallback((link: GraphLink) => {
    const material = new THREE.LineBasicMaterial({ color: link.color });
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(2 * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return new THREE.Line(geometry, material);
  }, []);

  const linkPositionUpdate = React.useCallback(
    (link: any, { start, end }: any) => {
      const positions = link.geometry.attributes.position.array;
      positions[0] = start.x;
      positions[1] = start.y;
      positions[2] = start.z;
      positions[3] = end.x;
      positions[4] = end.y;
      positions[5] = end.z;
      link.geometry.attributes.position.needsUpdate = true;
    },
    []
  );
  const handleLinkClick = React.useCallback((link: GraphLink) => {
    toast.info(link.description);
  }, []);
  const handleToggle = (checked: boolean) => {
    setIs3D(checked);
  };
  return (
    <div className="w-4/6 h-full flex">
      <div className="p-3 bg-black w-full overflow-hidden">
        <ToggleSwitch
          label="3D Mode"
          color={"purple"}
          initialChecked={is3D}
          onToggle={handleToggle}
        />

        {is3D ? (
          <ForceGraph3D
            graphData={graphData}
            nodeAutoColorBy={(node: GraphNode) => node.color}
            nodeThreeObject={nodeThreeObject}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkThreeObjectExtend={true}
            linkThreeObject={linkThreeObject}
            linkPositionUpdate={linkPositionUpdate}
            nodeLabel={(node: GraphNode) => node.id}
            onLinkClick={handleLinkClick}
          />
        ) : (
          <ForceGraph2D
            graphData={graphData}
            nodeCanvasObject={nodeCanvasObject}
            nodeLabel={(node: GraphNode) => node.id}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkWidth={1.5}
            linkColor={(link: GraphLink) => link.color}
            onLinkClick={handleLinkClick}
          />
        )}
      </div>
    </div>
  );
};

export default GraphView;
