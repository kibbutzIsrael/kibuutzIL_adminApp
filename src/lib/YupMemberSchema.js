import * as yup from "yup";
import { fields } from "./tableFields";

function emptyStringToUndefined(string) {
   if (string === "") return undefined;
}

function YupUserSchema() {
   return yup
      .object({
         firstName: yup.string().min(2).required().label(fields.firstName),
         lastName: yup.string().min(2).required().label(fields.lastName),
         fullName: yup.string().min(2).required().label(fields.fullName),
         email: yup.string().email().required().label(fields.email),
         role: yup
            .string()
            .transform(emptyStringToUndefined)
            .label(fields.role),
         location: yup
            .string()
            .transform(emptyStringToUndefined)
            .label(fields.location),
         phoneNumber: yup
            .string()
            .matches(/^0\d{8,9}$/)
            .required()
            .label(fields.phoneNumber),
         gender: yup
            .string()
            .transform(emptyStringToUndefined)
            .oneOf(["Male", "Female"])
            .label(fields.gender),
         positionAntilNow: yup
            .string()
            .transform(emptyStringToUndefined)
            .label(fields.positionAntilNow),
         fecerPosition: yup
            .string()
            .transform(emptyStringToUndefined)
            .label(fields.fecerPosition),
         yearExperience: yup
            .string()
            .transform(emptyStringToUndefined)
            .label(fields.yearExperience),
         linkdinURL: yup
            .string()
            .transform(emptyStringToUndefined)
            .url()
            .label(fields.linkdinURL),
      })
      .required();
}

export { YupUserSchema };
