import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { LoaderInterceptor } from "./loader-interceptor";
import { AuthenticatorInterceptor } from "./authenticator.interceptor";

export const interceptorProviders = [
  // { provide: HTTP_INTERCEPTORS, useClass: RequestTimestampService, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: AjaxBusyIdentifierInterceptorService, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: XML2JsonInterceptorService, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorNotifierService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticatorInterceptor,
    multi: true,
  },
];
