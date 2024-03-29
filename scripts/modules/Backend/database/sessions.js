export const sessions = JSON.parse(localStorage.getItem("sessions-db")) || [
  {
    id: 0,
    sessionName: "My session",
    datasets: [11, 23],
    lastEdited: {
      day: 3,
      month: 9,
      year: 2023,
    },
    dateOfCreation: {
      day: 3,
      month: 9,
      year: 2023,
    },
  },

  {
    id: 1,
    sessionName: "Your session",
    datasets: [3, 3, 3],
    lastEdited: {
      day: 4,
      month: 9,
      year: 2022,
    },
    dateOfCreation: {
      day: 4,
      month: 9,
      year: 1999,
    },
  },

  {
    id: 3,
    sessionName: "Their session",
    datasets: [2, 3, 4, 5, 5, 5, 6],
    lastEdited: {
      day: 2,
      month: 8,
      year: 2023,
    },
    dateOfCreation: {
      day: 3,
      month: 2,
      year: 2055,
    },
  },

  {
    id: 4,
    sessionName: "Student information",
    datasets: [2, 3, 4, 5, 5, 5, 6],
    lastEdited: {
      day: 2,
      month: 3,
      year: 2024,
    },
    dateOfCreation: {
      day: 2,
      month: 3,
      year: 2024,
    },
  },

  {
    id: 5,
    sessionName: "Business data",
    datasets: [2, 3, 4, 5, 5, 5, 6],
    lastEdited: {
      day: 4,
      month: 3,
      year: 2024,
    },
    dateOfCreation: {
      day: 4,
      month: 3,
      year: 2024,
    },
  },

  {
    id: 6,
    sessionName: "Triuph data",
    datasets: [2, 3, 4, 5, 5, 5, 6],
    lastEdited: {
      day: 15,
      month: 3,
      year: 2024,
    },
    dateOfCreation: {
      day: 15,
      month: 3,
      year: 2024,
    },
  },

  {
    id: 7,
    sessionName: "Triuph data2",
    datasets: [2, 3, 4, 5, 5, 5, 6],
    lastEdited: {
      day: 25,
      month: 10,
      year: 2024,
    },
    dateOfCreation: {
      day: 25,
      month: 10,
      year: 2024,
    },
  },

  {
    id: 8,
    sessionName: "Election data",
    datasets: [2, 3, 4, 5, 5, 5, 6, 9, 9, 0, 9],
    lastEdited: {
      day: 28,
      month: 12,
      year: 2024,
    },
    dateOfCreation: {
      day: 28,
      month: 12,
      year: 2024,
    },
  },
];
