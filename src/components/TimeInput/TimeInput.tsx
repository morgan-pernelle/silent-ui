import { AnimatePresence } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { parseSegment } from "../DateInput/dateUtils";
import { cn } from "../../utils/cn";
import fieldStyles from "../../styles/fieldControl.module.css";
import type { FieldProps } from "../Input/Input";
import { TimePicker } from "./TimePicker";
import {
  clampTimeParts,
  isWithinTimeRange,
  parseTime,
  partsFromDate,
  segmentsToTimeParts,
  snapMinuteToStep,
  toTimeString,
  type TimeParts,
} from "./timeUtils";
import styles from "./TimeInput.module.css";

export interface TimeInputProps extends FieldProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  style?: CSSProperties;
}

function partsToSegments(parts: TimeParts) {
  return {
    hour: String(parts.hour).padStart(2, "0"),
    minute: String(parts.minute).padStart(2, "0"),
  };
}

function emptySegments() {
  return { hour: "", minute: "" };
}

function timeToSegments(value?: string) {
  if (!value) return emptySegments();
  const p = parseTime(value);
  return p ? partsToSegments(p) : emptySegments();
}

export const TimeInput = forwardRef<HTMLDivElement, TimeInputProps>(
  function TimeInput(
    {
      label,
      hint,
      error,
      className,
      id,
      value: controlledValue,
      defaultValue,
      onValueChange,
      min,
      max,
      disabled,
      name,
      style,
    },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? generatedId;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);

    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const isControlled = controlledValue !== undefined;
    const timeValue = isControlled ? controlledValue : internalValue;

    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [open, setOpen] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [viewParts, setViewParts] = useState<TimeParts>(() => {
      const p = parseTime(defaultValue ?? "") ?? partsFromDate(new Date());
      return { ...p, minute: snapMinuteToStep(p.minute) };
    });

    useImperativeHandle(ref, () => wrapperRef.current!);

    const syncSegments = useCallback((value: string) => {
      const s = timeToSegments(value);
      setHour(s.hour);
      setMinute(s.minute);
      if (value) {
        const p = parseTime(value);
        if (p) setViewParts({ ...p, minute: snapMinuteToStep(p.minute) });
      }
    }, []);

    useEffect(() => {
      syncSegments(timeValue ?? "");
    }, [timeValue, syncSegments]);

    const commitTime = (next: string, parts?: TimeParts | null) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
      setInvalid(false);
      if (parts) setViewParts({ ...parts, minute: snapMinuteToStep(parts.minute) });
    };

    const tryCommitFromSegments = (
      h: string,
      m: string,
      close = false,
    ) => {
      const parts = segmentsToTimeParts(h, m);
      if (!parts) {
        if (h || m) setInvalid(true);
        else {
          setInvalid(false);
          commitTime("");
        }
        return;
      }
      const clamped = clampTimeParts(parts.hour, parts.minute);
      if (!isWithinTimeRange(clamped, min, max)) {
        setInvalid(true);
        return;
      }
      const seg = partsToSegments(clamped);
      setHour(seg.hour);
      setMinute(seg.minute);
      commitTime(toTimeString(clamped), clamped);
      if (close) setOpen(false);
    };

    const handleFocus = () => {
      if (!disabled) setOpen(true);
    };

    useEffect(() => {
      if (!open) return;
      const onPointerDown = (e: MouseEvent) => {
        if (!wrapperRef.current?.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      const onKeyDown = (e: globalThis.KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("mousedown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [open]);

    const handleSegmentKeyDown = (
      e: KeyboardEvent<HTMLInputElement>,
      segment: "hour" | "minute",
    ) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Backspace") return;
      const el = e.currentTarget;
      if (el.value !== "" || el.selectionStart !== 0) return;

      e.preventDefault();
      if (segment === "hour") {
        if (minute) {
          const next = minute.slice(0, -1);
          setMinute(next);
          minuteRef.current?.focus();
          minuteRef.current?.setSelectionRange(next.length, next.length);
        }
      } else if (segment === "minute") {
        setMinute("");
        hourRef.current?.focus();
        hourRef.current?.select();
      }
    };

    const onHourChange = (raw: string) => {
      const v = parseSegment(raw, 2, 23);
      setHour(v);
      setInvalid(false);
      if (v.length === 2) minuteRef.current?.focus();
      if (v.length === 2 && minute.length === 2) {
        tryCommitFromSegments(v, minute);
      }
    };

    const onMinuteChange = (raw: string) => {
      const v = parseSegment(raw, 2, 59);
      setMinute(v);
      setInvalid(false);
      if (hour.length === 2 && v.length === 2) {
        tryCommitFromSegments(hour, v);
      }
    };

    const showError = error || invalid;

    return (
      <div
        ref={wrapperRef}
        className={cn(styles.field, className)}
        style={style}
      >
        <div className={styles.wrapper}>
          <label
            htmlFor={`${fieldId}-hour`}
            className={cn(
              fieldStyles.controlWrap,
              styles.timeControl,
              showError && fieldStyles.controlError,
              disabled && fieldStyles.controlWrapDisabled,
            )}
            onFocusCapture={handleFocus}
          >
            {label && (
              <span className={fieldStyles.controlLabel}>{label}</span>
            )}
            <div className={styles.inputRow}>
              <div className={styles.segments}>
                <input
                  ref={hourRef}
                  id={`${fieldId}-hour`}
                  type="text"
                  inputMode="numeric"
                  className={styles.segment}
                  placeholder="HH"
                  value={hour}
                  disabled={disabled}
                  aria-label="Hour"
                  maxLength={2}
                  onChange={(e) => onHourChange(e.target.value)}
                  onKeyDown={(e) => handleSegmentKeyDown(e, "hour")}
                  onBlur={() => tryCommitFromSegments(hour, minute)}
                />
                <span className={styles.sep} aria-hidden>
                  :
                </span>
                <input
                  ref={minuteRef}
                  id={`${fieldId}-minute`}
                  type="text"
                  inputMode="numeric"
                  className={styles.segment}
                  placeholder="MM"
                  value={minute}
                  disabled={disabled}
                  aria-label="Minute"
                  maxLength={2}
                  onChange={(e) => onMinuteChange(e.target.value)}
                  onKeyDown={(e) => handleSegmentKeyDown(e, "minute")}
                  onBlur={() => tryCommitFromSegments(hour, minute)}
                />
              </div>
              <button
                type="button"
                className={styles.toggle}
                data-field-action
                tabIndex={-1}
                disabled={disabled}
                aria-label={open ? "Close time picker" : "Open time picker"}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setOpen((o) => !o)}
              >
                ⌄
              </button>
            </div>
          </label>

          <AnimatePresence>
            {open && !disabled && (
              <TimePicker
                viewParts={viewParts}
                onViewChange={setViewParts}
                onSelect={(parts) => {
                  const seg = partsToSegments(parts);
                  setHour(seg.hour);
                  setMinute(seg.minute);
                  tryCommitFromSegments(seg.hour, seg.minute, true);
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {name && (
          <input type="hidden" name={name} value={timeValue ?? ""} readOnly />
        )}

        {error && (
          <span className={styles.errorText} role="alert">
            {error}
          </span>
        )}
        {invalid && !error && (
          <span className={styles.invalidHint} role="alert">
            Invalid or out-of-range time
          </span>
        )}
        {hint && !error && !invalid && (
          <span className={styles.hint}>{hint}</span>
        )}
      </div>
    );
  },
);
