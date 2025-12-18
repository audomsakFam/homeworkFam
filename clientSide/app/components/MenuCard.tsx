"use client";

import { useEffect, useState } from "react";
import { MenuItem, ReqCalPrice, ResCalPrice } from "../types";
import { menuService } from "../services/menu.service";
import MenuTable from "./MenuTable";

const MenuCard = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalaulate, setIsCalaulate] = useState(false);
  const [calResult, setCalResult] = useState<ResCalPrice | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [hasMember, setHasMember] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setIsLoading(true);
        const res = await menuService.getMenu();
        setMenuItems(res);
      } catch (err) {
        console.error(`failed to fetch: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleCalculate = () => {
    const items: string[] = [];

    Object.entries(quantities).forEach(([name, qty]) => {
      for (let i = 0; i < qty; i++) {
        items.push(name);
      }
    });

    if (items.length == 0) return alert("กรุณาเลือกอย่างน้อย 1 รายการ");

    const body: ReqCalPrice = {
      items: items,
      hasMember: hasMember,
    };

    calculate(body);
  };

  const calculate = async (items: ReqCalPrice) => {
    try {
      const res = await menuService.calculate(items);
      setCalResult(res);
    } catch (err) {
      console.error(`failed to calculate: ${err}`);
    } finally {
      setIsCalaulate(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-indigo-600 px-8 py-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="p-2 bg-indigo-500 rounded-lg">🍽️</span>
          ระบบคำนวณราคาเมนูอาหาร
        </h1>
        <p className="text-indigo-100 mt-1">
          เลือกรายการอาหารที่ต้องการคำนวณราคา
        </p>
      </div>
      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-100">
          <MenuTable
            menuItems={menuItems}
            isLoading={isLoading}
            isCalaulate={isCalaulate}
            calResult={calResult}
            quantities={quantities}
            setQuantities={setQuantities}
          />
        </div>
      </div>
      {!isCalaulate ? (
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center gap-4">
          <div className="text-sm text-gray-500 italic">
            <input
              type="checkbox"
              id="member"
              name="member"
              checked={hasMember}
              onChange={(e) => setHasMember(e.target.checked)}
            />
            <label htmlFor="member">* สมาชิก (ถ้ามี)</label>
          </div>
          <button
            type="button"
            onClick={handleCalculate}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>คำนวนราคา</span>
          </button>
        </div>
      ) : (
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setIsCalaulate(!isCalaulate);
              setQuantities({});
              setCalResult(null);
              setHasMember(false);
            }}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>เลือกใหม่</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
