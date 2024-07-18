import axios from "axios";

export const getProjects = async () => {
  try {
    const res = await axios.get("http://localhost:4000/projects");
    return res.data;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const getSpecificIssues = async (project: string) => {
  const axios = await import("axios");
  try {
    const res = await axios.default.get(
      `http://localhost:4000/issues?project=${project}`
    );
    return res.data;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const getIssueById = async (issueId: string) => {
  const axios = await import("axios");
  try {
    const res = await axios.default.get(
      `http://localhost:4000/issues?id=${issueId}`
    );
    return res.data;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};
