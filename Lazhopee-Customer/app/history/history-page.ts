import { Application, ApplicationSettings, Frame, NavigatedData, Page } from "@nativescript/core";
import { HistoryViewModel } from "./history-vew-model";

let historyViewModel=null
export async function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = new HistoryViewModel()
  historyViewModel = new HistoryViewModel()
 await new historyViewModel.history(); 
  
}

export async function refreshList(args) {
  const pullRefresh = args.object;
  console.log( await historyViewModel.refresh());
 await historyViewModel.refresh()
      setTimeout(() => {
        pullRefresh.refreshing = false;
      }, 1000);
}

export function back() {
  Frame.topmost().navigate('./order/status-page')
}