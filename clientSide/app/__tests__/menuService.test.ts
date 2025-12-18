import { apiRequest } from "../lib/api-client";
import { menuService } from "../services/menu.service";
import { MenuItem, ReqCalPrice, ResCalPrice } from "../types";

jest.mock("../lib/api-client", () => ({
  apiRequest: jest.fn(),
}));

describe("menuService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getMenu should call apiRequest and return menu items", async () => {
    const mockMenu: MenuItem[] = [
      { name: "RED", price: 50 },
      { name: "GREEN", price: 40 },
    ];

    (apiRequest as jest.Mock).mockResolvedValue(mockMenu);

    const result = await menuService.getMenu();

    expect(apiRequest).toHaveBeenCalledWith(
      "http://localhost:9000/api/menu/menus"
    );
    expect(result).toEqual(mockMenu);
  });

  it("calculate should call apiRequest with correct body and return result", async () => {
    const mockReq: ReqCalPrice = {
      items: ["GREEN", "RED"],
      hasMember: true,
    };

    const mockRes: ResCalPrice = {
      subtotal: 90,
      discount: 9,
      total: 81,
    };

    (apiRequest as jest.Mock).mockResolvedValue(mockRes);

    const result = await menuService.calculate(mockReq);

    expect(apiRequest).toHaveBeenCalledWith(
      "http://localhost:9000/api/menu/calculate",
      {
        method: "POST",
        body: JSON.stringify(mockReq),
        headers: { "Content-Type": "application/json" },
      }
    );

    expect(result).toEqual(mockRes);
  });
});
