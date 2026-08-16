export const getTableConfig = (role) => {
  const baseHead = [
    "SL",
    "Title",
    "Status",
    "Submission Date",
    "Action",
  ];

  const baseMapping = {
    Title: "title",
    Status: "status.value",
    "Submission Date": "dueDate",
  };

  if (role === "admin") {
    return {
      TABLE_HEAD: [
        "SL",
        "Title",
        "Teacher",
        "Student",
        "Status",
        "Submission Date",
        "Action",
      ],
      COLUMN_MAPPING: {
        ...baseMapping,
        Teacher: "teacher.name",
        Student: "student.name",
      },
    };
  }

  if (role === "teacher") {
    return {
      TABLE_HEAD: [...baseHead.slice(0, 2), "Student", ...baseHead.slice(2)],
      COLUMN_MAPPING: {
        ...baseMapping,
        Student: "student.name",
      },
    };
  }

  if (role === "student") {
    return {
      TABLE_HEAD: [...baseHead.slice(0, 2), "Teacher", ...baseHead.slice(2)],
      COLUMN_MAPPING: {
        ...baseMapping,
        Teacher: "teacher.name",
      },
    };
  }

  return {
    TABLE_HEAD: baseHead,
    COLUMN_MAPPING: baseMapping,
  };
};
