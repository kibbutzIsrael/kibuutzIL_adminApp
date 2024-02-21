import * as yup from "yup";
import { fields } from "./tableFields";

function emptyStringToUndefined(string) {
   if (string === "") return undefined;
   return string;
}

export function YupUserSchema() {
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

export function yupOrganizationSchema() {
   return yup
      .object({
         organizationName: yup
            .string()
            .min(2)
            .required()
            .label("Organization name"),
         organizationPhoneNumber: yup
            .string()
            .matches(/^0\d{8,9}$/)
            .required()
            .label("Phone"),
         organizationContactName: yup
            .string()
            .min(2)
            .required()
            .label("Contact"),
         organizationEmail: yup.string().email().required().label("Email"),
         organizationMessageBody: yup
            .string()
            .min(10)
            .required()
            .label("Message"),
         organizationType: yup
            .string()
            .transform(emptyStringToUndefined)
            .label("Organization Type"),
         status: yup.string(),
      })
      .required();
}
