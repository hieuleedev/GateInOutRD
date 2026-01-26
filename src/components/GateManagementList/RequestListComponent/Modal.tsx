import React from 'react';

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[380px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
