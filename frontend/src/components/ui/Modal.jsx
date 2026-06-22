/**
 * Reusable Modal Component
 *
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - title: string
 * - children: ReactNode
 */

import { HiXMark } from "react-icons/hi2";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            <HiXMark className="text-2xl text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;