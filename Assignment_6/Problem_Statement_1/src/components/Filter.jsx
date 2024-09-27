function Filter({ filter, setFilter }) {
  return (
    <div className="flex flex-col space-y-4">
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded-full transition ${
          filter === "all"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-4 py-2 rounded-full transition ${
          filter === "active"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-4 py-2 rounded-full transition ${
          filter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default Filter;
