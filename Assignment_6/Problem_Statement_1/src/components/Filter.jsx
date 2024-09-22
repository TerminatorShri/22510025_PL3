function Filter({ filter, setFilter }) {
  return (
    <div className="flex justify-center mt-4 space-x-4">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded-md ${
          filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-3 py-1 rounded-md ${
          filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-3 py-1 rounded-md ${
          filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default Filter;
