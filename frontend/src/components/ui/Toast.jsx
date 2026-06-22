/**
 * Toast notification system.
 *
 * Usage:
 *   const toast = useToast();
 *   toast.success("Room added!");
 *   toast.error("Something went wrong");
 *   toast.info("Heads up...");
 */
import { createContext, useCallback, useContext, useState } from "react";
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiXMark } from "react-icons/hi2";

const ToastContext = createContext();

const STYLES = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
};

const ICONS = {
  success: HiCheckCircle,
  error: HiExclamationCircle,
  info: HiInformationCircle,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => remove(id), duration);
  }, [remove]);

  const api = {
    success: (msg, d) => push(msg, "success", d),
    error: (msg, d) => push(msg, "error", d),
    info: (msg, d) => push(msg, "info", d),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 w-[90vw] max-w-sm">
        {toasts.map((t) => {
          const Icon = ICONS[t.type];
          return (
            <div
              key={t.id}
              className={`${STYLES[t.type]} text-white rounded-xl shadow-2xl px-4 py-3 flex items-start gap-3 animate-[fadein_0.2s_ease-out]`}
            >
              <Icon className="text-xl shrink-0 mt-0.5" />
              <p className="text-sm font-medium flex-1">{t.message}</p>
              <button onClick={() => remove(t.id)} className="opacity-80 hover:opacity-100">
                <HiXMark className="text-lg" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
