import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { Issue, User } from "~/types/types";

export const getUsers = async ($api: NuxtAxiosInstance) => {
  try {
    const res = await $api.$get("users");
    return res;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const addNewUser = async ($api: NuxtAxiosInstance, newUser: User) => {
  const res = await $api.$post("users", newUser);
  return res;
};

export const updateExistUser = async (
  $api: NuxtAxiosInstance,
  userId: string | number,
  existUser: User
) => {
  const res = await $api.$put("users/" + userId, existUser);
  return res;
};

export const removeUser = async (
  $api: NuxtAxiosInstance,
  userId: string | number
) => {
  try {
    const res = await $api.$delete("users/" + userId);
    return res;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const getProjects = async ($api: NuxtAxiosInstance) => {
  try {
    const res = await $api.$get("projects");
    return res;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const getIssues = async ($api: NuxtAxiosInstance) => {
  try {
    const res = await $api.$get("issues");
    return res;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const getSpecificIssues = async (
  $api: NuxtAxiosInstance,
  project: string,
  searchText: string
) => {
  try {
    const res = await $api.$get(`issues?project=${project}&q=${searchText}`);
    return res;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const getIssueById = async (
  $api: NuxtAxiosInstance,
  issueId: string
) => {
  try {
    const res = await $api.$get(`issues?id=${issueId}`);
    return res;
  } catch (err: TypeError | any | unknown) {
    console.log(err.message);
  }
};

export const createIssue = async ($api: NuxtAxiosInstance, newIssue: Issue) => {
  const res = await $api.$post("issues", newIssue);
  return res;
};

export const updateIssue = async (
  $api: NuxtAxiosInstance,
  id: string | number,
  issueUpdated: Partial<Issue>
): Promise<Issue> => {
  const res = await $api.$patch("issues/" + id, issueUpdated);
  console.log("Updated issue", res);
  return res;
};
