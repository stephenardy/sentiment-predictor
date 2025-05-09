import { Link } from "react-router-dom";

function Visualize({ results }) {
  // const res = console.log(results);
  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <p className="font-bold">This is Visualization page</p>
        <Link to="/" className="hover:text-blue-500">
          Back to Home
        </Link>
        {/* <p>{res}</p> */}
      </div>

      <div className="flex justify-center mt-4">
        <table className="min-w-5/6 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tweet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sentiment
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {results?.map((result, index) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.original_text}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.sentiment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Visualize;
