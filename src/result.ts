export type Result<T> =
  | { success: true; data: T }
  | {
      success: false;
      /** The front-facing error message */
      error: string;
    };
