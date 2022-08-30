import { Injectable } from "@angular/core"
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router"
import { Observable, of } from "rxjs"
import { QuizFilter } from "../models/quiz-filter.model"

// @Injectable({ providedIn: "root" })
// export class QuizResolver implements Resolve<Observable< QuizFilter |void>> {
//   resolve(route: ActivatedRouteSnapshot) {
//     const pin = route.params['lastValueFrom']
//   }
// }
