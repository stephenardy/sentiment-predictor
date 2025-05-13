function Upload() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-2/3 h-fit p-4 gap-2 bg-white rounded-2xl shadow-xl">
        <label className="flex flex-col items-center justify-center w-full h-64  gap-1 border-2 border-dashed rounded-lg cursor-pointer bg-gray-100 text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-200 transition">
          <SvgComponent />
          <p>
            <strong>Click to upload</strong> or drag and drop
          </p>
          <p>.csv or .xlsx file only</p>
          <input type="file" className="hidden" onChange={handleUploadFile} />
        </label>
        {file && fileName && <p className="underline font-light">{fileName}</p>}
        <div
          className={`flex items-center ${
            file && fileName ? "justify-between" : "justify-end"
          }`}
        >
          {file && fileName && (
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Input comments column name"
                className="border rounded py-1 pl-2 text-sm"
                value={commentCol}
                onChange={(e) => setCommentCol(e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                    setTimestampCol("");
                  }}
                />
                Does your file have a timestamp?
              </label>
              {isChecked && (
                <input
                  type="text"
                  placeholder="Input timestamp column name"
                  className="border rounded py-1 pl-2 text-sm"
                  value={timestampCol}
                  onChange={(e) => setTimestampCol(e.target.value)}
                />
              )}
            </div>
          )}
          <button
            onClick={handlePredict}
            className={`p-3 rounded-xl ${
              file &&
              fileName &&
              commentCol !== "" &&
              (!isChecked || timestampCol !== null)
                ? "text-white bg-blue-500 hover:bg-blue-700 cursor-pointer"
                : "text-gray-500 bg-gray-200 cursor-not-allowed disabled"
            } `}
          >
            Predict
          </button>
        </div>
      </div>
    </div>
  );
}
export default Upload;
