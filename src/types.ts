import { object, string, number, optional, type Output } from "valibot";

export const CertificateSchema = object({
  name: string(),
});

export const RuleSchema = object({
  id: number(),
  port: number("Numbers only"),
  certificate: optional(CertificateSchema),
});

export type Rule = Output<typeof RuleSchema>;
export type Certificate = Output<typeof CertificateSchema>;
