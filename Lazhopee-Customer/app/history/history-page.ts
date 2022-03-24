import { Application, ApplicationSettings, Frame, NavigatedData, Page } from "@nativescript/core";
import { HistoryViewModel } from "./history-vew-model";

export async function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = new HistoryViewModel()
 await new HistoryViewModel().history(); 
  
}

export async function refreshList(args) {
  const pullRefresh = args.object;
      setTimeout(() => {
        pullRefresh.refreshing = false;
      }, 1000)
}

export function back() {
  Frame.topmost().navigate('./order/status-page')
}