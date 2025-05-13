function ColumnDetail({
  isChecked,
  commentCol,
  timestampCol,
  setIsChecked,
  setCommentCol,
  setTimestampCol,
}) {
  return (
    <div className="flex flex-col w-1/2 gap-2">
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="comments column name"
          className="col-span-1 text-sm py-1 pl-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          value={commentCol}
          onChange={(e) => setCommentCol(e.target.value)}
        />
        {isChecked && (
          <input
            type="text"
            placeholder="timestamp column name"
            className="col-span-1 text-sm py-1 pl-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={timestampCol}
            onChange={(e) => setTimestampCol(e.target.value)}
          />
        )}
      </div>
      <label className="text-sm">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            setTimestampCol("");
          }}
        />
        My dataset has a timestamp
      </label>
    </div>
  );
}
export default ColumnDetail;
