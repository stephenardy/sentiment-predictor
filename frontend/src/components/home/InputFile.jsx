import SvgComponent from "./SvgFile";

function InputFile({ onUploadFile }) {
  return (
    <label className="flex flex-col items-center justify-center w-full h-64  gap-1 border-2 border-dashed rounded-lg cursor-pointer bg-gray-100 text-gray-500 hover:text-gray-700 hover:border-gray-400 hover:bg-gray-200 transition">
      <SvgComponent />
      <p>
        <strong>Click to upload</strong> or drag and drop
      </p>
      <p>.csv or .xlsx file only</p>
      <input type="file" className="hidden" onChange={onUploadFile} />
    </label>
  );
}
export default InputFile;
