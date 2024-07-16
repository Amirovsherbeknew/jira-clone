export default function ({ app }: any, inject: any) {
  inject("route", app.router.currentRoute);
  inject("router", app.router);
}
