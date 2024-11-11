import React from 'react';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  // Assuming the history items are in Redux state under `history.items`
//   const historyItems = useSelector((state) => state.history.items);

  return (
    <div className="w-64 bg-base-200 border-r h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#f58220] text-[#ffffff] p-4">
        <h2 className="text-xl font-medium">History</h2>
      </div>

      {/* History List */}
      <ul className="flex-1 overflow-y-auto p-2 space-y-1">
      <ul className="flex-1 overflow-y-auto space-y-2">
        {/* Placeholder history items */}
        <li className="p-2 rounded-md hover:bg-primary hover:text-primary-content cursor-pointer">
          Previous Chat 1
        </li>
        <li className="p-2 rounded-md hover:bg-primary hover:text-primary-content cursor-pointer">
          Previous Chat 2
        </li>
      </ul>
        {/* {historyItems.map((item) => (
          <li key={item.id} className="p-2 rounded-md hover:bg-primary hover:text-primary-content cursor-pointer">
            <div className="flex justify-between items-center">
              <p className="font-medium">{item.type === 'upload' ? '📄 Document' : '🔍 Search'}</p>
              <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleTimeString()}</span>
            </div>
            <p className="text-sm text-gray-700 truncate">{item.content}</p>
          </li>
        ))} */}
      </ul>

      {/* Footer */}
      <div className="bg-base-300 p-4">
        <button className="btn focus:outline-none text-white bg-[#000000] hover:bg-[#F39200] focus:ring-4 focus:ring-[#F39200] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
