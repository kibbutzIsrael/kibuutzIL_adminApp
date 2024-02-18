import * as yup from "yup";
import { fields } from "./tableFields";

function emptyStringToUndefined(string) {
   if (string === "") return undefined;
   return string;
}

function YupUserSchema() {
   return yup
      .object({
         firstName: yup.string().min(2).required(),
         lastName: yup.string().min(2).required(),
         fullName: yup.string().min(2).required(),
         email: yup.string().email().required(),
         password: yup.string().min(5).required(),
         role: yup.string().transform(emptyStringToUndefined),
         location: yup.string().transform(emptyStringToUndefined),
         phoneNumber: yup
            .string()
            .matches(/^0\d{8,9}$/, "Invalid phone number")
            .required(),
         gender: yup.string().transform(emptyStringToUndefined),
         positionAntilNow: yup.string().transform(emptyStringToUndefined),
         fecerPosition: yup.string().transform(emptyStringToUndefined),
         yearExperience: yup.string().transform(emptyStringToUndefined),
         linkdinURL: yup.string().transform(emptyStringToUndefined).url(),
      })
      .required();
}

export { YupUserSchema };
