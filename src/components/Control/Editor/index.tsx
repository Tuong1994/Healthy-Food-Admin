import {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import ReactQuill, { ReactQuillProps } from "react-quill";
import FormItemContext from "../Form/FormItemContext";
import "react-quill/dist/quill.snow.css";

interface EditorProps extends ReactQuillProps {
  content?: string;
  disabled?: boolean;
  label?: ReactNode;
  onChangeEditor?: (value: string) => void;
}

const Editor: ForwardRefRenderFunction<HTMLDivElement, EditorProps> = (
  { content = "", label, onChangeEditor, disabled, ...restProps },
  ref
) => {
  const rhfMethods = useFormContext();

  const { isRhf, rhfName, rhfValue, rhfDisabled } = useContext(FormItemContext);

  const [value, setValue] = useState<string>(content);

  const [touched, setTouched] = useState<boolean>(false);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ align: [] }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  const controlDisabled = rhfDisabled ? rhfDisabled : disabled;

  const triggerValidation = useCallback(() => {
    if (touched && !rhfValue) rhfMethods.trigger(rhfName);
    else if (touched && rhfValue) rhfMethods.trigger(rhfName);
  }, [touched, rhfMethods, rhfName, rhfValue]);

  // Trigger validation
  useEffect(() => {
    if (!isRhf) return;
    triggerValidation();
  }, [isRhf, triggerValidation]);

  // Set default value
  useEffect(() => {
    if (isRhf) return setValue(rhfValue);
    setValue(content);
  }, [content, isRhf, rhfValue]);

  const handleFocus = () => setTouched(true);

  const handleBlur = () => setTouched(false);

  const handleChange = (value: string) => {
    setValue(value);
    if (isRhf) rhfMethods.setValue(rhfName, value);
    onChangeEditor?.(value);
  };

  return (
    <div ref={ref} className="editor">
      {label && <label className="editor-label">{label}</label>}
      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        {...restProps}
        readOnly={controlDisabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
};

export default forwardRef(Editor);
