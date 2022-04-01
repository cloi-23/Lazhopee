
import { Frame, NavigatedData, Page } from '@nativescript/core'

export async function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object
  
    page.bindingContext = {}
  
    
  }