import React from 'react';

function DrawerBackdrop({ onClick }) {
  return (
    <div
      className="fixed inset-0 z-30 bg-black opacity-50"
      onClick={onClick}
    ></div>
  );
}

export default DrawerBackdrop;