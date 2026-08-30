import { useSearchParams } from "react-router";

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") || "all";

  const handleStatusChange = (newStatus) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newStatus === "all") {
      newSearchParams.delete("status");
    } else {
      newSearchParams.set("status", newStatus);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <label htmlFor="status-filter">Status: </label>

      <select
        id="status-filter"
        value={status}
        onChange={(event) =>
          handleStatusChange(event.target.value)
        }
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

export default StatusFilter;