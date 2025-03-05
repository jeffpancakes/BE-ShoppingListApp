const request = require("supertest");
const app = require("../app");

describe("Shopping List API - CRUD tests", () => {

  test("GET /shopping-list/lists - should return all active shopping lists", async () => {
    const response = await request(app).get("/shopping-list/lists");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);

    response.body.data.forEach((list) => {
      expect(list.archived).toBe(false);
    });
  });

  test("GET /shopping-list/lists/archived - should return all archived shopping lists", async () => {
    const response = await request(app).get("/shopping-list/lists/archived");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);

    response.body.data.forEach((list) => {
      expect(list.archived).toBe(true);
    });
  });

  test("GET /shopping-list/list/:listID - should return a shopping list by ID", async () => {
    const validListID = "0fe2d73c5eaf6c32eec48e12";

    const response = await request(app).get(`/shopping-list/list/${validListID}`);

    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty("error", "List not found");
    } else {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data.id).toBe(validListID);
    }
  });

  test("POST /shopping-list/create - should create a new shopping list", async () => {
    const newList = {
      name: "Test List",
      items: [{ id: "87622eeeb2bc7414fd60a87a", solved: false }],
      members: [{ id: "673c799e3e0a3bf1fd1362b3" }]
    };

    const response = await request(app)
      .post("/shopping-list/create")
      .send(newList);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.name).toBe(newList.name);
    expect(response.body.data.archived).toBe(false);
  });

  test("PUT /shopping-list/update/:listID - should update an existing shopping list", async () => {
    const validListID = "0fe2d73c5eaf6c32eec48e12";
    const updateData = {
      name: "Updated List Name",
      archived: true
    };

    const response = await request(app)
      .put(`/shopping-list/update/${validListID}`)
      .send(updateData);

    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty("error", "List not found");
    } else {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.archived).toBe(updateData.archived);
    }
  });

  test("DELETE /shopping-list/delete/:listID - should delete a shopping list", async () => {
    const validListID = "0fe2d73c5eaf6c32eec48e12";

    const response = await request(app).delete(`/shopping-list/delete/${validListID}`);

    if (response.statusCode === 404) {
      expect(response.body).toHaveProperty("error", "List not found");
    } else {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message", "List deleted successfully");
    }
  });
});