import axios from "axios";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

export const getProjects = async (axios: NuxtAxiosInstance) => {
  try {
    const res = await axios.$get("http://localhost:4000/projects");
    return res;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const getSpecificIssues = async (
  axios: NuxtAxiosInstance,
  project: string,
  searchText: string
) => {
  try {
    const res = await axios.$get(
      `http://localhost:4000/issues?project=${project}&q=${searchText}`
    );
    return res;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const getIssueById = async (
  axios: NuxtAxiosInstance,
  issueId: string
) => {
  try {
    const res = await axios.$get(`http://localhost:4000/issues?id=${issueId}`);
    return res;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};
