type SafeInstatiateSuccess<T> = { success: true; data: T };

type SafeInstatiateFail = { success: false; error: string };

export type SafeInstantiateResult<T> =
  | SafeInstatiateSuccess<T>
  | SafeInstatiateFail;
