import Mock from "mockjs";

Mock.mock("/api/data", "get", {
  "list|10": [
    {
      "id|+1": 1,
      "number|+1": 100,
      title: "@ctitle(5, 10)",
      created_at: "@datetime",
      updated_at: "@datetime",
      "state|1": ["open", "closed", "processing"],
      "labels|1-2": [
        {
          name: "@ctitle(2, 4)",
          color: "@hex",
        },
      ],
    },
  ],
});
