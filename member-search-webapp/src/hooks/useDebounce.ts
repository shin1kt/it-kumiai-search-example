import { useState, useEffect } from "react";

/**
 * デバウンス機能を提供するカスタムフック
 * @param value デバウンスする値
 * @param delay デバウンス遅延時間（ミリ秒）
 * @returns デバウンスされた値
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 指定された遅延時間後に値を更新するタイマーを設定
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 値が変更されたら前のタイマーをクリア
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
