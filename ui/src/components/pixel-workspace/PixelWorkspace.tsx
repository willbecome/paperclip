import React, { useEffect, useRef } from "react";
import { useLiveEvents } from "../../hooks/useLiveEvents";

interface PixelAgent {
  id: string;
  x: number;
  y: number;
  state: string;
  frame: number;
}

export function PixelWorkspace({ companyId }: { companyId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const agentsRef = useRef<{ [id: string]: PixelAgent }>({});

  useLiveEvents(companyId, (event) => {
    if (event.type === "agent.status") {
      const { agentId, status } = event.payload as { agentId: string; status: string };

      if (!agentsRef.current[agentId]) {
        agentsRef.current[agentId] = {
          id: agentId,
          x: Math.random() * 600 + 50,
          y: Math.random() * 300 + 50,
          state: "idle",
          frame: 0,
        };
      }

      agentsRef.current[agentId].state = status;
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;

    const renderLoop = (time: number) => {
      const deltaTime = time - lastTime;
      const tick = deltaTime > 200;
      if (tick) lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = "#1e1e2e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw agents
      Object.values(agentsRef.current).forEach((agent) => {
        if (tick) {
          agent.frame = (agent.frame + 1) % 4;
        }

        // Table
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(agent.x - 10, agent.y + 20, 40, 15);

        // Character
        if (agent.state === "typing" || agent.state === "running") {
          const bounce = agent.frame % 2 === 0 ? -2 : 0;
          ctx.fillStyle = "#f9e2af"; // Yellow
          ctx.fillRect(agent.x, agent.y + bounce, 20, 20);

          ctx.fillStyle = "#fff";
          ctx.font = "12px monospace";
          ctx.fillText("typing...", agent.x - 10, agent.y - 10);
        } else if (agent.state === "error") {
          ctx.fillStyle = "#f38ba8"; // Red
          ctx.fillRect(agent.x, agent.y, 20, 20);
          ctx.fillText("❌", agent.x, agent.y - 10);
        } else {
          ctx.fillStyle = "#89b4fa"; // Blue
          ctx.fillRect(agent.x, agent.y, 20, 20);
          ctx.fillText("Zzz", agent.x + 15, agent.y - (agent.frame * 2));
        }

        // Name
        ctx.fillStyle = "#cdd6f4";
        ctx.font = "10px sans-serif";
        ctx.fillText(agent.id.slice(0, 8), agent.x - 10, agent.y + 45);
      });

      animationId = requestAnimationFrame(renderLoop);
    };

    animationId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="rounded-lg bg-[#11111b] p-5" data-testid="pixel-workspace">
      <h3 className="mb-2 text-sm font-medium text-[#cdd6f4]">Pixel Agents Workspace</h3>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full rounded border-2 border-[#313244]"
      />
    </div>
  );
}
