import {
    createContext,
    useContext,
    type FC,
    type ReactNode,
    type ComponentProps,
    useId,
} from "react";
import {cn} from "@shared/lib/cn";
import {Label} from "./label";
import {Input} from "./input";
import {Hint as BaseHint} from "./hint";

type FormFieldStatus = "default" | "error";

interface FormFieldContextValue {
    id: string;
    status: FormFieldStatus;
    hintMessages: string[];
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

const useFormFieldContext = (): FormFieldContextValue => {
    const ctx = useContext(FormFieldContext);
    if (!ctx) {
        throw new Error("FormField subcomponents must be used within <FormField.Root>.");
    }
    return ctx;
};

interface FormFieldRootProps {
    id?: string;
    hintMessages?: string[];
    status?: FormFieldStatus;
    className?: string;
    children: ReactNode;
}

const FormFieldRoot: FC<FormFieldRootProps> = ({id, hintMessages, status, className, children,}) => {
    const generatedId = useId();
    const finalId = id ?? generatedId;

    const safeMessages = hintMessages ?? [];
    const resolvedStatus: FormFieldStatus =
        status ?? (safeMessages.length > 0 ? "error" : "default");

    return (
        <FormFieldContext.Provider
            value={{
                id: finalId,
                status: resolvedStatus,
                hintMessages: safeMessages,
            }}
        >
            <div
                className={cn("flex flex-col gap-1 group", className)}
                data-status={resolvedStatus}
            >
                {children}
            </div>
        </FormFieldContext.Provider>
    );
};

const FormFieldLabel: FC<{ children: ReactNode }> = ({children}) => {
    const {id} = useFormFieldContext();
    return <Label htmlFor={id}>{children}</Label>;
};

type InputProps = ComponentProps<typeof Input>;

const FormFieldInput: FC<InputProps> = (props) => {
    const {id, status} = useFormFieldContext();
    return <Input
        id={id}
        aria-invalid={status === "error"} {...props} />;
};

const FormFieldHint: FC = () => {
    const {hintMessages} = useFormFieldContext();
    if (!hintMessages.length) return null;

    return (
        <BaseHint>
            {hintMessages.map((msg) => (
                <span
                    key={msg}
                    className="block"
                >
                    {msg}
                </span>
            ))}
        </BaseHint>
    );
};

export const FormField = {
    Root: FormFieldRoot,
    Label: FormFieldLabel,
    Input: FormFieldInput,
    Hint: FormFieldHint,
} as const;
