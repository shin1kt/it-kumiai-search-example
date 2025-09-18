import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    expect(result.current).toBe("initial");

    // 値を変更
    rerender({ value: "updated", delay: 500 });

    // まだ古い値のまま
    expect(result.current).toBe("initial");

    // 時間を進める（500ms未満）
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // まだ古い値のまま
    expect(result.current).toBe("initial");

    // 時間を進める（500ms以上）
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 新しい値に更新される
    expect(result.current).toBe("updated");
  });

  it("should reset timer on rapid value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // 最初の値変更
    rerender({ value: "first", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // まだ古い値
    expect(result.current).toBe("initial");

    // 2回目の値変更（タイマーがリセットされる）
    rerender({ value: "second", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // まだ古い値（タイマーがリセットされたため）
    expect(result.current).toBe("initial");

    // さらに時間を進める
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // 最新の値に更新される
    expect(result.current).toBe("second");
  });

  it("should handle different delay values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 100 },
      }
    );

    rerender({ value: "updated", delay: 100 });

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toBe("updated");
  });

  it("should handle zero delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 0 },
      }
    );

    rerender({ value: "updated", delay: 0 });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current).toBe("updated");
  });
});
