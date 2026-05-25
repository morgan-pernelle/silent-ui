import { AnimatePresence } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { cn } from "../../utils/cn";
import fieldStyles from "../../styles/fieldControl.module.css";
import { SelectMenu } from "./SelectMenu";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  style?: CSSProperties;
}

function firstEnabledIndex(options: SelectOption[], from = 0): number {
  for (let i = from; i < options.length; i++) {
    if (!options[i].disabled) return i;
  }
  return -1;
}

function lastEnabledIndex(options: SelectOption[]): number {
  for (let i = options.length - 1; i >= 0; i--) {
    if (!options[i].disabled) return i;
  }
  return -1;
}

function nextEnabledIndex(options: SelectOption[], from: number, dir: 1 | -1): number {
  if (!options.length) return -1;
  let i = from;
  for (let n = 0; n < options.length; n++) {
    i = (i + dir + options.length) % options.length;
    if (!options[i].disabled) return i;
  }
  return -1;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  function Select(
    {
      label,
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = "Select…",
      disabled,
      className,
      id,
      name,
      style,
    },
    ref,
  ) {
    const generatedId = useId();
    const listboxId = `${generatedId}-listbox`;
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? generatedId;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const [open, setOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    useImperativeHandle(ref, () => wrapperRef.current!);

    const selectedOption = useMemo(
      () => options.find((o) => o.value === value),
      [options, value],
    );

    const commitValue = useCallback(
      (next: string) => {
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    const openMenu = useCallback(() => {
      if (disabled) return;
      setOpen(true);
      const selectedIndex = options.findIndex((o) => o.value === value);
      const start =
        selectedIndex >= 0 && !options[selectedIndex]?.disabled
          ? selectedIndex
          : firstEnabledIndex(options);
      setFocusedIndex(start);
    }, [disabled, options, value]);

    const closeMenu = useCallback(() => {
      setOpen(false);
      setFocusedIndex(-1);
    }, []);

    const selectAt = (index: number) => {
      const opt = options[index];
      if (!opt || opt.disabled) return;
      commitValue(opt.value);
      closeMenu();
      triggerRef.current?.focus();
    };

    useEffect(() => {
      if (!open) return;
      const onPointerDown = (e: MouseEvent) => {
        if (!wrapperRef.current?.contains(e.target as Node)) {
          closeMenu();
        }
      };
      const onKeyDown = (e: globalThis.KeyboardEvent) => {
        if (e.key === "Escape") closeMenu();
      };
      document.addEventListener("mousedown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("mousedown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [open, closeMenu]);

    const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!open) {
          openMenu();
          return;
        }
      }

      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) =>
          nextEnabledIndex(options, i < 0 ? firstEnabledIndex(options) : i, 1),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) =>
          nextEnabledIndex(options, i < 0 ? lastEnabledIndex(options) : i, -1),
        );
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (focusedIndex >= 0) selectAt(focusedIndex);
      } else if (e.key === "Home") {
        e.preventDefault();
        setFocusedIndex(firstEnabledIndex(options));
      } else if (e.key === "End") {
        e.preventDefault();
        setFocusedIndex(lastEnabledIndex(options));
      }
    };

    return (
      <div
        ref={wrapperRef}
        className={cn(styles.field, className)}
        style={style}
      >
        <div className={styles.wrapper}>
          <label
            htmlFor={fieldId}
            className={cn(
              fieldStyles.controlWrap,
              styles.selectControl,
              disabled && fieldStyles.controlWrapDisabled,
            )}
          >
            {label && <span className={fieldStyles.controlLabel}>{label}</span>}
            <div className={styles.triggerRow}>
              <button
                ref={triggerRef}
                id={fieldId}
                type="button"
                className={cn(
                  styles.trigger,
                  !selectedOption && styles.triggerPlaceholder,
                )}
                disabled={disabled}
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={open ? listboxId : undefined}
                onClick={() => (open ? closeMenu() : openMenu())}
                onKeyDown={handleTriggerKeyDown}
              >
                {selectedOption?.label ?? placeholder}
              </button>
              <span className={styles.arrow} aria-hidden>
                ⌄
              </span>
            </div>
          </label>

          <AnimatePresence>
            {open && !disabled && (
              <SelectMenu
                id={listboxId}
                options={options}
                value={value}
                focusedIndex={focusedIndex}
                onSelect={(next) => {
                  commitValue(next);
                  closeMenu();
                  triggerRef.current?.focus();
                }}
                onFocusIndex={setFocusedIndex}
              />
            )}
          </AnimatePresence>
        </div>

        {name && value !== undefined && (
          <input type="hidden" name={name} value={value} readOnly />
        )}
      </div>
    );
  },
);
