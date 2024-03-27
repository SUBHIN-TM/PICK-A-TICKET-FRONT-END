import React from "react";

const ShowTime = () => {
  const currentDate = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [currentDate];

  // Generate dates for the next 3 days
  for (let i = 1; i <= 3; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    dates.push(nextDate);
  }

  return (
    <div className="bg-gray-600 h-96 p-11">
      <div>
        <h1 className="text-white text-2xl">Show Time</h1>
      </div>
      <div>
        {dates.map((date, index) => (
          <button key={index}>
            {date.getDate()}/{date.getMonth() + 1} ({days[date.getDay()]})
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowTime;
