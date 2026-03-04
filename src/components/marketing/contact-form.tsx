"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(20, { message: "Tell us more about your idea (min 20 chars)" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successMessage: string;
}

export function ContactForm({
  namePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  messagePlaceholder,
  nameLabel,
  emailLabel,
  phoneLabel,
  messageLabel,
  submitLabel,
  submittingLabel,
  successTitle,
  successMessage,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate async (demo — no actual sending)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.info("[ContactForm] Demo submission:", data);
    setSubmitted(true);
  };

  const labelClass =
    "font-[family-name:var(--font-sans)] text-xs font-medium tracking-[0.2em] uppercase text-[#888888] mb-1.5";
  const inputClass =
    "rounded-sm border border-[#2e2e2e] bg-[#1a1a1a] text-[#f5f0e8] placeholder:text-[#444444] focus:border-[#d4a853] focus:ring-1 focus:ring-[#d4a853]/30 transition-colors";

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-sm border border-[#d4a853]/30 bg-[#111111] p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d4a853]/10">
          <CheckCircle className="h-8 w-8 text-[#d4a853]" />
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-3xl font-light italic text-[#f5f0e8]">
            {successTitle}
          </h3>
          <p className="mt-3 font-[family-name:var(--font-sans)] text-sm text-[#888888]">
            {successMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{nameLabel}</FormLabel>
              <FormControl>
                <Input
                  placeholder={namePlaceholder}
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{emailLabel}</FormLabel>
              <FormControl>
                <Input
                  placeholder={emailPlaceholder}
                  type="email"
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{phoneLabel}</FormLabel>
              <FormControl>
                <Input
                  placeholder={phonePlaceholder}
                  type="tel"
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>{messageLabel}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={messagePlaceholder}
                  className={`${inputClass} min-h-[140px] resize-none`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-auto w-full rounded-sm bg-[#d4a853] py-4 font-[family-name:var(--font-sans)] text-sm font-bold tracking-[0.2em] uppercase text-[#0a0a0a] transition-all hover:bg-[#f59e0b] hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {submittingLabel}
            </span>
          ) : (
            submitLabel
          )}
        </Button>
      </form>
    </Form>
  );
}
