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
import { cn } from "../../utils/cn";
import fieldStyles from "../../styles/fieldControl.module.css";
import type { FieldProps } from "../Input/Input";
import { DateCalendar } from "./DateCalendar";
import {
  clampParts,
  parseISODate,
  parseSegment,
  partsFromDate,
  segmentsToParts,
  toISODate,
  type DateParts,
} from "./dateUtils";
import styles from "./DateInput.module.css";

export interface DateInputProps extends FieldProps {
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

function partsToSegments(parts: DateParts) {
  return {
    day: String(parts.day).padStart(2, "0"),
    month: String(parts.month).padStart(2, "0"),
    year: String(parts.year).padStart(4, "0"),
  };
}

function emptySegments() {
  return { day: "", month: "", year: "" };
}

function isoToSegments(iso?: string) {
  if (!iso) return emptySegments();
  const p = parseISODate(iso);
  return p ? partsToSegments(p) : emptySegments();
}

export const DateInput = forwardRef<HTMLDivElement, DateInputProps>(
  function DateInput(
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
    const calendarId = `${fieldId}-calendar`;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dayRef = useRef<HTMLInputElement>(null);
    const monthRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const isControlled = controlledValue !== undefined;
    const isoValue = isControlled ? controlledValue : internalValue;

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [open, setOpen] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [viewParts, setViewParts] = useState<DateParts>(() => {
      const p = parseISODate(defaultValue ?? "") ?? partsFromDate(new Date());
      return p;
    });

    useImperativeHandle(ref, () => wrapperRef.current!);

    const syncSegments = useCallback((iso: string) => {
      const s = isoToSegments(iso);
      setDay(s.day);
      setMonth(s.month);
      setYear(s.year);
      if (iso) {
        const p = parseISODate(iso);
        if (p) setViewParts(p);
      }
    }, []);

    useEffect(() => {
      syncSegments(isoValue ?? "");
    }, [isoValue, syncSegments]);

    const commitISO = (next: string, parts?: DateParts | null) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
      setInvalid(false);
      if (parts) setViewParts(parts);
    };

    const tryCommitFromSegments = (
      d: string,
      m: string,
      y: string,
      close = false,
    ) => {
      const parts = segmentsToParts(d, m, y);
      if (!parts) {
        if (d || m || y) setInvalid(true);
        else {
          setInvalid(false);
          commitISO("");
        }
        return;
      }
      const clamped = clampParts(parts.day, parts.month, parts.year);
      if (!min && !max) {
        commitISO(toISODate(clamped), clamped);
      } else if (
        (min && toISODate(clamped) < min) ||
        (max && toISODate(clamped) > max)
      ) {
        setInvalid(true);
        return;
      }
      const seg = partsToSegments(clamped);
      setDay(seg.day);
      setMonth(seg.month);
      setYear(seg.year);
      commitISO(toISODate(clamped), clamped);
      if (close) setOpen(false);
    };

    const selectedParts = isoValue ? parseISODate(isoValue) : null;

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
      segment: "day" | "month" | "year",
    ) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Backspace") return;
      const el = e.currentTarget;
      if (el.value !== "" || el.selectionStart !== 0) return;

