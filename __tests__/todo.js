let todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
describe("Todo List Test Suite", () => {
  var dateToday = new Date();
  const today = dateToday.toISOString().split("T")[0];
  const yesterday = new Date(new Date().setDate(dateToday.getDate() - 1))
    .toISOString()
    .split("T")[0];
  const tomorrow = new Date(new Date().setDate(dateToday.getDate() + 1))
    .toISOString()
    .split("T")[0];
  beforeAll(() => {
    // Seed the test data

    [
      {
        title: "OverDue",
        completed: false,
        dueDate: yesterday,
      },
      {
        title: "Due Today",
        completed: false,
        dueDate: today,
      },
      {
        title: "Due Later",
        completed: false,
        dueDate: tomorrow,
      },
    ].forEach(add);
  });
  test("Should add a new todo", () => {
    expect(all.length).toEqual(3);

    add({
      title: "A test item",
      completed: false,
      dueDate: today,
    });

    expect(all.length).toEqual(4);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("Should retrieve overdue items", () => {
    expect(overdue().length).toEqual(1);
  });

  test("Should retrieve due today items", () => {
    expect(dueToday().length).toEqual(2);
  });

  test("Should retrieve due later items", () => {
    expect(dueLater().length).toEqual(1);
  });
});
