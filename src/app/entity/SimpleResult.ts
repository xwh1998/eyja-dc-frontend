export class SimpleResult<T> {
  code: number;
  message: string;
  ttl: number;
  data: T

  public success() {
    return this.code == 0;
  }
}
