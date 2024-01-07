import React from "react";
import { HiEye, HiEyeSlash, HiXCircle } from "react-icons/hi2";
import { useFormContext } from "react-hook-form";
import { ControlColor, ControlShape, InputValue } from "../type";
import { ComponentSize } from "@/common/type";
import FormContext from "../Form/FormContext";
import FormItemContext from "../Form/FormItemContext";
import useLayout from "@/components/UI/Layout/useLayout";
import utils from "@/utils";

export interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  rootStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label?: React.ReactNode | React.ReactNode[];
  addonBefore?: React.ReactNode | React.ReactNode[];
  addonAfter?: React.ReactNode | React.ReactNode[];
  sizes?: ComponentSize;
  color?: ControlColor;
  shape?: ControlShape;
  required?: boolean;
  optional?: boolean;
  hasClear?: boolean;
  onChangeInput?: (text: string) => void;
}

const InputPassword: React.ForwardRefRenderFunction<HTMLInputElement, InputPasswordProps> = (
  {
    rootClassName = "",
    labelClassName = "",
    inputClassName = "",
    rootStyle,
    labelStyle,
    label,
    addonBefore,
    addonAfter,
    value = "",
    sizes = "md",
    color = "blue",
    shape = "square",
    placeholder = "Enter information...",
    disabled,
    required,
    optional,
    hasClear = true,
    onBlur,
    onChangeInput,
    ...restProps
  },
  ref
) => {
  const rhfMethods = useFormContext();

  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const { color: rhfColor, sizes: rhfSizes, shape: rhfShape } = React.useContext(FormContext);

  const { isRhf, rhfName, rhfError, rhfValue, rhfDisabled, rhfOnChange, rhfOnBlur } =
    React.useContext(FormItemContext);

  const [inputValue, setInputValue] = React.useState<InputValue>(value);

  const [isPassword, setIsPassword] = React.useState<boolean>(true);

  const inputRef = React.useRef<HTMLDivElement>(null);

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const controlColor = isRhf ? rhfColor : color;

  const controlSize = isRhf ? rhfSizes : sizes;

  const controlShape = isRhf ? rhfShape : shape;

  const showClearIcon = hasClear && inputValue && !controlDisabled;

  const showOptional = required ? false : optional;

  const themClassName = `input-${theme}`;

  const sizeClassName = `input-${controlSize}`;

  const colorClassName = `input-${controlColor}`;

  const shapeClassName = `input-${controlShape}`;

  const disabledClassName = controlDisabled ? "input-disabled" : "";

  const errorClassName = rhfError ? "input-error" : "";

  const mainClassName = utils.formatClassName(
    "input",
    colorClassName,
    sizeClassName,
    shapeClassName,
    errorClassName,
    themClassName,
    rootClassName,
    disabledClassName
  );

  const controlLabelClassName = utils.formatClassName("input-label", labelClassName);

  const controlInputClassName = utils.formatClassName("control-box", inputClassName);

  // Focus input when error is trigger
  React.useEffect(() => {
    if (rhfError) inputRef.current?.click();
  }, [rhfError]);

  // Set default value
  React.useEffect(() => {
    if (isRhf) return setInputValue(rhfValue);
    setInputValue(value);
  }, [value, isRhf, rhfValue]);

  const iconSize = () => {
    if (controlSize === "sm") return 14;
    if (controlSize === "md") return 16;
    if (controlSize === "lg") return 18;
  };

  const handleSwitchType = () => setIsPassword(!isPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChangeInput?.(value);
  };

  const handleClearInput = () => {
    if (isRhf) return rhfMethods.setValue(rhfName, "");
    setInputValue("");
    onChangeInput?.("");
  };

  const onChangeFn = rhfOnChange ? rhfOnChange : handleChange;

  const onBlurFn = rhfOnBlur ? rhfOnBlur : onBlur;

  return (
    <div style={rootStyle} className={mainClassName}>
      <label>
        {label && (
          <div style={labelStyle} className={controlLabelClassName}>
            {required && <span className="label-required">*</span>}
            <span>{label}</span>
            {showOptional && <span className="label-optional">(Optional)</span>}
          </div>
        )}

        <div ref={inputRef} className="input-group">
          {addonBefore && <div className="group-addon group-addon-before">{addonBefore}</div>}

          <div className="group-control">
            <input
              ref={ref}
              {...restProps}
              value={inputValue}
              disabled={controlDisabled}
              placeholder={placeholder}
              type={isPassword ? "password" : "text"}
              className={controlInputClassName}
              onChange={onChangeFn}
              onBlur={onBlurFn}
            />
            {showClearIcon && (
              <div className="control-action" onClick={handleClearInput}>
                <HiXCircle size={iconSize()} />
              </div>
            )}
            <div className="control-action" onClick={handleSwitchType}>
              {isPassword ? <HiEye size={iconSize()} /> : <HiEyeSlash size={iconSize()} />}
            </div>
          </div>

          {addonAfter && <div className="group-addon group-addon-after">{addonAfter}</div>}
        </div>
      </label>
    </div>
  );
};

export default React.forwardRef(InputPassword);
