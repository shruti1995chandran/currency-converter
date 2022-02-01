import { put, get, del } from 'memory-cache';

export class Cache {
  public static put(key: string, body: string, duration: number = 60 * 1000): void {
    put(key, body, duration);
  }

  public static get(key: string): string {
    return get(key);
  }

  public static delete(key: string): void {
    return del(key);
  }
}
