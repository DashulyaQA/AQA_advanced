const axios = require("axios");

test("GET responds have property completed is true", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos/4");
  expect(res.status).toBe(200);
  expect(res.data).toHaveProperty("completed", true);
});

test("GET typicode.com/posts are less or equal 100", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  expect(res.status).toBe(200);
  expect(res.data.length).toBeLessThanOrEqual(100);
});

test("GET typicode.com/posts/1/comments returns array of comments and have property 'email' and 'postId", async () => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1/comments"
  );
  expect(Array.isArray(res.data)).toBe(true);
  res.data.forEach((coment) => {
    expect(coment).toHaveProperty("email");
    expect(coment).toHaveProperty("postId");
  });
  expect(res.status).toBe(200);
});

test("POST post have property ID", async () => {
  const res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
    title: "Hello Darria",
    body: "Today was perfect day",
  });
  expect(res.status).toBe(201);
  expect(res.data).toHaveProperty("id");
  console.log(res.data);
});

test("POST checking responds field values", async () => {
  const payload = {
    title: "Second POST test",
    body: "Today was rainig and cloudy",
  };
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    payload
  );
  expect(res.status).toBe(201);
  expect(res.data.title).toBe(payload.title);
  expect(res.data.body).toBe(payload.body);
});
