import { Heroes } from "@/app/types";

type Props = {
  data: Heroes[] | null;
};

const HeroTable = ({ data }: Props) => {
  return (
    <>
      <div className="relative overflow-hidden bg-white shadow-md rounded-xl border border-slate-200">
        {data && data.length > 0 ? (
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs uppercase tracking-wider text-slate-500 bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Hero Name
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Special Power
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white hover:bg-indigo-50/30 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    <div
                      className="whitespace-nowrap"
                      dangerouslySetInnerHTML={{
                        __html: item.highlightedName || item.name,
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      dangerouslySetInnerHTML={{
                        __html: item.highlightedPower || item.power,
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center text-slate-400">
            No heroes found.
          </div>
        )}
      </div>
    </>
  );
};

export default HeroTable;
