import { Application, ApplicationSettings, Frame, NavigatedData, Page } from "@nativescript/core";
import { StatusViewModel } from "./status-view-model";
import { HistoryViewModel } from "~/history/history-vew-model";

let historyViewModel = null
let statusViewModel = null
export async function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
  page.bindingContext = new StatusViewModel()
  statusViewModel= new StatusViewModel()
  await statusViewModel.status(); 
  historyViewModel = new HistoryViewModel()

  
}

export async function refreshList(args) {
  const pullRefresh = args.object;
  console.log( await statusViewModel.refresh());
 await statusViewModel.refresh()
      setTimeout(() => {
        pullRefresh.refreshing = false;
      }, 1000);
}

export function back() {
  Frame.topmost().navigate('./home/home-page')

}

export function gotoHistory() {
  historyViewModel.refresh()
  Frame.topmost().navigate('./history/history-page')
}