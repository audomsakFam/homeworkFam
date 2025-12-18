"use client";

import { MenuItem, ResCalPrice } from "../types";
type Props = {
  menuItems: MenuItem[];
  isLoading: boolean;
  isCalaulate: boolean;
  calResult: ResCalPrice | null;
  quantities: Record<string, number>;
  setQuantities: (
    value:
      | Record<string, number>
      | ((prev: Record<string, number>) => Record<string, number>)
  ) => void;
};
const MenuTable = ({
  menuItems,
  isLoading,
  isCalaulate = false,
  calResult,
  quantities,
  setQuantities,
}: Props) => {
  const handleInputChange = (name: string, value: string) => {
    const qty = parseInt(value) || 0;
    setQuantities((prev) => ({
      ...prev,
      [name]: qty,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {!isCalaulate && !calResult ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-2">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  รายการ
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  ราคา (บาท)
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  จำนวนที่ต้องการ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {menuItems &&
                menuItems.map((v, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-700">
                        {v.name} set
                      </span>
                    </td>
                    <td className="px-6 py-4">{v.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        value={quantities[v.name] || ""}
                        onChange={(e) =>
                          handleInputChange(v.name, e.target.value)
                        }
                        className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 bg-white">
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">
              สรุปรายการสั่งซื้อ
            </h2>

            <div className="space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-gray-600">
                <span className="text-base">ราคา (Subtotal):</span>
                <span className="font-semibold text-lg">
                  ฿{calResult?.subtotal?.toLocaleString()}
                </span>
              </div>

              {/* Discount */}
              <div className="flex justify-between items-center text-rose-500">
                <span className="text-base">ส่วนลด (Discount):</span>
                <span className="font-semibold text-lg">
                  - ฿{calResult?.discount?.toLocaleString()}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-gray-200 my-4"></div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                  ราคาหลังลด (Total):
                </span>
                <span className="text-2xl font-extrabold text-indigo-500">
                  ฿{calResult?.total?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuTable;
