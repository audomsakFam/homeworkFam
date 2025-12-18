import { CalPriceInput, CalResult } from "../types";
export declare class MenuService {
    getMenu(): {
        name: string;
        price: number;
    }[];
    calculate(input: CalPriceInput): CalResult;
    private calSubtotal;
    private calDiscount;
}
//# sourceMappingURL=menu.service.d.ts.map