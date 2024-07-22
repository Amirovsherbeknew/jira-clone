import Vue from "vue";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

declare module "vue/types/vue" {
  interface Vue {
    $api: NuxtAxiosInstance;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $api: NuxtAxiosInstance;
  }
  interface Context {
    $api: NuxtAxiosInstance;
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $api: NuxtAxiosInstance;
  }
}