      e.preventDefault();
      if (segment === "day") {
        e.preventDefault();
        if (month) {
          const next = month.slice(0, -1);
          setMonth(next);
          monthRef.current?.focus();
          monthRef.current?.setSelectionRange(next.length, next.length);
        }
      } else if (segment === "month") {
        setMonth("");
        dayRef.current?.focus();
        dayRef.current?.select();
      } else if (segment === "year") {
        setYear("");
        monthRef.current?.focus();
        monthRef.current?.select();
      }
    };

    const onDayChange = (raw: string) => {
      const v = parseSegment(raw, 2, 31);
      setDay(v);
      setInvalid(false);
      if (v.length === 2) monthRef.current?.focus();
      if (v.length === 2 && month.length === 2 && year.length === 4) {
        tryCommitFromSegments(v, month, year);
      }
    };

    const onMonthChange = (raw: string) => {
      const v = parseSegment(raw, 2, 12);
      setMonth(v);
      setInvalid(false);
      if (v.length === 2) yearRef.current?.focus();
      if (day.length === 2 && v.length === 2 && year.length === 4) {
        tryCommitFromSegments(day, v, year);
      }
    };

    const onYearChange = (raw: string) => {
      const v = parseSegment(raw, 4, 9999);
      setYear(v);
      setInvalid(false);
      if (day.length >= 1 && month.length === 2 && v.length === 4) {
        tryCommitFromSegments(day, month, v);
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
            htmlFor={`${fieldId}-day`}
            className={cn(
              fieldStyles.controlWrap,
              styles.dateControl,
              showError && fieldStyles.controlError,
              disabled && fieldStyles.controlWrapDisabled,
            )}
            onFocusCapture={handleFocus}
          >
            {label && (
              <span id={`${fieldId}-label`} className={fieldStyles.controlLabel}>
                {label}
              </span>
            )}
            <div className={styles.inputRow}>
            <div
              className={styles.segments}
              role="group"
              aria-labelledby={label ? `${fieldId}-label` : undefined}
            >
              <input
                ref={dayRef}
                id={`${fieldId}-day`}
                type="text"
                inputMode="numeric"
                className={styles.segment}
                placeholder="DD"
                value={day}
                disabled={disabled}
                aria-label="Day"
                maxLength={2}
                onChange={(e) => onDayChange(e.target.value)}
                onKeyDown={(e) => handleSegmentKeyDown(e, "day")}
                onBlur={() => tryCommitFromSegments(day, month, year)}
              />
              <span className={styles.sep} aria-hidden>
                /
              </span>
              <input
                ref={monthRef}
                id={`${fieldId}-month`}
                type="text"
                inputMode="numeric"
                className={styles.segment}
                placeholder="MM"
                value={month}
                disabled={disabled}
                aria-label="Month"
                maxLength={2}
                onChange={(e) => onMonthChange(e.target.value)}
                onKeyDown={(e) => handleSegmentKeyDown(e, "month")}
                onBlur={() => tryCommitFromSegments(day, month, year)}
              />
              <span className={styles.sep} aria-hidden>
                /
              </span>
              <input
                ref={yearRef}
                id={`${fieldId}-year`}
                type="text"
                inputMode="numeric"
                className={cn(styles.segment, styles.segmentYear)}
                placeholder="YYYY"
                value={year}
                disabled={disabled}
                aria-label="Year"
                maxLength={4}
                onChange={(e) => onYearChange(e.target.value)}
                onKeyDown={(e) => handleSegmentKeyDown(e, "year")}
                onBlur={() => tryCommitFromSegments(day, month, year)}
              />
            </div>
            <button
              type="button"
              className={styles.toggle}
              data-field-action
              tabIndex={-1}
              disabled={disabled}
              aria-label={open ? "Close calendar" : "Open calendar"}
              aria-expanded={open}
              aria-controls={calendarId}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setOpen((o) => !o)}
            >
              ⌄
            </button>
            </div>
          </label>

          <AnimatePresence>
            {open && !disabled && (
              <DateCalendar
                id={calendarId}
                viewParts={viewParts}
                selected={selectedParts}
                min={min}
                max={max}
                onViewChange={setViewParts}
                onSelect={(parts) => {
                  const seg = partsToSegments(parts);
                  setDay(seg.day);
                  setMonth(seg.month);
                  setYear(seg.year);
                  tryCommitFromSegments(seg.day, seg.month, seg.year, true);
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {name && (
          <input type="hidden" name={name} value={isoValue ?? ""} readOnly />
        )}

        {error && (
          <span className={styles.errorText} role="alert">
            {error}
          </span>
        )}
        {invalid && !error && (
          <span className={styles.invalidHint} role="alert">
            Invalid or out-of-range date
          </span>
        )}
        {hint && !error && !invalid && (
          <span className={styles.hint}>{hint}</span>
        )}
      </div>
    );
  },
);
