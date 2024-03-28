import { HttpErrorResponse } from '@angular/common/http';

export function generateErrorList(e: HttpErrorResponse) {
  let errors_list: Array<string> = [];

  if (e.status == 400 || e.status == 500) {
    const { errors } = e.error;
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        errors_list.push(errors[key][0]);
      }
    }
  } else {
    errors_list.push(e.error);
  }

  return errors_list;
}
