import { Frame, NavigatedData, Page} from '@nativescript/core'
import { LoginViewModel } from './login-view-model';
export function onNavigatingTo(args: NavigatedData) {
  const page = <Page>args.object
console.log("login page ready");

    page.bindingContext=new LoginViewModel()

}
export function register() {
  Frame.topmost().navigate('./register/register-page')
}
