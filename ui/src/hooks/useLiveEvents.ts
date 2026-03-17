import { useEffect } from "react";
import type { LiveEvent } from "@paperclipai/shared";
import { useCompany } from "../context/CompanyContext";

export function useLiveEvents(companyId: string, onEvent: (event: LiveEvent) => void) {
  const { selectedCompanyId } = useCompany();

  useEffect(() => {
    if (!companyId || companyId !== selectedCompanyId) return;

    let closed = false;
    let socket: WebSocket | null = null;

    const connect = () => {
      if (closed) return;
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      const url = `${protocol}://${window.location.host}/api/companies/${encodeURIComponent(companyId)}/events/ws`;
      socket = new WebSocket(url);

      socket.onmessage = (message) => {
        const raw = typeof message.data === "string" ? message.data : "";
        if (!raw) return;
        try {
          const parsed = JSON.parse(raw) as LiveEvent;
          onEvent(parsed);
        } catch {
          // Ignore
        }
      };

      socket.onerror = () => {
        socket?.close();
      };

      socket.onclose = () => {
        if (closed) return;
        setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      closed = true;
      if (socket) {
        socket.close();
      }
    };
  }, [companyId, selectedCompanyId, onEvent]);
}
