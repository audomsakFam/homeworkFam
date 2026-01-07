const HeroTable = () => {
  return (
    <>
      <div className="relative overflow-hidden bg-white shadow-md rounded-xl border border-slate-200">
        <table className="w-full text-sm text-left text-slate-600">
          {/* Header: ปรับให้ตัวเล็ก หนา และเป็นตัวพิมพ์ใหญ่เล็กน้อยเพื่อความโปร */}
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

          {/* Body: เพิ่ม Hover Effect และ Transition */}
          <tbody className="divide-y divide-slate-100">
            {/* สมมติว่า map ข้อมูลจาก heroes array */}
            <tr className="bg-white hover:bg-indigo-50/30 transition-colors duration-200 group">
              <td className="px-6 py-4 font-medium text-slate-900">
                {/* ใช้ dangerouslySetInnerHTML สำหรับชื่อที่โดน Highlight */}
                <div
                  className="whitespace-nowrap"
                  dangerouslySetInnerHTML={{ __html: "<b>au</b>domsak" }}
                />
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Tech
                </span>
              </td>
            </tr>

            {/* แถวตัวอย่างที่ 2 */}
            <tr className="bg-white hover:bg-indigo-50/30 transition-colors duration-200 group">
              <td className="px-6 py-4 font-medium text-slate-900">
                <div
                  dangerouslySetInnerHTML={{ __html: "audomsak<b>V2</b>" }}
                />
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Super Tech
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* กรณีไม่มีข้อมูล (Empty State) */}
        {/* <div className="py-12 text-center text-slate-400">No heroes found.</div> */}
      </div>
    </>
  );
};

export default HeroTable;
