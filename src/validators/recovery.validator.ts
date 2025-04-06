import joi from "joi";

export class RecoveryValidator {
  private static emailField = joi.string().trim();

  public static email = joi.object({
    email: this.emailField.required(),
  });
}
