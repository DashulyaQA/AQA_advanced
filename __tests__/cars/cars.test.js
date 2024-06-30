import axios from "axios";
import CarsController from "../../src/controllers/CarsController";

const carsController = new CarsController();

describe("Check Cars API", () => {
  beforeAll(async () => {
    await carsController.login();
  });

  afterAll(async () => {
    const carsResponse = await carsController.getCars();
    const carIds = carsResponse.data.data.map((c) => c.id);
    for (const carId of carIds) {
      const res = await carsController.deleteCarById(carId);
    }
  });

  test("User can get all cars", async () => {
    const carsResponse = await carsController.getCars();
    expect(carsResponse.status).toBe(200);
  });

  // Positive tests

  test("Creat all cars with all models", async () => {
    const brandsResponse = await carsController.getBrands();
    const brands = brandsResponse.data.data;

    const modelsResponse = await carsController.getModels();
    const models = modelsResponse.data.data;

    for (const brand of brands) {
      const brandModels = models.filter(
        (model) => model.carBrandId === brand.id
      );
      for (const model of brandModels) {
        const response = await carsController.createCar(
          brand.id,
          model.id,
          777
        );
        expect(response.status).toBe(201);
        expect(response.data).toHaveProperty("data");
      }
    }
  });

  // Negative tests

  test("Create car with invalid brand id", async () => {
    try {
      await carsController.createCar(999999, 1, 1);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Create car with invalid model id", async () => {
    try {
      await carsController.createCar(1, 999999, 1);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Create car with empty mileage", async () => {
    try {
      await carsController.createCar(1, 1, "");
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});
