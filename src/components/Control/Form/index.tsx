import { FormHTMLAttributes, ReactNode, ForwardedRef, useEffect, forwardRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ComponentSize } from "@/common/type";
import { ControlColor, ControlShape } from "../type";
import FormContext, { FormContextState } from "./FormContext";
import useFormStore from "./FormStore";

export interface FormProps<M> extends FormHTMLAttributes<HTMLFormElement> {
  initialData: M;
  color?: ControlColor;
  shape?: ControlShape;
  sizes?: ComponentSize;
  children?: ReactNode | ReactNode[];
  onFinish?: (formData: M) => void;
}

const Form = <M extends object>(
  {
    initialData,
    color = "blue",
    sizes = "md",
    shape = "square",
    children,
    onFinish,
    ...restProps
  }: FormProps<M>,
  ref: ForwardedRef<HTMLFormElement>
) => {
  const setSubmit = useFormStore((state) => state.setSubmit);

  const rhfMethods = useForm<M>({ values: initialData, mode: "all" });

  const formContextState: FormContextState = { isForm: true, color, sizes, shape };

  useEffect(() => setSubmit(rhfMethods.handleSubmit(onSubmit)), []);

  const onSubmit = (formData: M) => onFinish?.(formData);

  return (
    <FormProvider {...rhfMethods}>
      <FormContext.Provider value={formContextState}>
        <form ref={ref} {...restProps} onSubmit={rhfMethods.handleSubmit(onSubmit)}>
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
};

export default forwardRef(Form);
